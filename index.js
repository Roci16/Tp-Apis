// Tarjetas
const seccionTarjetas = document.getElementById("seccion-tarjeta")
const seccionDetalles = document.getElementById("tarjeta-detalles")

// Botones de pagina
//botones nav
const botonPersonajes = document.getElementById("boton-personajes")
const botonCapitulos = document.getElementById("boton-capitulos")
const botonUniversos = document.getElementById("boton-universos")
const divInputBusqueda = document.getElementById("div-input-busqueda")
    //-------------input----------------------------
const inputBusquedaPersonaje = document.getElementById("input-busqueda-personaje")
const formBusquedaPersonaje = document.getElementById("form-busqueda-personaje")
const inputBusquedaCapitulos = document.getElementById("input-busqueda-capitulos")
const formBusquedaCapitulos = document.getElementById("form-busqueda-capitulos")
const inputBusquedaUniversos = document.getElementById("input-busqueda-universos")
const formBusquedaUniversos = document.getElementById("form-busqueda-universos")

//elementos numeros de pagina--------------
const conteinerBotonesPrincipales = document.getElementById("botones-paginado-principal")
const numeroDePagina = document.getElementById("numero-pagina")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const botonPrimeraPagina = document.getElementById("primera-pagina")
const botonUltimaPagina = document.getElementById("ultima-pagina")
const resultadoBusqueda = document.getElementById("resultado-tarjetas")
const botonesPaginaBusqueda = document.getElementById("botones-paginado-busqueda")
const numeroDePaginaBusqueda = document.getElementById("numero-pagina-busqueda")
const prevBusqueda = document.getElementById("prev-busqueda")
const nextBusqueda = document.getElementById("next-busqueda")
const botonPrimeraPaginaBusqueda = document.getElementById("primera-pagina-busqueda")
const botonUltimaPaginaBusqueda = document.getElementById("ultima-pagina-busqueda")


//---------------------FETCH--------------------------------
//comunicacion con la api

// llamado para personajes

const personajes = () => {
        fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}`)
            .then((res) => res.json())
            .then((data) => {
                ultimaPagina = data.info.pages
                mostrarTarjetas(data.results)
                clickPorTarjetaPersonaje()
                seccionTarjetas.style.display = "flex"
            })
    }
    // llamado para universos
const universos = () => {
        fetch(`https://rickandmortyapi.com/api/location?page=${paginaActual}`)
            .then((res) => res.json())
            .then((data) => {
                ultimaPagina = data.info.pages
                mostrarTarjetasUniversos(data.results)
                    // clickPorTarjeta()
            })
    }
    // llamado para capitulos
const capitulos = () => {
        fetch(`https://rickandmortyapi.com/api/episode?page=${paginaActual}`)
            .then((res) => res.json())
            .then((data) => {
                ultimaPagina = data.info.pages
                mostrarTarjetasCapitulos(data.results)
                    // clickPorTarjeta()

            })
    }
    //---------------------------------------------------------------------------
    // funcion buscar personaje (para que sirve) te trae todas las tarjetas y cuando haces click se abre tarjeta detalle donde te muestra toda la info
const buscarPersonaje = (id) => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then(data => {
            tarjetaDetalle(data)
        })
}
//------------------------------------------------------------------------
// eventos botones nav onclick
botonPersonajes.onclick = () => {
    paginaActual = 1
    numeroActualizoPaginaBusqueda()
    personajes()
    divInputBusqueda.style.display = "flex"
    formBusquedaPersonaje.style.display = "flex"
    conteinerBotonesPrincipales.style.display = "flex"
    formBusquedaCapitulos.style.display = "none"
    formBusquedaUniversos.style.display = "none"
    resultadoBusqueda.style.display = "none"

}


botonUniversos.onclick = () => {
    paginaActual = 1
    numeroActualizoPaginaBusqueda()
    universos()
    divInputBusqueda.style.display = "flex"
    formBusquedaPersonaje.style.display = "none"
    formBusquedaCapitulos.style.display = "none"
    formBusquedaUniversos.style.display = "flex"
    resultadoBusqueda.style.display = "none"
    conteinerBotonesPrincipales.style.display = "flex"
}


botonCapitulos.onclick = () => {
    paginaActual = 1
    numeroActualizoPaginaBusqueda()
    capitulos()
    divInputBusqueda.style.display = "flex"
    formBusquedaPersonaje.style.display = "none"
    formBusquedaCapitulos.style.display = "flex"
    formBusquedaUniversos.style.display = "none"
    resultadoBusqueda.style.display = "none"
    conteinerBotonesPrincipales.style.display = "flex"
}

//--------------paginado------------------------------------------------

//funcion para el numerado de página
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

// FUNCIONES AUXILIARES PARA PAGINADO POR FILTRO

const prevOnclick = () =>{
  paginaActual--

    if (paginaActual == 1) {
        prev.disabled = true
    }
    if (paginaActual < 42) {
        next.disabled = false
    }

}

const nextOnclick = () =>{
    paginaActual + 1

    if (paginaActual == 41) {
        next.disabled = true
    }

    if (paginaActual == paginaActual++) {
        prev.disabled = false
    }
}


//funcion Paginado Personajes en pantalla principal
//como hago para reutilizar la funcion si repetir codigo pero ejecutando la funcion por fetch para cada

prev.onclick = () => {
    prevOnclick()
    numeroActualizoPagina() 
    if(formBusquedaUniversos.style.display === "flex"){
        universos()
        }
    else if(formBusquedaPersonaje.style.display === "flex"){
     personajes()
    }
    else if (formBusquedaCapitulos.style.display === "flex")
        capitulos()
    }


next.onclick = () => {
    nextOnclick()
    numeroActualizoPagina()
    if(formBusquedaUniversos.style.display === "flex"){
        universos()
        }
    else if(formBusquedaPersonaje.style.display === "flex"){
     personajes()
    }
    else if (formBusquedaCapitulos.style.display === "flex"){
        capitulos()
    }

}

botonPrimeraPagina.onclick = () => {
    paginaActual = 1
    paginaUnoDesabilitado()
    numeroActualizoPagina()
    if(formBusquedaUniversos.style.display === "flex"){
        universos()
        }
    else if(formBusquedaPersonaje.style.display === "flex"){
     personajes()
    }
    else if (formBusquedaCapitulos.style.display === "flex"){
        capitulos()
    }
}

botonUltimaPagina.onclick = () => {
    paginaActual = ultimaPagina
    paginaUltimaDesabilitado()
    numeroActualizoPagina()
    if(formBusquedaUniversos.style.display === "flex"){
        universos()
        }
    else if(formBusquedaPersonaje.style.display === "flex"){
     personajes()
    }
    else if (formBusquedaCapitulos.style.display === "flex"){
        capitulos()
    }
}


//------------------------------------------------------------------------------------

// Muestra de personajes en pantalla principal
const mostrarTarjetas = personajes => {

    const html = personajes.reduce((acc, curr) => {

        return acc + `
<div class="tarjetas-datos" data-id=${curr.id} >
                <h2>
                    ${curr.name}
                </h2>
                 <img src="${curr.image}">
             </div>
`
    }, "")
    seccionTarjetas.innerHTML = html
}

// Muestra de universos en pantalla principal
const mostrarTarjetasUniversos = universos => {

    const html = universos.reduce((acc, curr) => {

        return acc + `
<div  class="tarjetas-datos-universo" data-id=${curr.id}>
                <h2>
                    ${curr.name}
                </h2>
                 <img src="imagenes/universos.jpg">
             </div>
`
    }, "")
    seccionTarjetas.innerHTML = html
}

// Muestra de capitulos en pantalla principal
const mostrarTarjetasCapitulos = capitulos => {

        const html = capitulos.reduce((acc, curr) => {

            return acc + `
<div class="tarjetas-datos" data-id=${curr.id}>
                <h2>
                    ${curr.name}
                </h2>
                 <img src="imagenes/capitulos.png">
             </div>
`
        }, "")
        seccionTarjetas.innerHTML = html
    }
    //--------------------------------------------------------------------------------------

// click por tajeta que muestra el detalle click y que haga algo falta el de universos y capitulos
const clickPorTarjetaPersonaje = () => {
        const tarjetas = document.querySelectorAll(".tarjetas-datos")

        for (let i = 0; i < tarjetas.length; i++) {
            tarjetas[i].onclick = () => {//tendra que poner un if else que si esta en display none o flex solamente personajes 
                const idPersonaje = tarjetas[i].dataset.id
                //if()
                buscarPersonaje(idPersonaje) //dentro de esta funcion esta la funcion mostrar detalles por tarjeta
                seccionDetalles.classList.add("detalles")//se le agrega el flex
            }
        }

    }

    //hace un for a todas las tarjetas que tiene en la funcion onclick
    //decirle que 
    //tarjeta detalle creacion de tarjeta unica
    // TARJETA DETALLE
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

// Busqueda de capitulos
formBusquedaCapitulos.oninput = e => {
    e.preventDefault()
    const valorBusqueda = inputBusquedaCapitulos.value
    console.log(valorBusqueda);
    buscarInfoCapitulo(valorBusqueda)

    seccionTarjetas.style.display = "none"
    resultadoBusqueda.style.display = "flex"
    conteinerBotonesPrincipales.style.display = "none"
}

// Busqueda de universo
formBusquedaUniversos.oninput = e => {
    e.preventDefault()
    const valorBusqueda = inputBusquedaUniversos.value
    console.log(valorBusqueda);
    buscarInfoUniverso(valorBusqueda)

    seccionTarjetas.style.display = "none"
    resultadoBusqueda.style.display = "flex"
    conteinerBotonesPrincipales.style.display = "none"
}

// Busqueda de personajes
formBusquedaPersonaje.oninput = e => {
    e.preventDefault()
    const valorBusqueda = inputBusquedaPersonaje.value

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

//-----------------MOSTRAR RESULTADOS DE BUSQUEDA ------------------------------------------------------
//aca hay que modficar que sea mostrarResultadoPersonaje 
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
    //Mostrar resultado de busqueda universos
const mostrarResultadoUniversos = universos => {
    seccionTarjetas.style.display = "none"
    conteinerBotonesPrincipales.style.display = "none"
    const resultados = universos.reduce((acc, curr) => {

        return acc + `
        <div class="tarjetas-datos-universo" data-id=${curr.id} >
                 <h2>
                     ${curr.name}
                 </h2>
                  <img src= "imagenes/universos.jpg">
            </div>
            
        `

    }, "")

    resultadoBusqueda.innerHTML = resultados

}

//Mostrar resultado de busqueda capitulos
const mostrarResultadoCapitulos = capitulos => {

        const resultados = capitulos.reduce((acc, curr) => {

            return acc + `
        <div class="tarjetas-datos" data-id=${curr.id} >
                 <h2>
                     ${curr.name}
                 </h2>
                  <img src= "imagenes/capitulos.png">
            </div>
            
        `

        }, "")

        resultadoBusqueda.innerHTML = resultados

    }
    //----------------------------------BUSCAR INFORMACION------------------------------------------------
    //buscar por personaje
const buscarInfo = (nombre) => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${paginaActual}&name=${nombre}`)
        .then(res => res.json())
        .then(data => {

            ultimaPagina = data.info.pages
            mostrarResultado(data.results)
            console.log(data);
            clickPorTarjetaPersonaje();
            resultadoBusqueda.style.display = "flex"
        })

}


//buscar por universo
const buscarInfoUniverso = (valor) => {
    fetch(`https://rickandmortyapi.com/api/location?page=${paginaActual}&name=${valor}`)
        .then(res => res.json())
        .then(data => {

            ultimaPagina = data.info.pages
            mostrarResultadoUniversos(data.results)
            console.log(data);
            // clickPorTarjeta();
            resultadoBusqueda.style.display = "flex"
        })

}


//buscar por capitulo
const buscarInfoCapitulo = (nombre) => {
    fetch(`https://rickandmortyapi.com/api/episode/?page=${paginaActual}&name=${nombre}`)
        .then(res => res.json())
        .then(data => {

            ultimaPagina = data.info.pages
            mostrarResultadoCapitulos(data.results)
            console.log(data);
            // clickPorTarjeta();
            resultadoBusqueda.style.display = "flex"
        })

}