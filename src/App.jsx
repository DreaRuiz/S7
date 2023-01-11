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
                index === 0 && ( // MOSTRA EL FORMULARI AL MARCAR LA PRIMERA CHECKBOX
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
