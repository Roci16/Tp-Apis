// Tarjetas
const seccionTarjetas = document.getElementById("seccion-tarjeta")
const seccionDetalles = document.getElementById("tarjeta-detalles")


const personajesDisney = () => {
    fetch(`https://api.disneyapi.dev/characters`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            mostrarTarjetas(data)

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