import React from "react";
import { Button, Budget } from "../style/styled";

// FILTRAR ELS PRESSUPOSTOS
export const Filters = ({ budgetList }) => {
  // Per ordre alfabètic
  const orderAlphabetically = () => {
    const alphabeticallyBudgetList = budgetList
      .map((item) => item.currentTitle)
      .sort();
    console.log(alphabeticallyBudgetList);
    return alphabeticallyBudgetList;
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

    console.log(orderByDate);
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
    console.log(restartOrder);
  };

  return (
    <div>
      <Button onClick={orderAlphabetically}>Ordre alfabètic</Button>
      <Button onClick={orderDate}>Ordre cronològic</Button>
      <Button onClick={reorder}>Restaurar ordre</Button>
    </div>
  );
};
