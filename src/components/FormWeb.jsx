import React from "react";
import { Form } from "../styled";

export function FormWeb({
  numPages,
  handlePagesChange,
  numLanguages,
  handleLanguagesChange,
}) {
  return (
    <>
      <Form>
        <label>
          Número de pàgines:
          <input
            name="numPages"
            type="number"
            value={numPages}
            onChange={handlePagesChange}
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
