import { useEffect, useState } from "react";
import { Loading } from "./loading";
import { CatImage, DogImage, FoxImage, ImageResponse } from "./models";
import { Info } from "./info";
import { ImageBoard } from "./imageBoard";
import React from "react";
import { formatCurrentDate, getData, saveToCache, useInterval } from "./utils";
import { ModalComponent } from "./modal";

let intervalId: NodeJS.Timeout;
type GameProps = {
  name: string;
  backToWelcomeScreen: () => void;
};
export function GameBoard({
  name,
  backToWelcomeScreen,
}: GameProps) {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [renderedImageCount, setRenderedImageCount] = useState(0);
  const [images,setImages] = useState<HTMLImageElement[]>([]);
  
  function getFoxImage(): Promise<FoxImage> {
    return getData<FoxImage>("https://randomfox.ca/floof/");
  }

  function getDogsImage(): Promise<DogImage> {
    return getData<DogImage>("https://dog.ceo/api/breeds/image/random/4");
  }

  function getCatsImage() {
    const config = {
      headers: { "x-api-key": "55914808-c2b5-4ec2-93df-dcf39ffc45b9" },
    };

    return getData(
      "https://api.thecatapi.com/v1/images/search?limit=4",
      config,
    );
  }

  function foxClicked(clicked: boolean) {
    setScore((oldScore) => {
      return clicked ? oldScore + 1 : oldScore - 1;
    });
    getImages();
  }

  function playAgain() {
    setTimeLeft(30);
    setScore(0);
    setModal(false);
  }

  function tick() {
    console.log("tick",loading)
    setTimeLeft((previous) => previous - (loading ? 0  : 1));    
  }

  useInterval(tick,timeLeft > 0 ? 1000 : null)

  function toWelcomeScreen() {
    backToWelcomeScreen();
  }
  
  const imageClickedCallback = React.useCallback(foxClicked, []);

   function getImages() {
    setLoading(true);

    Promise.all([getFoxImage(), getDogsImage(), getCatsImage()])
      .then((responses) => {
        return Promise.all(responses.map((response: any) => response.data));
      })
      .then((datas: any) => {
        const [foxImageObject, dogObject, catImageList] = datas;
        const foxImage = { image: foxImageObject.image, altAttr: "fox" };
        const dogImages = dogObject.message.map((image: string) => {
          return { image, altAttr: "dog" };
        });
        const catImages = catImageList.map((cat: CatImage) => ({
          image: cat.url,
          altAttr: "cat",
        }));
        const images: ImageResponse[] = [foxImage, ...dogImages, ...catImages];
        setImages(createImages(images));
        //  setLoading(false);

      })
      // .finally(() => {
      //   setTimeout(() => {
      //     setLoading(false);
      //   }, 2000);
      // });
  }

   function createImages(imageUrls: ImageResponse[]) {
        return imageUrls.map(({ image, altAttr }) => {          
          const img = new Image();
          img.src = image;
          img.alt = altAttr;
          img.width = 150;
          img.height = 150;
          img.onload = () => {
            setRenderedImageCount(renderedImageCount => renderedImageCount + 1)
          }
          return img;
        })
  }

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    if(renderedImageCount > 0 && renderedImageCount === images.length){
      setLoading(false);
      setRenderedImageCount(0);
    }
  }, [renderedImageCount,images.length]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalId);
      saveToCache(
        name,
        JSON.stringify({ score: score.toString(), date: formatCurrentDate() }),
      );
      setModal(true);
    }
  }, [timeLeft]);

  return (
    <>
      <ModalComponent
        isOpen={modal}
        currentUser = {name}
        playAgain={playAgain}
        toWelcomeScreen={toWelcomeScreen}
      />
      <Info timeLeft={timeLeft} score={score} />
      {loading ? (
        <Loading />
      ) : (
        <ImageBoard imageClicked={imageClickedCallback} images= {images}/>
      )}
    </>
  );
}
