import React from "react";

export const Checkbox = ({ id, textLine, price, onCheck }) => {
  return (
    <div>
      <input type="checkbox" id="id" />
      {textLine} ({price} €)
    </div>
  );
};