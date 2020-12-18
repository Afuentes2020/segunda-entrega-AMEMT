let tableEl = document.getElementById("tabla"); //me traigo la tabla dinamica del DOM

//JSON
let data = `{
  "Oscars": [
      {"AÑO":2020, "PELICULA": "Parasite", "PRODUCTORA": "Barunson E&A,  CJ Entertainment ", "OSCARS":  4},
      {"AÑO":2019, "PELICULA": "Green Book", "PRODUCTORA": "Universal ", "OSCARS":  3},
      {"AÑO":2018, "PELICULA": "The Shape of Water", "PRODUCTORA":"Searchlight Pictures, TSG Entertainment ", "OSCARS":  4},
      {"AÑO":2017, "PELICULA": "Moonlight", "PRODUCTORA": "A24, PASTEL Production, Plan B Entertainment ", "OSCARS":  3},
      {"AÑO":2016, "PELICULA": "Spotlight", "PRODUCTORA": "Participant Media, First Look Media Rocklin/Faust ", "OSCARS":  2}
  ]
}`;
//convertimos la data en formato JSON a un objeto JS para poder acceder a sus propiedades
let dataParseada = JSON.parse(data);

//obtenemos las claves del objeto Oscars
let clavesProducto = Object.keys(dataParseada.Oscars[0]);

const buscarPorOscars = (peliculas, cantidad) => {
  const peliculasConOscars = peliculas.filter((el) => {
    return el.OSCARS == cantidad;
  });
  return peliculasConOscars;
};
