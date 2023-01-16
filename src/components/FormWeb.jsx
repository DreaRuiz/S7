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
