import "./style/loading.css"
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

export function ImageLoading() {
  const override = css`
  display: block;
  margin: 0 auto;
  padding: 30%;
  
`;
  return (
    <ScaleLoader color= "orange"   loading={true} css={override}/>
  );
}

