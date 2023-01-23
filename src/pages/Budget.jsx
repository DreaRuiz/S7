import { useEffect, useState } from "react";
import { data } from "../assets/data";
import { Checkbox } from "../components/Checkbox";
import { FormWeb } from "../components/FormWeb";
import { manageLocalStorage } from "../useLocalStorage";
import { ButtonStart } from "../style/styled";
import Swal from "sweetalert2";
import { UserBudget } from "../userBudget";

const getFormattedPrice = (price) => `${price}€ `;

export default function Budget() {
  // ESTATS
  const [total, setTotal] = useState(0);
  const [checkboxPrice, setCheckboxPrice] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [numLanguages, setNumLanguages] = useState(0);
  const [budgetList, setBudgetList] = useState([]); // Creo l'estat de budgetList

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
  manageLocalStorage("budgetList", budgetList, setBudgetList); // Guarda l'estat de BudgetList després d'haver guardat el pressupost.

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

  // DEMANAR EL NOM
  function showPopup() {
    // Creo la funció de mostrar popup
    let currentName = "";
    // DEMANA EL NOM

    // Mostra popup
    Swal.fire({
      // Amb un plugin mostra el popup
      text: "Escriu el teu nom per guardar el pressupost",
      input: "text",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Guardar",
      confirmButtonColor: "#86c8bc",

      // Si el nom no és correcte surt el missatge d'error
      preConfirm: (client) => {
        // Valida i recull en nom del client
        return fetch(`//api.github.com/users/${client}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            // Mostra l'error si hi ha un error al nom
            Swal.showValidationMessage("Hi ha hagut un error");
          });
      },
      // Si el nom és correcte apareix un altre popup per confirmar
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      // Guarda el nom si és correcte
      currentName = result.value.login;

      if (result.isConfirmed) {
        Swal.fire({
          // Mostra la pantalla de s'ha guardat correctament
          text: "El teu pressupost s'ha guardat correctament",
          confirmButtonColor: "#86c8bc",
          showConfirmButton: false,
          icon: "success",
        });
      }
      // Guardar la data
      let currentDate = new Date(); // Crea una data actual
      saveBudget(currentName, currentDate); // ????
      console.log(budgetList);
    });

    // GUARDAR EL PRESSUPOST (AMB EL NOM)
    function saveBudget(currentName, currentDate) {
      const userBudget = new UserBudget( // Crida a la classe USERBUDGET passant-li el valor dels constructors (que van per ordre segons ho hagi posat a userBudget.js)
        currentName,
        currentDate,
        checkedState,
        numPages,
        numLanguages,
        total
      );
      localStorage.setItem("currentName", currentName); // Guarda el nom al LocalStorage
      localStorage.setItem("currentDate", currentDate.toLocaleDateString()); // Guarda la data al LocalStorage

      const newBudgetList = [...budgetList]; // Fa una còpia de l'array budgetList
      newBudgetList.push(userBudget); // Afegeix el userBudget (creat a la funció amb els constructors) a l'array newBudgetList
      setBudgetList(newBudgetList); // Canvia l'estat de BudgetList per aquest nou, per tant té la info anterior amb el nou budget guardat també.
    }

    // TODO: Afegir un TÍTOL
    // TODO: Fer que es netegi el formulari quan hagis guardat el pressupost (funció resetBudget i cridar-la al donar-li al botó de guardar pressupost)
    // TODO: Fer que es mostri (convertint l'array checkedbox en els serveis de DATA)
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
                    key={index}
                  />
                )}
            </>
          );
        })}
        <p>
          <b>Preu total: {getFormattedPrice(total)}</b>
        </p>
        <ButtonStart onClick={showPopup}>Guardar pressupost</ButtonStart>
      </div>
    </div>
  );
}
