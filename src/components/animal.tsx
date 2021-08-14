import { useState, useEffect } from "react";
import { ImageLoading } from "./imageLoading";

const useImage = (src: string) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasLoaded(false);
        setHasError(false);

        const image = new Image();
        image.src = src;

        const handleError = () => {
            setHasError(true); 
        };

        const handleLoad = () => {
            setHasLoaded(true);
            setHasError(false);
        };

        image.onerror = handleError;
        image.onload = handleLoad;

        return () => {
            image.removeEventListener("error", handleError);
            image.removeEventListener("load", handleLoad);
        };
    }, [src]);

    return { hasLoaded, hasError };
};
interface AnimalProps{
    source: string;
    alt?: string;
    
}
export  function Animal({source,alt} : AnimalProps) {
    const {hasLoaded,hasError} = useImage(source);
    if (hasError) {
        return null;
    }
    return (
        <>
        {!hasLoaded && <ImageLoading />}
        {hasLoaded &&  <img src={source} alt= {alt} width= "150px" height= "150px"  />}
       
        </>
    )
}
