// Tarjetas
const seccionTarjetas = document.getElementById("seccion-tarjeta")
const seccionDetalles = document.getElementById("tarjeta-detalles")
const baseOscura = document.getElementById("base-oscura")

// Botones de pagina
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


let paginaActual = 1
let ultimaPagina = 0


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

// Personajes
const personajes = () => {
    fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            ultimaPagina = data.info.pages
            mostrarTarjetas(data.results)
            clickPorTarjeta()
        })
}
personajes()

const buscarPersonaje = (id) => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            tarjetaDetalle(data)
        })
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
    console.log("ultima pagina")
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
            baseOscura.classList.add("detalles-fondo")
        }
    }

}
const tarjetaDetalle = data => {

    seccionDetalles.style.display = "flex"


    seccionDetalles.innerHTML = `
    
    <article>
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
        seccionTarjetas.style.display = "flex"
        conteinerBotonesPrincipales.style.display = "block"
        baseOscura.classList.remove("detalles-fondo")
    }
}

let valorBusqueda = inputBusqueda.value
    // Busqueda de personajes
formBusqueda.oninput = e => {
    e.preventDefault()


    buscarInfo(valorBusqueda)
    seccionTarjetas.style.display = "none"
    resultadoBusqueda.style.display = "flex"
    conteinerBotonesPrincipales.style.display = "none"
    botonesPaginaBusqueda.style.display = "flex"
    valorBusqueda = ""

}

const mostrarResultado = personaje => {

    const resultados = personaje.reduce((acc, curr) => {

        return acc + `
        <div class="tarjetas-datos" data-id=${curr.id}>
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
        })

}

//Paginado de buscar personaje
const prevBusqueda = document.getElementById("prev-busqueda")
const nextBusqueda = document.getElementById("next-busqueda")


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