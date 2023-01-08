import { useState } from "react";
import { data } from "./assets/data";
import { Checkbox } from "./components/Checkbox";

const getFormattedPrice = (price) => `${price}€ `;

export default function App() {
  const [total, setTotal] = useState(0);

  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  );

  function onCheckboxSelected(i) {
    let nextCheckedState = [...checkedState];
    nextCheckedState[i] = !nextCheckedState[i];

    setCheckedState(nextCheckedState);

    const sumPrice = nextCheckedState.reduce((acc, currentValue, index) => {
      if (currentValue === true) {
        return acc + data[index].price;
      }

      return acc;
    }, 0);

    setTotal(sumPrice);
  }

  return (
    <div>
      <h3>Què vols fer?</h3>
      <div>
        {data.map(({ option, price }, index) => {
          return (
            <Checkbox
              index={index}
              text={option}
              price={price}
              key={index}
              onCheck={onCheckboxSelected}
              getFormattedPrice={getFormattedPrice}
            />
          );
        })}
        <p> Total: {getFormattedPrice(total)}</p>
      </div>
    </div>
  );
}
