export class UserBudget { // Crea la classe (la fàbrica)
  title; // Defineixo quins "atributs" ha de tenir l'objecte que es crei a la fàbirica/classe. Defineixo la plantilla. (Ha de tenir un títol, un client...)
  client;
  date;
  services;
  pages;
  languages;
  total;

  constructor(client, date, services, pages, languages, total) { // Dic quins valors ha de "demanar" per poder construir l'objecte
    this.client = client; // this fa referència a l'objecte concret que s'està creant en aquell moment. El CLIENT "d'aquest" OBJECTE ha de ser igual al CLIENT que t'han passat al cridar la funció.
    this.date = date;
    this.services = services;
    this.pages = pages;
    this.languages = languages;
    this.total = total;
  }
}
