import "./style/loading.css";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

export function Loading() {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    padding: 30%
  `;
  return (
    <div className="app-loading">
      <BeatLoader color={"orange"} loading={true} css={override} size={25} />
    </div>
  );
}
