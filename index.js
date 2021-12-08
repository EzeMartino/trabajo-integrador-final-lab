//Definición de constantes
const API_KEY = "3936d0749fdc3124c6566ed26cf11978";
const CITIES_SELECT = document.querySelector(".cities");
const MESSAGE_PARRAFO = document.querySelector(".message");



//En caso de no estar creado el arreglo de ciudades en localStorage = crearlo
if (localStorage.getItem("cities") === null) {
    localStorage.setItem("cities", JSON.stringify(["CORDOBA", "ROSARIO","CABA"]));
};


//En caso de haber ciudades en localStorage agregarlas al select cuando cargue el DOM
window.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    if (localStorage.getItem("cities") !== null) {
        loadOptions(loadCitiesFromStorage());
    } 
});


//Función ejecutada cuando un usuario agrega una ciudad en la página "Agregar ciudad"
function addCityToStorage(element) {
    let city = element.parentElement.querySelector("#city").value.toUpperCase();
    let cities = loadCitiesFromStorage();
    let exist;
    cities.forEach(ciudad => {
        if (ciudad === city) {
            exist = true;
        }
    })
    if (!exist && city !== "") {
        cities.push(city);
    } else {
        MESSAGE_PARRAFO.innerText = "La ciudad ingresada ya existe o no es válida";
        MESSAGE_PARRAFO.style.backgroundColor = "red";
    }
    localStorage.setItem("cities", JSON.stringify(cities));
    loadOptions(cities);
}


//Devuelve el arreglo de ciudades proveniente del localStorage
function loadCitiesFromStorage() {
    let cities = JSON.parse(localStorage.getItem("cities"));
    return cities
}


//Carga un arreglo de options dentro del Select de ciudades
function loadOptions(cities) {
    cities.forEach((city) => {
        firstLetter = city.substring(0,1).toUpperCase();
        remLetters = city.substring(1).toLowerCase();
        city = firstLetter.concat(remLetters);
        CITIES_SELECT.innerHTML += `<option value="${city}">${city}</option>`;
    });
}


//Función que trae los datos del clima de la API y devuelve un string 
//que se corresponde con la respuesta del servidor para posteriormente
//pasarlo a la función showMessage
async function fetchWeather(element){
    try {
        let city = element.parentElement.querySelector(".cities").value;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
        let response = await fetch(url);
        let data = await response.json();
        let {temp, pressure, humidity, feels_like} = data.main;
        let { description, icon} = data.weather[0];
        createMessage({temp, pressure, humidity, feels_like, description, icon});
    } catch (error) {
        showMessage(error.message, true);
    }
}

function ocultarDiv(){
    DIV_SELECCIONAR_CIUDAD.style.display="none"
}

//Función que crea el mensaje a mostrar en caso de obtener una respuesta exitosa
function createMessage(weatherObject) {
    console.log(weatherObject);

    showMessage(message, false);
} 

//Función que muestra el resultado o el error dependiendo los parámetros
function showMessage(message, error) {
    if (error === true) {
        resultado.style.backgroundColor="red";
        resultado.innerText = message;
    } else {
        resultado.style.backgroundColor="green";
        resultado.innerText = message;
    }
}


