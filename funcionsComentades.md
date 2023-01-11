# Exercici 1

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

# EXERCICI 2

### App

```jsx
import { useEffect, useState } from "react";
import { data } from "./assets/data";
import { Checkbox } from "./components/Checkbox";
import { FormWeb } from "./components/FormWeb";

const getFormattedPrice = (price) => `${price}€ `;

export default function App() {
  // ESTATS
  const [total, setTotal] = useState(0);
  const [numPages, setNumPages] = useState(1);
  const [numLanguages, setNumLanguages] = useState(1);
  const [checkboxPrice, setCheckboxPrice] = useState(0);

  // ESTAT DESSELECCIONAT DE TOTS ELS ELEMENTS DE L'ARRAY
  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  );

  // EFFECTS (Quan canvia l'estat de que està entre [] es crida a la funció)
  useEffect(() => {
    calculateTotalPrice();
  }, [checkedState, numLanguages, numPages]);

  // SELECCIONA I DESSELECCIONA CHECKBOX
  function onCheckboxSelected(i) {
    let nextCheckedState = [...checkedState];
    nextCheckedState[i] = !nextCheckedState[i];
    // CANVIA L'ESTAT DE LA CHECKBOX
    setCheckedState(nextCheckedState);

    // SUMA EL PREU DELS PRODUCTES SELECCIONATS
    const sumPrice = nextCheckedState.reduce((acc, currentValue, index) => {
      if (currentValue === true) {
        return acc + data[index].price;
      }
      return acc;
    }, 0);
    setCheckboxPrice(sumPrice);
  }
  // CANVIA L'ESTAT DEL NUM DE PÀGINES
  function handlePagesChange(e) {
    setNumPages(e.target.value);
  }
  // CANVIA L'ESTAT DEL NUM D'IDIOMES
  function handleLanguagesChange(e) {
    setNumLanguages(e.target.value);
  }

  // CALCULA EL PREU DE LA WEB AMB DIF. PÀGINES I DIF. IDIOMES
  // CALCULA EL PREU TOTAL (PÀGINES + CHECKBOX) I CANVIA L'ESTAT
  function calculateTotalPrice() {
    const totalWeb = numPages * numLanguages * 30;
    const total = totalWeb + checkboxPrice;

    setTotal(total);
  }

  return (
    <div>
      <h3> Què vols fer? </h3>
      <div>
        {data.map(({ option, price }, index) => {
          return (
            <>
              <Checkbox
                index={index}
                text={option}
                price={price}
                key={index}
                onCheck={onCheckboxSelected}
                getFormattedPrice={getFormattedPrice}
              />
              {checkedState[0] &&
                index === 0 && ( // MOSTRA EL FORMULARI AL MARCAR LA PRIMERA CHECKBOX (checkedState[] vol dir si l'index 0 està check i index: darrera de quin vull que m'ho mostri).
                  <FormWeb
                    numPages={numPages}
                    numLanguages={numLanguages}
                    handlePagesChange={handlePagesChange}
                    handleLanguagesChange={handleLanguagesChange}
                  />
                )}
            </>
          );
        })}
        <p> Preu total: {getFormattedPrice(total)} </p>
      </div>
    </div>
  );
}
```

### FormWeb

```jsx
import React from "react";
import { Form } from "../styled";

export function FormWeb({
  numPages,
  handlePagesChange,
  numLanguages,
  handleLanguagesChange,
}) {
  return (
    // Form ve de l'styled i és qui dona forma al border.
    <>
      <Form>
        <label>
          Número de pàgines:
          <input
            name="numPages"
            type="number"
            value={numPages} // El value és l'estat (numPages).
            onChange={handlePagesChange} // Quan canvia crida a la funció handlePagesChange.
          />
        </label>

        <br />

        <label>
          Número d'idiomes:
          <input
            name="numLanguages"
            type="number"
            value={numLanguages}
            onChange={handleLanguagesChange}
          />
        </label>
      </Form>
    </>
  );
}
```
