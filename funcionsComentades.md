# Exercici 1 OPCIÓ A

### App

```jsx
import { useState } from "react";
import { data } from "./assets/data";

// Creo el format pel preu.
const getFormattedPrice = (price) => `${price}€ `;

export default function App() {
  // PREU TOTAL
  // Poso l'estat del TOTAL a 0 (perquè pugui anar sumant els preus).
  const [total, setTotal] = useState(0);

  // CHECKBOX
  // POSAR EN FALSE: Creo un nou array amb tots els elements en state FALS (.fill posa totes les caselles en fals).
  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  );

  // MARCAR LA CASELLA (DE FALSE A TRUE): Amb la funció handleOnChange: Recorro l’array chekedState amb un map i miro si la position que li ve per paràmetre és igual a index(de l'ítem del map). Si és així, es modifica el valor (de true a false i de false a true). Es modifica el checkedState amb el setCheckedState passant-li la updatedCheckedState
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    // IDENTIFICAR QUINA CASELLA/ITEM S'HA MARCAT I SUMAR EL PREU: Faig un reduce de updateCheckedState per trobar els preus que he de sumar. Si el currentState és true, afegirà el preu a la suma al total que ja tingui sumat (sigui 0 o el preu dels productes ja triats). Tot això es guarda a totalPrice (que canvia l'estat de total amb la funció setTotal).
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
    <div>
      <h3>¿Qué quieres hacer?</h3>
      <div>
        {data.map(({ option, price }, index) => {
          // Amb un map de data extraiem la option i el preu de data. I també li passem per props l'index.
          // CONSTRUCCIÓ DE LA "FRSE": Construïm la label amb l'index corresponent, la option i el price en el format definit abans.
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

```


# Exercici 1 OPCIÓ B

### App
```jsx
import { useState } from "react";
import { data } from "./assets/data";
import { Checkbox } from "./components/Checkbox";

// Defineixo el format del preu.
const getFormattedPrice = (price) => `${price}€ `;

export default function App() {
  // Inicialitzo l'estat de total a 0.
  const [total, setTotal] = useState(0);

  // Creo un nou array amb tots els elements en state FALS (.fill posa totes les caselles en fals). És un array de booleans.
  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  );
  // Duplico l'array checkedState que passa a dir-se newCheckedState. Quan es cridi a onCheckedSelected l'estat de l'ítem (i) clicat passarà a l'estat oposat (de true a false i de false a true). I es canviarà el checkedState amb el nou valor (guardat a newCheckedState).
  function onCheckboxSelected(i) {
    let nextCheckedState = [...checkedState];
    nextCheckedState[i] = !nextCheckedState[i];

    setCheckedState(nextCheckedState);

    // Faig un reduce amb el nou array on: si l'ítem que recorre el reduce és true, retornarà la suma de l'accumulador + el preu de l'ítem indicat (que troba a l'array (data) per posició amb index). I tot això retornarà l'accumulador (que conté la suma dels ítems amb checkbox true).
    const sumPrice = nextCheckedState.reduce((acc, currentValue, index) => {
      if (currentValue === true) {
        return acc + data[index].price;
      }

      return acc;
      // Al reduce després dels arguments i la funció li passo 0 que és el valor inicial de la suma de preus.
    }, 0);
    // Guardo dins de total la sumPrice a través del setTotal.
    setTotal(sumPrice);
  }

  return (
    // Retorno un h3 amb el títol.
    // Faig un map de data passant per props option, price i index.
    // Dins el component Checkbox defineixo què serà l'index, el text, el price i a quina funció s'haurà de cridar quan marquin la casella (quan facin onCheck, cridarem a la funció onCheckedboxSelected). També defineixo a què correspondrà el format del preu. I creo una p per mostrar el preu.
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
```

### Checkbox
```jsx
import React from "react";

// Creo la funció Checkbox i li passo els props de l'index, la info que ha de mostrar (preu i text), la funció que haurà de crear per canviar l'estat (onCheck), l'estat del check (checkedState) i el format del preu (getFormattedPrice).
export function Checkbox({
  index,
  text,
  price,
  onCheck,
  checkedState,
  getFormattedPrice,
}) {
  // A Checkbox defineixo els props i els dono forma (plantilla). A App els cirdo per omplir d'info la plantilla.
  // La funció retorna un ínput de tipus checkbox amb una id = a l'index, la info (que la treu del map fet a App) i la capacitat de fer canvis a través dues funcions (checked) i (onChange).
  // Creo també el "format" o plantilla amb una label que ha de mostrar l'html.
  return (
    <div key={index}>
      <div>
        <input
          type="checkbox"
          id={index}
          name={text}
          value={text}
          checked={checkedState}
          onChange={() => onCheck(index)}
        />
        <label>
          {text} {getFormattedPrice(price)}
        </label>
      </div>
    </div>
  );
}

```