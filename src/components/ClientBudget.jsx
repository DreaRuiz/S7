import React from "react";
/* import { Budget } from "../style/styled"; */

export function ClientBudget({ // Creo el component ClientBudget amb totes les dades d'un pressupost (li venen per props)
  currentTitle,
  currentName,
  currentDate,
  services,
  numPages,
  numLanguages,
  total,
}) {
  
    const formattedDate = String(currentDate.toLocaleDateString("es-ES")); 

  return (
    <div>
      <div>
        <label>
          <h2>Títol: {currentTitle}</h2>
          <p>Nom: {currentName}</p>
          <p>Data: {"data"}</p>
          <p>Serveis: {services} </p>
          <p>
            Pàgines: {numPages}
            <br />
            Idiomes: {numLanguages}
          </p>
          <p>Preu final: {total} €</p>
        </label>
      </div>
    </div>
  );
}
