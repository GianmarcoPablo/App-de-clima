const container = document.querySelector(".container")
const formulario = document.querySelector("#formulario")
const resultado  = document.querySelector("#resultado")

window.addEventListener("load",()=>{
    formulario.addEventListener("submit",buscarElClima)
})

function buscarElClima(e){
    e.preventDefault()
    const ciudad = document.querySelector("#ciudad").value
    const pais = document.querySelector("#pais").value
    if(ciudad === "" || pais === ""){
        mostrarError("Todos los campos son obligatorios")
    }
    consultarApi(ciudad,pais)
}

function mostrarError(mensaje){
    const alerta = document.createElement("div")
    alerta.classList.add("bg-red-200","border-red-400","text-red-700","px-4","py-3","rounded","max-w-md","mx-auto","mt-6","text-center","no")
    alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
    `
    const errores = document.querySelectorAll(".no")
    if(errores.length === 0){
        container.appendChild(alerta)
    }
    setTimeout(()=>{
        alerta.remove()
    },4000)
}

function consultarApi(ciudad,pais){
    const appId = "a96b4c8255063f4d4314149d8281e9b0"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if(datos.cod === "404"){
                mostrarError("Clima no disponible")
            }else{
                
            }
        })
}