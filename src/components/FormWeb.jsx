import React from "react";
import { Form, Button, ButtonInfo } from "../style/styled";
import Swal from "sweetalert2";
/* import "../index.css"; */

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

  //SUMA IDIOMA
  const increaseLanguages = () => {
    setNumLanguages((count) => count + 1);
  };

  //RESTA RESTA IDIOMA
  const decreaseLanguages = () => {
    setNumLanguages((count) => count - 1);
  };

  // POPUP
  const ExtraInfoPages = () => {
    Swal.fire({
      text: "Aquest component indica el número de planes que tindrà la teva pàgina web",
      showConfirmButton: false,
      showCloseButton: false,
      customClass: {
        popup: "coustomPopup",
      },
    });
  };

  const ExtraInfoLanguages = () => {
    Swal.fire({
      text: "Aquest component indica el número d'idiomes que tindrà la teva pàgina web",
      showConfirmButton: false,
      showCloseButton: false,
      customClass: {
        popup: "coustomPopup",
      },
    });
  };



  return (
    <>
      <Form>
        <div>
          Número de pàgines:
          <Button onClick={increasePag}>+</Button>
          <input name="numPages" type="number" value={numPages} />
          <Button onClick={decreasePag}>-</Button>
          <ButtonInfo onClick={ExtraInfoPages}>i</ButtonInfo>
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
            readOnly
          />
          <Button onClick={decreaseLanguages}>-</Button>
          <ButtonInfo onClick={ExtraInfoLanguages}>i</ButtonInfo>
        </div>
      </Form>
    </>
  );
}
