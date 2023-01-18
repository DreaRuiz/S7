import { useEffect, useState } from "react";
import { data } from "../assets/data";
import { Checkbox } from "../components/Checkbox";
import { FormWeb } from "../components/FormWeb";
import { manageLocalStorage } from "../useLocalStorage";

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
  manageLocalStorage("total", total, setTotal);
  manageLocalStorage("checkboxPrice", checkboxPrice, setCheckboxPrice);
  manageLocalStorage("numPages", numPages, setNumPages);
  manageLocalStorage("numLanguages", numLanguages, setNumLanguages);
  manageLocalStorage("checkedState", checkedState, setCheckedState);

  console.log("checkedState", checkedState);
  console.log("pages", numPages);
  // EFFECTS
  useEffect(() => {
    calculateTotalPrice();
  }, [checkedState, numLanguages, numPages]);

  // SELECCIONA I DESSELECCIONA CHECKBOX
  function onCheckboxSelected(i) {
    let nextCheckedState = [...checkedState];
    nextCheckedState[i] = !nextCheckedState[i];

    // CANVIA L'ESTAT DE LES PÀGINES I ELS IDIOMES (A 0 quan està desmarcat i a 1 quan està marcat el checkbox)
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
                checked={checkedState[index]}
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
