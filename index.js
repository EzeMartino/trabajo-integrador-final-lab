boton = document.querySelector("button")

ciudad = document.querySelector("select")

resultado = document.getElementById("resultado")

APPID = "3936d0749fdc3124c6566ed26cf11978" /* ID de la app weather que pasaron los profes */

function error(){
    resultado.style.backgroundColor="red"
    resultado.innerText= "Error: Elija una de las ciudades"
}

function verClima(){
    climaciudad = ciudad.value
    if(climaciudad == "0"){
        error()
    } else {
        alert("La ciudad elegida es " + climaciudad)
    }
    
}