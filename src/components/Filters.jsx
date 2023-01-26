import React from "react";
import { Button, Input } from "../style/styled";

// ORDERAR ELS PRESSUPOSTOS
export const Filters = ({
  setBudgetList,
  budgetList,
  search,
  setSearch,
  setFilteredBudget,
  copyBudgetList,
}) => {
  // Canvia l'estat del budgetList pel resultat de la funció que toqui
  const changeBudget = (change) => {
    setBudgetList(change);
  };

  const orderAlphabetically = () => {
    const orderByTitle = budgetList
      .map((e) => e)
      .sort((a, b) => {
        a.currentTitle - b.currentTitle;
        if (a.currentTitle > b.currentTitle) return 1;
        else return -1;
      });
    changeBudget(orderByTitle);
  };

  // Per ordre alfabètic
  const orderDate = () => {
    const orderByDate = budgetList
      .map((e) => e)
      .sort((a, b) => {
        a.currentDate - b.currentDate;
        if (a.currentDate < b.currentDate) return 1;
        else return -1;
      });
    changeBudget(orderByDate);
  };

  // Restaurar l'ordre
  const reorder = () => {
    const restartOrder = budgetList
      .map((e) => e)
      .sort((a, b) => {
        a.currentDate - b.currentDate;
        if (a.currentDate > b.currentDate) return 1;
        else return -1;
      });
    changeBudget(restartOrder);
  };

  // Cercar per títol
  // CERCADOR PER TÍTOL
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);

    const filterByTitle = copyBudgetList.filter((e) => {
      if (e.currentTitle.toUpperCase().includes(search.toUpperCase())) {
        return true;
      }
      return false;
    });
    setFilteredBudget(filterByTitle);

    if (search === "" || search === " ") {
      setFilteredBudget(budgetList);
    }
  };

  return (
    <>
      
      <div>
        <Button onClick={orderAlphabetically}>Ordre alfabètic</Button>
        <Button onClick={orderDate}>Ordre cronològic</Button>
        <Button onClick={reorder}>Restaurar ordre</Button>


        <Input
          value={search}
          onChange={handleChangeSearch}
          type="text"
          placeholder="Cerca un pressupost per títol"
        ></Input>
      </div>
    </>
  );
};
