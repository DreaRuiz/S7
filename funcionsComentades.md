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

# EXERCICI 3

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
  const [checkboxPrice, setCheckboxPrice] = useState(0);
  const [numPages, setNumPages] = useState(1);
  const [numLanguages, setNumLanguages] = useState(1);

  // ESTAT DESSELECCIONAT DE TOTS ELS ELEMENTS DE L'ARRAY
  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  );

  // EFFECTS
  useEffect(() => {
    calculateTotalPrice();
  }, [checkedState, numLanguages, numPages]);

  // SELECCIONA I DESSELECCIONA CHECKBOX
  function onCheckboxSelected(i) {
    let nextCheckedState = [...checkedState];
    nextCheckedState[i] = !nextCheckedState[i];

    // CANVIA L'ESTAT DE LES PÀGINES I ELS IDIOMES A 0 QUAN ES DESSELECCIONA LA CHECKBOX DE WEB
    if (nextCheckedState[0] === false) {
      // Comp.ova que la primera casella (la de la web) està desmarcada-
      setNumLanguages(0); // Canvia l'estat del numPages a 0 perquè no ho sumi al preu.
      setNumPages(0);
    }
    // CANVIA L'ESTAT DE LA CHECKBOX
    setCheckedState(nextCheckedState);

    // SUMA EL PREU DELS PRODUCTES SELECCIONATS
    const sumPrice = nextCheckedState.reduce((acc, currentValue, index) => {
      if (currentValue === true) {
        return acc + data[index].price;
      }
      return acc;
    }, 0);

    // CANVIA L'ESTAT DE CHECKBOXPRICE
    setCheckboxPrice(sumPrice);
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
                index === 0 && ( // MOSTRA EL FORMULARI AL MARCAR LA PRIMERA CHECKBOX
                  <FormWeb
                    numPages={numPages}
                    numLanguages={numLanguages}
                    setNumPages={setNumPages}
                    setNumLanguages={setNumLanguages}
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
import { Form, Button } from "../styled";
/* import { setNumPages } from '../App' */

export function FormWeb({
  numPages,
  setNumPages,
  handlePagesChange,

  numLanguages,
  setNumLanguages,
  handleLanguagesChange,
}) {
  //PÀGINES
  //Suma pàgina
  const increasePag = () => {
    setNumPages((count) => count + 1);
  };

  //Resta pàgina
  const decreasePag = () => {
    setNumPages((count) => count - 1);
  };

  // Canvia l'estat de la pàgina
  function handlePagesChange(e) {
    setNumPages(e.target.value);
  }

  //SUMA IDIOMA
  const increaseLanguages = () => {
    setNumLanguages((count) => count + 1);
  };

  //RESTA RESTA IDIOMA
  const decreaseLanguages = () => {
    setNumLanguages((count) => count - 1);
  };

  // CANVIA L'ESTAT DEL NUM D'IDIOMES
  function handleLanguagesChange(e) {
    setNumLanguages(e.target.value);
  }

  return (
    <>
      <Form>
        <div>
          Número de pàgines:
          <Button onClick={increasePag}>+</Button>
          <input
            name="numPages"
            type="number"
            value={numPages}
            onChange={handlePagesChange}
          />
          <Button onClick={decreasePag}>-</Button>
        </div>

        <br />

        <div>
          Número d'idiomes:
          <Button onClick={increaseLanguages}>+</Button>
          <input
            name="numLanguages"
            type="number"
            value={numLanguages}
            onChange={handleLanguagesChange}
          />
          <Button onClick={decreaseLanguages}>-</Button>
        </div>
      </Form>
    </>
  );
}
```

# EXERCICI 4

### Budget (antiga App)

```jsx
import { useEffect, useState } from "react";
import { data } from "../assets/data";
import { Checkbox } from "../components/Checkbox";
import { FormWeb } from "../components/FormWeb";
import { manageLocalStorage } from "../useLocalStorage"; // Importo la funció per fer el LOCALSTORAGE

const getFormattedPrice = (price) => `${price}€ `;

export default function Budget() {
  // ESTATS
  const [total, setTotal] = useState(0);
  const [checkboxPrice, setCheckboxPrice] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [numLanguages, setNumLanguages] = useState(0);

  // ESTAT DESSELECCIONAT DE TOTS ELS ELEMENTS DE L'ARRAY
  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  );

  // RECUPERAR L'ESTAT (LOCALSTORAGE)
  // Crido a la funció del localStorage, `manageLocalStorage` i li passo la key, la variable de l'estat i la funció per canviar l'estat (que he creat abans al fer el useState).
  manageLocalStorage("total", total, setTotal);
  manageLocalStorage("checkboxPrice", checkboxPrice, setCheckboxPrice);
  manageLocalStorage("numPages", numPages, setNumPages);
  manageLocalStorage("numLanguages", numLanguages, setNumLanguages);
  manageLocalStorage("checkedState", checkedState, setCheckedState);

  // EFFECTS
  useEffect(() => {
    calculateTotalPrice();
  }, [checkedState, numLanguages, numPages]);

  // SELECCIONA I DESSELECCIONA CHECKBOX
  function onCheckboxSelected(i) {
    let nextCheckedState = [...checkedState];
    nextCheckedState[i] = !nextCheckedState[i];

    // CANVIA L'ESTAT DE LES PÀGINES I ELS IDIOMES
    // Si el primer checkbox (el de la web) està marcat, ha de posar les pàgines i els idiomes a 1 (perquè es puguin multiplicar entre si i després per 30 (Si està a 0 qualsevol cosa que multipliqui donarà 0 i no es podrà fer el preu total)).
    if (nextCheckedState[0] === true) {
      setNumLanguages(1);
      setNumPages(1);
    }

    if (nextCheckedState[0] === false) {
      setNumLanguages(0);
      setNumPages(0);
    }
    // CANVIA L'ESTAT DE LA CHECKBOX
    setCheckedState(nextCheckedState);

    // SUMA EL PREU DELS PRODUCTES SELECCIONATS
    const sumPrice = nextCheckedState.reduce((acc, currentValue, index) => {
      if (currentValue === true) {
        return acc + data[index].price;
      }
      return acc;
    }, 0);

    // CANVIA L'ESTAT DE CHECKBOXPRICE
    setCheckboxPrice(sumPrice);
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
      <h1>Què vols fer?</h1>
      <div>
        {data.map(({ option, price }, index) => {
          return (
            <>
              <Checkbox
                index={index}
                text={option}
                price={price}
                key={index}
                checked={checkedState[index]} // Quan estigui seleccionat, mostra l'estat (seleccionat) de la checkbox per la qual estigui passant el map (això ho faig amb l'index).
                onCheck={onCheckboxSelected}
                getFormattedPrice={getFormattedPrice}
              />
              {checkedState[0] &&
                index === 0 && ( // MOSTRA EL FORMULARI AL MARCAR LA PRIMERA CHECKBOX
                  <FormWeb
                    numPages={numPages}
                    numLanguages={numLanguages}
                    setNumPages={setNumPages}
                    setNumLanguages={setNumLanguages}
                  />
                )}
            </>
          );
        })}
        <p>
          <b>Preu total: {getFormattedPrice(total)}</b>
        </p>
      </div>
    </div>
  );
}
```

### useLocalStorage (la funció per guardar i recuperar l'estat de les coses)

```js
import { useEffect } from "react"; // Importo el useEffect
// A la funció i passo una key, un estat i una funció per canviar l'estat.
export const manageLocalStorage = (key, state, setState) => {
  // RECUPERAR LA INFO DEL LOCALSTORAGE (Al obrir la pàgina)
  useEffect(() => {
    // A restoredState es guarda: El que porta (segons la KEY que li passem) el GETITEM des del LOCALSTORAGE.
    const restoredState = localStorage.getItem(key);
    // Si hi ha algo dins de RESTOREDSTATE, ho guarda dins de l'STATE amb el setState. I per guardar-ho ho ha de convertir en no-string (amb el JSON.PARSE)
    if (restoredState) {
      setState(JSON.parse(restoredState));
    }
  }, []); // Els [] es posen per dir que s'ha d'activar quan s'obri la pàgina.

  // GUARDAR LA INFO AL LOCALSTORAGE (Mentre està en funcionament)
  useEffect(
    //Segons la KEY, agafa l'estat (que li ve per PROPS) i el convertex en string per guardar-ho al JSON.
    () => localStorage.setItem(key, JSON.stringify(state)),
    [state] // Quan canvi l'STATE fes que passi el que hi ha a dins del useEffect
  );
};
```

### Checkbox

```jsx
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
          checked={checked} // Li dic que quan estigui marcat (checked), cridi a l'element checked (definit a Budget)
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
# EXERCICI 5

### App
```jsx
import React from "react";
import Routes from "./application/routes";

export const App = () => <Routes />; // Ha d'anar a buscar les pàgines a ROUTES

export default App;
```

### Routes
```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom"; // S'ha d'instal·lar react-router
import Welcome from "../pages/Welcome"; // Importo la pàgina de Welcome
import Budget from "../pages/Budget"; // Importo la pàgina de Budget

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Welcome />} /> {// La primera ruta és mostrar el "component" o pàgina WELCOME}
      <Route path="/Budget/" element={<Budget />} /> {// La segona ruta és anar (a través del botó) al "component" o pàgina BUDGET.}
    </Routes>
  </BrowserRouter>
);

export default Router;

```
### Budget (queda igual que a l'exercici anterior)
### Welcome
```jsx
import React from "react";
import { Link } from "react-router-dom"; // Importo el LINK de react-router
import { ButtonStart } from "../styled"; // Importo l'estil del botó de styled

function Welcome() {
  return (
    <main>
      <h1>Pressupost</h1>
      <h2>Personalitza el teu servei</h2>
      <p>
        A continuació trobaràs una aplicació per calcular el pressupost de
        diferents serveis.
      
        <br />
        Pots triar entre les diferents opcions i el <b>preu s'actualitzarà
        automaticament</b> al afegir o treure serveis.
       
        <br />
        Podràs <b>guardar els pressupostos</b> que hagis creat i <b>visualitzar-los</b> a la
        part dreta de la pantalla. <br/> On també tindràs diferents <b>opcions de
        filtrat</b>.
      </p>
      <p><b>Crea el teu pressupost</b></p>
      
      <ul>
        <ButtonStart>
          <Link to="/Budget">Crea el teu pressupost</Link> {//Quan clicki al botó ha d'anar a la pàgina BUDGET}
        </ButtonStart>
      </ul>
    </main>
  );
}
```