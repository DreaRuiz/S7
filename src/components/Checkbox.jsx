import React from "react";

export function Checkbox({
  index,
  text,
  price,
  onCheck,
  checked,
  getFormattedPrice,
}) {
  return (
    <div key={index}>
      <div>
        <input
          type="checkbox"
          id={index}
          name={text}
          value={text}
          checked={checked}
          onChange={() => onCheck(index)}
        />
        <label>
          {text} {getFormattedPrice(price)}
        </label>
      </div>
    </div>
  );
}
