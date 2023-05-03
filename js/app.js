const container = document.querySelector(".container")
const resultado  = document.querySelector("#resultado")
const formulario = document.querySelector("#formulario")

window.addEventListener("load",()=>{
    formulario.addEventListener("submit",buscarElClima)
})

function buscarElClima(e){
    e.preventDefault()
    //validar si los campos estan correctos
    const ciudad = document.querySelector("#ciudad").value
    const pais = document.querySelector("#pais").value

    if(ciudad === "" || pais === ""){
        //hubo un error
        mostrarError("Todos los campos son obligatorios")
    }else{
        //si se pasa la validacion consultamos la api
        consultarApi(ciudad,pais)
    }
}

function mostrarError(mensaje){
    const alerta = document.createElement("div")
        alerta.classList.add("bg-red-200","border-red-400","text-red-700","px-4","py-3","rounded","max-w-md","mx-auto","mt-6","text-center","no")
        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
    `
    const errores  = document.querySelectorAll(".no")
    if(errores.length === 0){
        container.appendChild(alerta)
    }

    setTimeout(() => {
        alerta.remove()
    }, 5000);
}

function consultarApi(ciudad,pais){
    const appId = "a96b4c8255063f4d4314149d8281e9b0"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    spinner()
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
        limpiarHTML()
        if(datos.cod === "404"){
            mostrarError("Ciudad no encontrada")
        }else{
            mostrarClima(datos)
        }
    });
}

function mostrarClima(datos){
    const {name, main: {temp, temp_max,temp_min}} = datos
    const centigrados = KelviACentrigrados(temp)
    const max = KelviACentrigrados(temp_max)
    const min = KelviACentrigrados(temp_min)

    const nombreCiudad = document.createElement("div")
    nombreCiudad.textContent = `Clima en ${name}`
    nombreCiudad.classList.add("font-bold","text-2xl")

    const actual = document.createElement("p")
    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add("font-bold","text-6xl")

    const tempMaxima = document.createElement("p")
    tempMaxima.innerHTML = `Max: ${max}  &#8451`
    tempMaxima.classList.add("text-xl")

    const tempMinima = document.createElement("p")
    tempMinima.innerHTML = `Min: ${min}  &#8451`
    tempMaxima.classList.add("text-xl")

    const resultadoDiv = document.createElement("div")
    resultado.classList.add("text-center","text-white")
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(actual)

    resultado.appendChild(resultadoDiv)
    resultado.appendChild(tempMaxima)
    resultado.appendChild(tempMinima)
}

//funcion hellper
const KelviACentrigrados=(grados)=>parseInt(grados - 273.15) 

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function spinner(){
    limpiarHTML()
    const divSpinner = document.createElement("div")
    divSpinner.classList.add("sk-fading-circle");
    divSpinner.innerHTML = `
        <div class="sk-fading-circle">
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `
    resultado.appendChild(divSpinner)
}