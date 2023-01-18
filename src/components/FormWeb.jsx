import React from "react";
import { Form, Button } from "../style/styled";
/* import { setNumPages } from '../App' */

export function FormWeb({
  numPages,
  setNumPages,

  numLanguages,
  setNumLanguages,
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

  /*   // Canvia l'estat de la pàgina
  function handlePagesChange(e) {
    setNumPages(e.target.value);
  }
 */
  //SUMA IDIOMA
  const increaseLanguages = () => {
    setNumLanguages((count) => count + 1);
  };

  //RESTA RESTA IDIOMA
  const decreaseLanguages = () => {
    setNumLanguages((count) => count - 1);
  };

  return (
    <>
      <Form>
        <div>
          Número de pàgines:
          <Button onClick={increasePag}>+</Button>
          <input name="numPages" type="number" value={numPages} />
          <Button onClick={decreasePag}>-</Button>
        </div>

        <br />

        <div>
          Número d'idiomes:
          <Button onClick={increaseLanguages}>+</Button>
          <input
            name="numLanguages"
            type="number"
            min="0"
            value={numLanguages}
          />
          <Button onClick={decreaseLanguages}>-</Button>
        </div>
      </Form>
    </>
  );
}
