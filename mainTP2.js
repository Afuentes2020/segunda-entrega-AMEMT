"use strict";

let selectedRow;

const editElement = (event) => {
  const modalTitle = document.getElementById("modalTitle");
  modalTitle.innerHTML = "Editar Pelicula";

  selectedRow = event.target.closest("tr"); //obtengo la fila
  const valores = selectedRow.querySelectorAll("td"); //obtengo los valores de las celdas y se los asigno a los inputs
  document.getElementById("year").value = valores[0].innerHTML;
  document.getElementById("title").value = valores[1].innerHTML;
  document.getElementById("productor").value = valores[2].innerHTML;
  document.getElementById("oscars").value = valores[3].innerHTML;

  const btnAceptar = document.getElementById("btn-aceptar");
  btnAceptar.classList.remove("show");
  btnAceptar.classList.add("hide"); //oculto el boton de agregar pelicula

  const btnAceptarEditar = document.getElementById("btn-aceptar-editar");
  btnAceptarEditar.classList.remove("hide");
  btnAceptarEditar.classList.add("show"); //muestro el boton de editar pelicula
};

const deleteElement = (tr) => {
  tr.remove();
};

let createHeader = (claves) => {
  //claves es un array con los nombres de las claves de nuestro objeto --> ["año", "pelicula", "productora", "oscars" ]
  let theadEl = document.createElement("thead");
  let trEl = document.createElement("tr");
  //recorremos el arreglo de claves
  for (let i = 0; i < claves.length; i++) {
    //creamos un elemento th para cada clave
    let thEl = document.createElement("th");
    //cambiamos el innerHTML del th para que muestre cada clave
    thEl.innerHTML = claves[i];
    //agregamos el elemento th al elemento tr
    trEl.appendChild(thEl);
  }
  let thEl = document.createElement("th");
  thEl.innerHTML = "ACTIONS";
  trEl.appendChild(thEl);

  //agregamos el elemento tr al thead
  theadEl.appendChild(trEl);
  //agregamos el thead a nuestra tabla
  tableEl.appendChild(theadEl); //tableEl que fue traida del DOM en UtilsTP2.js
};

let createRow = (elemento) => {
  //elemento es el objeto que queremos mostrar en cada filaa --> {AÑO:2020, PELICULA: "Parasite", PRODUCTORA: "Barunson E&A,  CJ Entertainment ", OSCARS:  4}
  let trEl = document.createElement("tr");
  trEl.setAttribute("id", elemento.PELICULA);
  //iteramos sobre las propiedades de nuestro objeto
  for (let clave in elemento) {
    //creamos un elemento td para cada propiedad
    let tdEl = document.createElement("td");
    //cambiamos su innerHTML para que muestre el valor de cada propiedad
    tdEl.innerHTML = elemento[clave];
    if (clave === "OSCARS") {
      tdEl.classList.add("cantidad-oscars");
    }
    //agregamos el elemento td al elemento tr
    trEl.appendChild(tdEl);
  }

  let tdActions = document.createElement("td"); //creo la columna ACTIONS de la Tabla dentro de la funcion createRow
  const btnEdit = document.createElement("button"); //creo boton y luego le doy nombre Editar
  btnEdit.innerHTML = "Editar";
  btnEdit.classList.add("button"); //agrego button class para darle estilo
  btnEdit.setAttribute("id", "btn-modal-edit"); // agrego ID al button Edit
  btnEdit.setAttribute("data-toggle", "modal"); // agrego atributos de modal de Boostrap para que me habra el modal
  btnEdit.setAttribute("data-target", "#exampleModalLong");
  //ultima modif

  const btnDelete = document.createElement("button"); //creo boton Eliminar
  btnDelete.innerHTML = "Eliminar";
  btnDelete.classList.add("button");
  btnEdit.addEventListener("click", (event) => editElement(event));
  btnDelete.addEventListener("click", () => deleteElement(trEl));
  tdActions.appendChild(btnEdit);
  tdActions.appendChild(btnDelete);

  trEl.appendChild(tdActions);

  //devolvemos la fila creada
  return trEl;
};

let createBody = (rowElem) => {
  //bodyElem es un arreglo con todos los objetos que queremos mostrar en nuestra tabla [{}, {}, {}]
  let tbodyEl = document.createElement("tbody");
  tbodyEl.setAttribute("id", "tbody");
  for (let i = 0; i < rowElem.length; i++) {
    //recorremos el arreglo de objetos (rowElem) e invocamos la función de crear fila (createRow) para cada uno de ellos
    //la función nos devuelve un elemento tr y lo agregamos a nuestro elemento tbody
    const pelicula = rowElem[i];
    const fila = createRow(pelicula); //ME CUESTA LEER LINEAS 100, 101 Y 102!!!!
    tbodyEl.appendChild(fila);
  }
  //agregamos el elemento tbody a nuestro elemento tabla
  tableEl.appendChild(tbodyEl);
};

const guardarPelicula = () => {
  //aceptar pelicula en el Modal
  let body = document.getElementById("tbody");
  const inputYear = document.getElementById("year").value;
  const inputTitle = document.getElementById("title").value;
  const inputProductor = document.getElementById("productor").value;
  const inputOscars = document.getElementById("oscars").value;
  const progressBar = document.getElementById("progress-bar");

  const pelicula = {
    AÑO: inputYear,
    PELICULA: inputTitle,
    PRODUCTORA: inputProductor,
    OSCARS: inputOscars,
  };

  const fila = createRow(pelicula);
  progressBar.classList.remove("hide");
  progressBar.classList.add("show");
  setTimeout(() => {
    body.appendChild(fila);
    progressBar.classList.remove("show");
    progressBar.classList.add("hide");
  }, 2000);
};

const guardarEdicion = () => {
  //guardo los valores nuevos de la pelicula editada
  const values = selectedRow.querySelectorAll("td"); //obtengo todas las celdas
  values[0].innerHTML = document.getElementById("year").value;
  values[1].innerHTML = document.getElementById("title").value;
  values[2].innerHTML = document.getElementById("productor").value;
  values[3].innerHTML = document.getElementById("oscars").value;
};

const crearPelicula = () => {
  //al hacer click todo el contenido de los input que traia el boton..
  const inputYear = document.getElementById("year"); //editar se ponen en blanco para completar desde 0
  const inputTitle = document.getElementById("title");
  const inputProductor = document.getElementById("productor");
  const inputOscars = document.getElementById("oscars");
  inputYear.value = "";
  inputTitle.value = "";
  inputProductor.value = "";
  inputOscars.value = "";

  const modalTitle = document.getElementById("modalTitle"); //cambia el titulo de Modal a Agregar Pelicula
  modalTitle.innerHTML = "Agregar Pelicula";

  const btnAceptar = document.getElementById("btn-aceptar");
  btnAceptar.classList.remove("hide");
  btnAceptar.classList.add("show"); //muestro el boton de agregar pelicula

  const btnAceptarEditar = document.getElementById("btn-aceptar-editar");
  btnAceptarEditar.classList.remove("show");
  btnAceptarEditar.classList.add("hide"); //oculto el boton de editar pelicula
};

window.addEventListener("load", () => {
  createHeader(clavesProducto); //con el Object.keys de dataParseada.Oscars[0]
  createBody(dataParseada.Oscars);

  function filtrarTabla(event) {
    const celdasOscars = document.getElementsByClassName("cantidad-oscars");
    const valor = event.target.value;
    for (let i = 0; i < celdasOscars.length; i++) {
      if (celdasOscars[i].innerHTML <= valor) {
        celdasOscars[i].closest("tr").classList.add("show-celda");
        celdasOscars[i].closest("tr").classList.remove("hide");
      } else {
        celdasOscars[i].closest("tr").classList.remove("show-celda");
        celdasOscars[i].closest("tr").classList.add("hide");
      }
    }
  }

  const radioEl = document.getElementsByClassName("radio-btn");
  for (let i = 0; i < radioEl.length; i++) {
    radioEl[i].addEventListener("click", filtrarTabla);
  }

  // Agregar película
  const agregarPelicula = document.getElementById("agregarPelicula"); //del button Agregar de la Tabla
  agregarPelicula.addEventListener("click", crearPelicula);

  const btnAceptarPelicula = document.getElementById("btn-aceptar"); //una vez completo los input del Modal guardo la info
  btnAceptarPelicula.addEventListener("click", guardarPelicula); //con la funcion guardarPelicula del Button Aceptar.

  const btnAceptarEditar = document.getElementById("btn-aceptar-editar");
  btnAceptarEditar.addEventListener("click", guardarEdicion);
});
