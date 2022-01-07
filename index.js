// Tarjetas
const seccionTarjetas = document.getElementById("seccion-tarjeta")
const seccionDetalles = document.getElementById("tarjeta-detalles")


const personajesDisney = () => {
    fetch(`https://api.disneyapi.dev/characters`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            mostrarTarjetas(data)
            clickPorTarjeta()
        })
}
personajesDisney()

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

const buscarPersonaje = (id) => {
    fetch(`https://api.disneyapi.dev/characters/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            tarjetaDetalle(data)
        })
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