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
let ultimaPagina = 149

const personajesDisney = () => {
    fetch(`https://api.disneyapi.dev/characters?page=${paginaActual}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            mostrarTarjetas(data)
            clickPorTarjeta()
        })
}
personajesDisney()

const buscarPersonaje = (id) => {
    fetch(`https://api.disneyapi.dev/characters/${id}`)
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
    if (paginaActual < ultimaPagina) {
        next.disabled = false
    }
    numeroActualizoPagina()
    personajesDisney()
}

next.onclick = () => {
    paginaActual + 1

    if (paginaActual == ultimaPagina) {
        next.disabled = true
    }

    if (paginaActual == paginaActual++) {
        prev.disabled = false
    }
    numeroActualizoPagina()
    personajesDisney()

}
botonPrimeraPagina.onclick = () => {
    paginaActual = 1
    paginaUnoDesabilitado()
    numeroActualizoPagina()
    personajesDisney()
}
botonUltimaPagina.onclick = () => {
    console.log("ultima pagina")
    paginaActual = ultimaPagina
    paginaUltimaDesabilitado()
    numeroActualizoPagina()
    personajesDisney()


}

const mostrarTarjetas = data => {

    const html = data.data.reduce((acc, curr) => {
        return acc + `
<div class="tarjetas-datos" data-id=${curr._id}>
                <h2>
                    ${curr.name}
                </h2>
                 <img src="${curr.imageUrl}">
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

    seccionDetalles.innerHTML = `
    <article>
    <div id="menu-times">
    <i class="fas fa-times"></i>
</div>
    <img src="${data.imageUrl}">
    <h2>${data.name}</h2>
    <p>Films: ${data.films.length === 0 ? "No results":data.films.join(', ')}</p>
    <p>Short Films: ${data.shortFilms.length === 0 ? "No results":data.shortFilms.join(', ')}</p> 
    <p>Tv Shows: ${data.tvShows.length === 0 ? "No results":data.tvShows.join(', ')}</p>
    <p>Videogames: ${data.videoGames.length === 0 ? "No results":data.videoGames.join(', ')}</p> 
    <p>Park Attraction: ${data.parkAttractions.length === 0 ? "No results":data.parkAttractions.join(', ')}</p> 
    </article> `

    const menuTimes = document.getElementById("menu-times")
    menuTimes.onclick = () => {
        seccionDetalles.style.display = "none"
        menuTimes.style.display = "none"
        seccionTarjetas.style.display = "flex"
        conteinerBotones.style.display = "block"
    }
}