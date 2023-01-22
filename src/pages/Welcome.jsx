import React from "react";
import { Link } from "react-router-dom";
import { ButtonStart } from "../style/styled";

function Welcome() {
  return (
    <main>
      <h1>Pressupost</h1>
      <h2>Personalitza el teu servei</h2>
      <p>
        A continuació trobaràs una aplicació per calcular el pressupost de
        diferents serveis.
        <br />
        Pots triar entre les diferents opcions i el{" "}
        <b>preu s'actualitzarà automaticament</b> al afegir o treure serveis.
        <br />
        Podràs <b>guardar els pressupostos</b> que hagis creat i{" "}
        <b>visualitzar-los</b> a la part dreta de la pantalla. <br /> On també
        tindràs diferents <b>opcions de filtrat</b>.
      </p>
  

      <ul>
        <ButtonStart>
          <Link to="/Budget">Crea el teu pressupost</Link>
        </ButtonStart>
      </ul>
    </main>
  );
}

export default Welcome;
