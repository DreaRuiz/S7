import React from "react";
import { Button } from "../style/styled";

// FILTRAR ELS PRESSUPOSTOS
export const Filters = ({ setBudgetList, budgetList }) => {
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

  return (
    <div>
      <Button onClick={orderAlphabetically}>Ordre alfabètic</Button>
      <Button onClick={orderDate}>Ordre cronològic</Button>
      <Button onClick={reorder}>Restaurar ordre</Button>
    </div>
  );
};
