import { useState } from "react";
import { data } from "./assets/data";

// Creo el format pel preu.
const getFormattedPrice = (price) => `${price}€ `;

export default function App() {
  // Creo un nou array amb tots els elements en state FALS (fill posa totes les caselles en fals).
  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  );

  // Poso l'estat del TOTAL a 0 (perquè pugui anar sumant els preus).
  const [total, setTotal] = useState(0);

  // Amb la funció handleOnChange: Recorro l’array chekedState amb un map i miro si la position que li ve per paràmetre és igual a index(de l'ítem del map). Si és així, es modifica el valor (de true a false i de false a true). Es modifica el checkedState amb el setCheckedState passant-li la updatedCheckedState
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    // Faig un reduce de updateCheckedState per trobar els preus que he de sumar. Si el currentState és true, afegirà el preu a la suma al total que ja tingui sumat (sigui 0 o el preu dels productes ja triats). Tot això es guarda a totalPrice (que canvia l'estat de total amb la funció setTotal).
    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + data[index].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  return (
    // El que retorna App és:
    // Un h3 amb el títol.
    <div>
      <h3>¿Qué quieres hacer?</h3>
      <div>
        {data.map(({ option, price }, index) => {
          // Amb un map de data extraiem la option i el preu de data. I també li passem per props l'index.
          // Construïm la label amb l'index corresponent, la option i el price en el format definit abans.
          return (
            <div key={index}>
              <div>
                <input
                  type="checkbox"
                  id={index}
                  name={option}
                  value={option}
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                />
                <label>
                  {option} {getFormattedPrice(price)}
                </label>
              </div>
            </div>
          );
        })}

        <div> Total: {getFormattedPrice(total)}</div>
      </div>
    </div>
  );
}
