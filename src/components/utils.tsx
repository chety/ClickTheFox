import axios, { AxiosRequestConfig } from "axios";
import { Badge, Table } from "reactstrap";
import { useEffect, useRef } from "react";


export const useInterval = function(callback : () => void,delay:number | null){
  const callBackRef = useRef(callback);
  useEffect(() => {
    callBackRef.current = callback;    
  }, [callback])
  
  useEffect(() => {
    if (delay === null) {
      return;
    }
    function tick(){
      callBackRef.current();
    }
    const intervalId = setInterval(tick,delay)
    return () => {
      clearInterval(intervalId);
    }
  }, [delay])
}

function generateUniqeId() {
  return (
    Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
  );
}

function generateRow(tdList: any[]) {
  return (
    <tr key={generateUniqeId()}>
      {tdList.map((td) => ({ ...td, key: generateUniqeId() }))}
    </tr>
  );
}

function shuffleArray(arr: any[]) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

export function generateImageRow(
  images: HTMLImageElement[],
  callback: (clicked: boolean) => void,
) {
  const shuffledImages = shuffleArray(images);
  const result = [];
  let tdList = [];
  for (let i = 1; i <= shuffledImages.length; i++) {
    const { src, alt } = shuffledImages[i - 1];
    const tdImage = (
      <td onClick={() => callback(alt === "fox")}>
        <img src={src} alt={alt} width= "150px" height="150px" />
      </td>
    );
    tdList.push(tdImage);
    if (i % 3 === 0) {
      result.push(generateRow(tdList));
      tdList = [];
    }
  }
  return result;
}
export function getData<T>(
  url: string,
  headers?: AxiosRequestConfig,
): Promise<T> {  
  return axios.get(url, headers);
}

export function saveToCache(key: string, value: string): void {
  localStorage.setItem(key, value);
}
export function readFromCache(key: string) {
  return localStorage.getItem(key);
}

export function formatCurrentDate(date = new Date()) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${date.getFullYear()}, ${months[date.getMonth()]} ${date.getDate()}`;
}

type ScoreBoard = {
  rank: number;
  name: string;
  score: number;
  date : Date;
}
export function getSortedBoardByPoints()  : ScoreBoard[]{
  const board =  Object.keys(localStorage)
    .map((key) => {
      const value = JSON.parse(readFromCache(key) || "{}");
      return {
        name: key,
        score: Number(value.score),
        date: value.date,
        rank: 0
      };
    })
    .sort((o1, o2) => o2.score - o1.score);

    board.forEach((el,i) => {
      el.rank = i + 1
    });
    return board;
}

export function generateScoreBoard(currentUser: string) {
  const style = {
    backgroundColor: "orange"
  }
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Date</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {
          getSortedBoardByPoints().map(({rank,name,date,score}) => {
            return(
              <tr style= {name === currentUser ? style : {}}>
                  <td>{rank}</td>
                  <td>{name}</td>
                  <td>{date}</td>
                  <td> {score}</td>
                </tr>
            )          
          })
        }
      </tbody>
    </Table>
  );
}
