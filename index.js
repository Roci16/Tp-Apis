// Tarjetas
const seccionTarjetas = document.getElementById("seccion-tarjeta")
const seccionDetalles = document.getElementById("tarjeta-detalles")


// Botones de pagina
const conteinerBotones = document.getElementById("botones")
const numeroDePagina = document.getElementById("numero-pagina")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const botonPrimeraPagina = document.getElementById("primera-pagina")
const botonUltimaPagina = document.getElementById("ultima-pagina")

let paginaActual = 1
let ultimaPagina = 0

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


const numeroActualizoPagina = () => {

    const numeroPagina = `${paginaActual}`
    numeroDePagina.innerHTML = numeroPagina

}

const paginaUnoDesabilitado = () => {
    prev.disabled = true
    next.disabled = false
}
const paginaUltimaDesabilitado = () => {
    next.disabled = true
    prev.disabled = false
}

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

            seccionTarjetas.style.display = "none"
            conteinerBotones.style.display = "none"
        }

    }

}
const tarjetaDetalle = data => {

    seccionDetalles.style.display = "flex"
    menuTimes.style.display = "block"

    seccionDetalles.innerHTML = `
    
    <article>
    <img src="${data.image}">
    <h2>${data.name}</h2>
    <p>Gender: ${data.gender}</p>
    <p>Species: ${data.species}</p>
    <p>Status: ${data.status}</p> 
    </article>
  `



    const menuTimes = document.getElementById("menu-times")
    menuTimes.onclick = () => {
        seccionDetalles.style.display = "none"
        menuTimes.style.display = "none"
        seccionTarjetas.style.display = "flex"
        conteinerBotones.style.display = "block"
    }
}