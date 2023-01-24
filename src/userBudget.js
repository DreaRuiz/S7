export class UserBudget {
  // Creo la classe i defineixo els atributs
  currentTitle;
  currentName;
  currentDate;
  services;
  numPages;
  numLanguages;
  total;

  constructor(
    currentTitle,
    currentName,
    currentDate,
    services,
    numPages,
    numLanguages,
    total
  ) {
    // Dic quins valors ha de "demanar" per poder construir l'objecte
    this.currentTitle = currentTitle;
    this.currentName = currentName; 
    this.currentDate = currentDate;
    this.services = services;
    this.numPages = numPages;
    this.numLanguages = numLanguages;
    this.total = total;
  }
}
