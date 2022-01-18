// Tarjetas
const seccionTarjetas = document.getElementById("seccion-tarjeta")
const seccionDetalles = document.getElementById("tarjeta-detalles")

// Botones de pagina
//botones nav
const botonPersonajes = document.getElementById("boton-personajes")
const botonCapitulos = document.getElementById("boton-capitulos")
const botonUniversos = document.getElementById("boton-universos")
const divInputBusqueda = document.getElementById("div-input-busqueda")
//-----------------------------------------------------------
const conteinerBotonesPrincipales = document.getElementById("botones-paginado-principal")
const numeroDePagina = document.getElementById("numero-pagina")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const botonPrimeraPagina = document.getElementById("primera-pagina")
const botonUltimaPagina = document.getElementById("ultima-pagina")
const formBusqueda = document.getElementById("form-busqueda")
const inputBusqueda = document.getElementById("input-busqueda")
const resultadoBusqueda = document.getElementById("resultado-tarjetas")
const botonesPaginaBusqueda = document.getElementById("botones-paginado-busqueda")
const numeroDePaginaBusqueda = document.getElementById("numero-pagina-busqueda")
const prevBusqueda = document.getElementById("prev-busqueda")
const nextBusqueda = document.getElementById("next-busqueda")
const botonPrimeraPaginaBusqueda = document.getElementById("primera-pagina-busqueda")
const botonUltimaPaginaBusqueda = document.getElementById("ultima-pagina-busqueda")

let paginaActual = 1
let ultimaPagina = 0

//comunicacion con la api

const numeroActualizoPagina = () => {
    const numeroPagina = `${paginaActual}`
    numeroDePagina.innerHTML = numeroPagina

}
const numeroActualizoPaginaBusqueda = () => {
    const numeroPaginaBusqueda = `${paginaActual}`
    numeroDePaginaBusqueda.innerHTML = numeroPaginaBusqueda

}

const paginaUnoDesabilitado = () => {
    prev.disabled = true
    next.disabled = false
}
const paginaUltimaDesabilitado = () => {
    next.disabled = true
    prev.disabled = false
}

// llamado para personajes
const personajes = () => {
    fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}`)
        .then((res) => res.json())
        .then((data) => {
            ultimaPagina = data.info.pages
            mostrarTarjetas(data.results)
            clickPorTarjeta()
            seccionTarjetas.style.display = "flex"
        })
}
// llamado para universos
const universos = () =>{
    fetch(`https://rickandmortyapi.com/api/location?page=${paginaActual}`)
    .then((res) =>res.json())
    .then((data)=> {
        ultimaPagina = data.info.pages
        mostrarTarjetas(data.results)
        clickPorTarjeta()
    })
}
// llamado para capitulos
const capitulos = () =>{
    fetch(`https://rickandmortyapi.com/api/episode?page=${paginaActual}`)
    .then((res) =>res.json())
    .then((data)=>{
        ultimaPagina = data.info.pages
        mostrarTarjetas(data.results)
        clickPorTarjeta()

    })
}


const buscarPersonaje = (id) => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then(data => {
            tarjetaDetalle(data)
        })
}

const apareceInput = () =>{
    const input = `<label id="form-busqueda"> 
    ¿A donde vamos Rick?
        <input id="input-busqueda" type="text" >
     </label>`
  return   divInputBusqueda.innerHTML = input
}


// eventos botones nav onclick
botonPersonajes.onclick = () =>{
    personajes()
    apareceInput()
}


botonUniversos.onclick = () =>{
    universos()
    divInputBusqueda.classList.remove("oculto")
}


botonCapitulos.onclick = () =>{
    capitulos()
    divInputBusqueda.classList.remove("oculto")
}

//Paginas Personajes en pantalla principal
prev.onclick = () => {
    paginaActual--

    if (paginaActual == 1) {
        prev.disabled = true
    }
    if (paginaActual < 42) {
        next.disabled = false
    }
    numeroActualizoPagina()
    personajes()
}

next.onclick = () => {
    paginaActual + 1

    if (paginaActual == 41) {
        next.disabled = true
    }

    if (paginaActual == paginaActual++) {
        prev.disabled = false
    }
    numeroActualizoPagina()
    personajes()

}

botonPrimeraPagina.onclick = () => {
    paginaActual = 1
    paginaUnoDesabilitado()
    numeroActualizoPagina()
    personajes()
}

botonUltimaPagina.onclick = () => {
    paginaActual = ultimaPagina
    paginaUltimaDesabilitado()
    numeroActualizoPagina()
    personajes()
}

// Muestra de personajes en pantalla principal
const mostrarTarjetas = personajes => {

    const html = personajes.reduce((acc, curr) => {

        return acc + `
<div class="tarjetas-datos" data-id=${curr.id}>
                <h2>
                    ${curr.name}
                </h2>
                 <img src="${curr.image}">
             </div>
`
    }, "")
    seccionTarjetas.innerHTML = html
}



const clickPorTarjeta = () => {
    const tarjetas = document.querySelectorAll(".tarjetas-datos")

    for (let i = 0; i < tarjetas.length; i++) {
        tarjetas[i].onclick = () => {
            const idPersonaje = tarjetas[i].dataset.id
            buscarPersonaje(idPersonaje)
            seccionDetalles.classList.add("detalles")
        }
    }

}
const tarjetaDetalle = data => {

    seccionDetalles.style.display = "flex"


    seccionDetalles.innerHTML = `
    
    <article class="tarjeta-detalle-individual">
    <div id="menu-times">
        <i class="fas fa-times"></i>
    </div>
    <img src="${data.image}">
    <h2>${data.name}</h2>
    <p>ID: ${data.id}</p>
    <p>Gender: ${data.gender}</p>
    <p>Species: ${data.species}</p>
    <p>Status: ${data.status}</p> 
    <p>Origin: ${data.origin.name}</p> 
    </article>
  `



    const menuTimes = document.getElementById("menu-times")
    menuTimes.style.display = "block"

    menuTimes.onclick = () => {
        seccionDetalles.style.display = "none"
        menuTimes.style.display = "none"
    }
}


// Busqueda de personajes
formBusqueda.oninput = e => {
    e.preventDefault()
    const valorBusqueda = inputBusqueda.value

    buscarInfo(valorBusqueda)

    console.log(valorBusqueda);

    seccionTarjetas.style.display = "none"
    resultadoBusqueda.style.display = "flex"
    conteinerBotonesPrincipales.style.display = "none"
    botonesPaginaBusqueda.style.display = "flex"

    nextBusqueda.onclick = () => {
        paginaActual + 1

        if (paginaActual == ultimaPagina) {
            nextBusqueda.disabled = true
        }

        if (paginaActual == paginaActual++) {
            prevBusqueda.disabled = false
        }
        numeroActualizoPaginaBusqueda()
        buscarInfo(valorBusqueda)
    }
    prevBusqueda.onclick = () => {
        paginaActual--

        if (paginaActual == 1) {
            prevBusqueda.disabled = true
        }
        if (paginaActual < ultimaPagina) {
            nextBusqueda.disabled = false
        }
        numeroActualizoPaginaBusqueda()
        buscarInfo(valorBusqueda)
    }
    botonPrimeraPaginaBusqueda.onclick = () => {
        paginaActual = 1
        paginaUnoDesabilitado()
        numeroActualizoPaginaBusqueda()
        buscarInfo(valorBusqueda)
    }

    botonUltimaPaginaBusqueda.onclick = () => {
        console.log("ultima pagina")
        paginaActual = ultimaPagina
        paginaUltimaDesabilitado()
        numeroActualizoPaginaBusqueda()
        buscarInfo(valorBusqueda)
    }
}

const mostrarResultado = personaje => {

    const resultados = personaje.reduce((acc, curr) => {

        return acc + `
        <div class="tarjetas-datos" data-id=${curr.id} >
                 <h2>
                     ${curr.name}
                 </h2>
                  <img src="${curr.image}">
            </div>
            
        `

    }, "")

    resultadoBusqueda.innerHTML = resultados

}

const buscarInfo = (nombre) => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${paginaActual}&name=${nombre}`)
        .then(res => res.json())
        .then(data => {

            ultimaPagina = data.info.pages
            mostrarResultado(data.results)
            console.log(data);
            clickPorTarjeta();
            resultadoBusqueda.style.display = "flex"
        })

}