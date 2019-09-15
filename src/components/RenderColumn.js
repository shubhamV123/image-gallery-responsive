import React from "react";
import Image from "react-graceful-image";
import convertUrlToSpecificWidth from "../utils/converUrlToSpecificWidth";
const columnClassName = {
  3: "col-4 col-lg-4",
  4: "col-3 col-md-3",
  2: "col-6 col-xs-6"
};
//Random color placeholder for lazy loading of images
const colours = ["#69779B", "#9692AF", "#ACDBDF", "#D7EAEA"];

const RenderColumn = ({ activeCardCount, image }) => {
  return (
    <div
      className={`${columnClassName[activeCardCount]} align-items-center pl-1 pr-1`}
    >
      <div className="gallery-thumb image-card">
        <Image
          src={`${convertUrlToSpecificWidth(image.download_url)}`}
          alt="My awesome image"
          className="grid-image"
          placeholderColor={colours[Math.floor(Math.random() * colours.length)]}
          retry={{ count: 50, delay: 3, accumulate: "add" }}
        />
      </div>
      <div className="text-center">
        <b>Author : </b> {image.author}
      </div>
    </div>
  );
};

export default RenderColumn;
