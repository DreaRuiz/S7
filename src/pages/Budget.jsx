import { useEffect, useState } from "react";
import { data } from "../assets/data";
import { Checkbox } from "../components/Checkbox";
import { FormWeb } from "../components/FormWeb";
import { manageLocalStorage } from "../useLocalStorage";
import { ButtonStart } from "../style/styled";
import Swal from "sweetalert2";
import { UserBudget } from "../userBudget";
import { ClientBudget } from "../components/clientBudget";
import { Filters } from "../components/Filters";

const getFormattedPrice = (price) => `${price}€ `;

export default function Budget() {
  // ESTATS
  const [total, setTotal] = useState(0);
  const [checkboxPrice, setCheckboxPrice] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [numLanguages, setNumLanguages] = useState(0);
  const [budgetList, setBudgetList] = useState([]);
  const [services, setServices] = useState([]);

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
  manageLocalStorage("budgetList", budgetList, setBudgetList);
  manageLocalStorage("services", services, setServices);

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

  // ESBORRA EL FORMULARI
  function restartBudget() {
    setTotal(0),
      setCheckboxPrice(0),
      setCheckedState(new Array(data.length).fill(false)),
      setNumPages(0);
    setNumLanguages(0);
  }

  // DEMANA EL NOM I EL TÍTOL
  function showPopup() {
    Swal.fire({
      // DEMANAR NOM I TÍTOL
      html:
        "Introdueix les dades per guardar el presupost" +
        '<input id="swal-client" class="swal2-input" placeholder="Escriu el teu nom">' +
        '<input id="swal-title" class="swal2-input" placeholder="Títol del pressupost">',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Guardar",
      confirmButtonColor: "#86c8bc",
      preConfirm: () => {
        return [
          document.getElementById("swal-client").value,
          document.getElementById("swal-title").value,
        ];
      },

      // GUARDAR NOM I TÍTOL
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      const currentTitle = result.value[1];
      const currentName = result.value[0];

      if (result.isConfirmed) {
        // MOSTRAR POPUP DE S'HA GUARDAT BÉ
        Swal.fire({
          text: "El teu pressupost s'ha guardat correctament",
          confirmButtonColor: "#86c8bc",
          showConfirmButton: false,
          icon: "success",
        });
      }
      // GUARDA LA DATA ACTUAL
      const today = new Date();
      const currentDate = today;

      // PASSA LA INFO OBTINGUDA A LA FUNCIÓ SAVEBUDGET
      saveBudget(currentTitle, currentName, currentDate);
    });
  }
  // GUARDAR EL PRESSUPOST (AMB EL NOM, TÍTOL I DATA)
  function saveBudget(currentTitle, currentName, currentDate) {
    const userBudget = new UserBudget(
      currentTitle,
      currentName,
      currentDate,
      services,
      numPages,
      numLanguages,
      total
    );
    localStorage.setItem("currentTitle", currentTitle);
    localStorage.setItem("currentName", currentName);
    localStorage.setItem(
      "currentDate",
      currentDate.toLocaleDateString("es-ES")
    );

    const newBudgetList = [...budgetList];
    newBudgetList.push(userBudget);
    setBudgetList(newBudgetList);
    restartBudget();
  }

  const servicesName = [];
  // CONVERTEIX L'ARRAY DE CHECKEDSTATE EN STRINGS (treient la info de DATA)
  useEffect(() => {
    checkedState.map((item, index) => {
      if (item === true) servicesName.push(data[index].option);
    });
    setServices(servicesName);
  }, [checkedState]);

  return (
    <main>
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
              {checkedState[0] && index === 0 && (
                // MOSTRA EL FORMULARI AL MARCAR LA PRIMERA CHECKBOX
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

      {/* // FILTRAR ELS PRESSUPOSTOS */}
      <Filters key={"buttonsFilter"} budgetList={budgetList}></Filters>

      {/* MOSTRAR PRESSUPOSTOS */}
      <div>
        {budgetList !== [] &&
          budgetList.map(
            (
              {
                currentTitle,
                currentName,
                currentDate,
                services,
                numPages,
                numLanguages,
                total,
              },
              index
            ) => {
              return (
                <>
                  <ClientBudget
                    key={index}
                    currentTitle={currentTitle}
                    currentName={currentName}
                    currentDate={currentDate}
                    services={services}
                    numPages={numPages}
                    numLanguages={numLanguages}
                    total={total}
                  />
                </>
              );
            }
          )}
      </div>
    </main>
  );
}
