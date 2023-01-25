import React from "react";
import { Budget } from "../style/styled";

export function ClientBudget({
  // Creo el component ClientBudget amb totes les dades d'un pressupost (li venen per props)
  currentTitle,
  currentName,
  services,
  numPages,
  numLanguages,
  total,
}) {
  return (
    <div>
      <div>
        <Budget>
          <h2>Títol: {currentTitle}</h2>
          <p>
            Nom: {currentName}
            <br />
            Serveis: {services}
            <br />
            Pàgines: {numPages}
            <br />
            Idiomes: {numLanguages}
            <br />
            Preu final: {total} €
          </p>
        </Budget>
      </div>
    </div>
  );
}
