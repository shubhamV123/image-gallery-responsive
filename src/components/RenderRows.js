import React from "react";
import RenderColumn from "./RenderColumn";
//Dynamic calculate which row render in which array
const RenderRows = ({ images, activeCardCount }) => {
  const rows = [];
  // Add Column based on device
  const thumbnails = images.map(
    image =>
      console.log("Images", image) || (
        <RenderColumn image={image} activeCardCount={activeCardCount} />
      )
  );
  //Insert column based on device i.e for mobile 2,desktop 4,tablet 3
  for (
    let row = 0;
    row < Math.ceil(images.length / activeCardCount);
    row += 1
  ) {
    rows.push(
      <div
        key={`row-${row} `}
        className="mt-2 mb-2 no-gutters align-items-center row"
      >
        {thumbnails.slice(
          row * activeCardCount,
          row * activeCardCount + activeCardCount
        )}
      </div>
    );
  }
  // give back an array of rows composed of columns
  return rows;
};

export default RenderRows;
