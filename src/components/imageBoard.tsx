import React from "react";
import { Table } from "reactstrap";
import { ImageResponse } from "./models";
import { generateImageRow } from "./utils";

type ImageBoardProp = {
  imageClicked: (foxClicked: boolean) => void;
  images : HTMLImageElement[]
};
function ImageBoardFunc(props: ImageBoardProp) {
    const {imageClicked,images} = props;
    return (
    <Table>
        <tbody>{generateImageRow(images,imageClicked)}</tbody>
      </Table>
    )
}


export const ImageBoard = React.memo(ImageBoardFunc);
