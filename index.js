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

//modo oscuro
const modoOscuroBoton = document.getElementById("div-modos")
const body = document.querySelector("body")
const nav = document.querySelector("nav")
const footer = document.querySelector("footer")


// Sort
const select = document.getElementById("select-ordenar")

// Not Found 
const notFound = document.getElementById("not-found")

//---------------------FETCH--------------------------------
// llamado para personajes

const personajes = () => {
        fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}`)
            .then((res) => res.json())
            .then((data) => {
                mostrarTarjetas(data.results)                  
                clickPorTarjeta()
                ordenarSelect (data.results, select.value) 
                ultimaPagina = data.info.pages  
            }) 
    }      

 // llamado para universos
const universos = () => {
        fetch(`https://rickandmortyapi.com/api/location?page=${paginaActual}`)
            .then((res) => res.json())
            .then((data) => {
                ultimaPagina = data.info.pages
                mostrarTarjetasUniversos(data.results)
                clickPorTarjeta()
                ordenarSelect (data.results, select.value)
            })
    }
    // llamado para capitulos
const capitulos = () => {
    fetch(`https://rickandmortyapi.com/api/episode?page=${paginaActual}`)
        .then((res) => res.json())
        .then((data) => {
            ultimaPagina = data.info.pages
            mostrarTarjetasCapitulos(data.results)
            clickPorTarjeta()
            ordenarSelect (data.results, select.value)
        })
}


//------------------------------------------------------------------------
// eventos botones nav onclick

botonPersonajes.onclick = () => {
    paginaActual = 1
    numeroActualizoPagina(paginaActual = 1)
    divInputBusqueda.style.display = "flex"
    formBusquedaPersonaje.style.display = "flex"
    conteinerBotonesPrincipales.style.display = "flex"
    formBusquedaCapitulos.style.display = "none"
    formBusquedaUniversos.style.display = "none"
    resultadoBusqueda.style.display = "none"
    botonesPaginaBusqueda.style.display = "none"
    seccionTarjetas.style.display = "flex"
    notFound.style.display = "none"
    personajes()
}


botonUniversos.onclick = () => {
    paginaActual = 1
    numeroActualizoPagina(paginaActual = 1)
    divInputBusqueda.style.display = "flex"
    formBusquedaPersonaje.style.display = "none"
    formBusquedaCapitulos.style.display = "none"
    formBusquedaUniversos.style.display = "flex"
    resultadoBusqueda.style.display = "none"
    conteinerBotonesPrincipales.style.display = "flex"
    botonesPaginaBusqueda.style.display = "none"
    seccionTarjetas.style.display = "flex"
    notFound.style.display = "none"
    universos()
}


botonCapitulos.onclick = () => {
    paginaActual = 1

    numeroActualizoPagina(paginaActual = 1)
    divInputBusqueda.style.display = "flex"
    formBusquedaPersonaje.style.display = "none"
    formBusquedaCapitulos.style.display = "flex"
    formBusquedaUniversos.style.display = "none"
    resultadoBusqueda.style.display = "none"
    conteinerBotonesPrincipales.style.display = "flex"
    botonesPaginaBusqueda.style.display = "none"
    seccionTarjetas.style.display = "flex"
    notFound.style.display = "none"
    capitulos()
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

const prevOnclick = () => {
    paginaActual--

    if(paginaActual = 1){
        prev.disabled = true
    }
    if (paginaActual < 42) {
        next.disabled = false
    }

}

const nextOnclick = () => {
    paginaActual + 1

    if (paginaActual == 41) {
        next.disabled = true
    }

    if (paginaActual == paginaActual++) {
        prev.disabled = false
    }
}


const prevBusquedaOnclick = ()=>{
    paginaActual--

    if (paginaActual = 1) {
        prevBusqueda.disabled = true
    }
    if (paginaActual < ultimaPagina) {
        nextBusqueda.disabled = false
    }
}


const nextBusquedaOnclick = ()=>{
    paginaActual + 1

    if (paginaActual == ultimaPagina) {
        nextBusqueda.disabled = true
    }

    if (paginaActual == paginaActual++) {
        prevBusqueda.disabled = false
    }
}



//funcion Paginado Personajes en pantalla principal


prev.onclick = () => {
    prevOnclick()
    numeroActualizoPagina()
    if (formBusquedaUniversos.style.display === "flex") {
        universos()
    } else if (formBusquedaPersonaje.style.display === "flex") {
        personajes()
    } else if (formBusquedaCapitulos.style.display === "flex")
        capitulos()
}


next.onclick = () => {
    nextOnclick()
    numeroActualizoPagina()
    if (formBusquedaUniversos.style.display === "flex") {
        universos()
    } else if (formBusquedaPersonaje.style.display === "flex") {
        personajes()
    } else if (formBusquedaCapitulos.style.display === "flex") {
        capitulos()
    }

}

botonPrimeraPagina.onclick = () => {
    paginaActual = 1
    paginaUnoDesabilitado()
    numeroActualizoPagina()
    if (formBusquedaUniversos.style.display === "flex") {
        universos()
    } else if (formBusquedaPersonaje.style.display === "flex") {
        personajes()
    } else if (formBusquedaCapitulos.style.display === "flex") {
        capitulos()
    }
}

botonUltimaPagina.onclick = () => {
    paginaActual = ultimaPagina
    paginaUltimaDesabilitado()
    numeroActualizoPagina()
    if (formBusquedaUniversos.style.display === "flex") {
        universos()
    } else if (formBusquedaPersonaje.style.display === "flex") {
        personajes()
    } else if (formBusquedaCapitulos.style.display === "flex") {
        capitulos()
    }
}


//------------------------------------------------------------------------------------

// Muestra de personajes en pantalla principal
const mostrarTarjetas = personajes => {

    const html = personajes.reduce((acc, curr) => {

        return acc + `
            <div aria-label="card character ${curr.name}" class="tarjetas-datos diseño-card-general" data-id=${curr.id} >
                <h2>
                    ${curr.name}
                </h2>
                 <img src="${curr.image}" alt"">
             </div>
`
    }, "")
    seccionTarjetas.innerHTML = html
    
}

// Muestra de universos en pantalla principal
const mostrarTarjetasUniversos = universos => {

    const html = universos.reduce((acc, curr) => {

        return acc + `
            <div aria-label="card location ${curr.name}" class="tarjetas-datos tarjetas-datos-universo diseño-card-general" data-id=${curr.id}>
                <h2>
                    ${curr.name}
                </h2>
                 <img src="imagenes/universos.jpg" alt"">       
             </div>
`
    }, "")
    seccionTarjetas.innerHTML = html
}

// Muestra de capitulos en pantalla principal
const mostrarTarjetasCapitulos = capitulos => {

        const html = capitulos.reduce((acc, curr) => {

            return acc + `
            <div  aria-label="card episode ${curr.name}" class="tarjetas-datos diseño-card-general" data-id=${curr.id}>
                <h2>
                    ${curr.name}
                </h2>
                 <img src="imagenes/capitulos.png" alt="">
             </div>
`
        }, "")
        seccionTarjetas.innerHTML = html
    }
    //--------------------------------------------------------------------------------------

//---------------------------------------------------------------------------
// funcion buscar personaje por id 
const buscarPersonaje = (id) => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then(data => {
            tarjetaDetallePersonaje(data)
        })
}

// bucar universo por id
const buscarUniversoId = (id) => {
    fetch(`https://rickandmortyapi.com/api/location/${id}`)
        .then(res => res.json())
        .then(data => {
            tarjetaDetalleUniverso(data)
        })
}

// buscar capitulo por id
const buscarcapituloId = (id) => {
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
        .then(res => res.json())
        .then(data => {
            tarjetaDetalleCapitulos(data)
        })
}



// click por tajeta que muestra el detalle 
const clickPorTarjeta = () => {
    const tarjetas = document.querySelectorAll(".tarjetas-datos")


    for (let i = 0; i < tarjetas.length; i++) {
        tarjetas[i].onclick = () => { 
            const idTarjetas = tarjetas[i].dataset.id
            if (formBusquedaPersonaje.style.display === "flex") {
                buscarPersonaje(idTarjetas)
            }
            if (formBusquedaUniversos.style.display === "flex") {
                buscarUniversoId(idTarjetas)
            }
            if (formBusquedaCapitulos.style.display === "flex") {
                buscarcapituloId(idTarjetas)
            }
            seccionDetalles.classList.add("detalles") 
        }
    }
}



// TARJETA DETALLE
const tarjetaDetallePersonaje = data => {

    seccionDetalles.style.display = "flex"


    seccionDetalles.innerHTML = `
    
    <article aria-label="card" class="tarjeta-detalle-individual">
    <div id="menu-times">
        <i class="fas fa-times"></i>
    </div>
    <img src="${data.image}">
    <h2>${data.name}</h2>
    <p>ID: ${data.id}</p>
    <p>Gender: ${data.gender}</p>
    <p>Species: ${data.species}</p>
    <p>Status: ${data.status}</p> 

    </article>
  `
    const menuTimes = document.getElementById("menu-times")
    menuTimes.style.display = "block"

    menuTimes.onclick = () => {
        seccionDetalles.style.display = "none"
        menuTimes.style.display = "none"
    }
}

const tarjetaDetalleCapitulos = data => {
    seccionDetalles.style.display = "flex"


    seccionDetalles.innerHTML = `
    
    <article aria-label="card" class="tarjeta-detalle-individual">
    <div id="menu-times">
        <i class="fas fa-times"></i>
    </div>
    <img src="imagenes/capitulos.png">
    <h2>${data.name}</h2>
    <p>ID: ${data.id}</p>
    <p>Air: ${data.air_date}</p>
    <p>Episode: ${data.episode}</p>
    </article>
  `

    const menuTimes = document.getElementById("menu-times")
    menuTimes.style.display = "block"

    menuTimes.onclick = () => {
        seccionDetalles.style.display = "none"
        menuTimes.style.display = "none"
    }
}

const tarjetaDetalleUniverso = data => {
    seccionDetalles.style.display = "flex"


    seccionDetalles.innerHTML = `
    
    <article aria-label="card" class="tarjeta-detalle-individual-universo">
    <div id="menu-times">
        <i class="fas fa-times"></i>
    </div>
    <img src="imagenes/universos.jpg">
    <h2>${data.name}</h2>
    <p>ID: ${data.id}</p>
    <p>Type: ${data.type}</p>
    <p>Dimension: ${data.dimension}</p>
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
    buscarInfoCapitulo(valorBusqueda)

    seccionTarjetas.style.display = "none"
    resultadoBusqueda.style.display = "flex"
    conteinerBotonesPrincipales.style.display = "none"
    botonesPaginaBusqueda.style.display = "flex"

    prevBusqueda.onclick = () => {
        prevBusquedaOnclick()
        numeroActualizoPaginaBusqueda()
        buscarInfo(valorBusqueda)
    } 
    nextBusqueda.onclick = () => {
        nextBusquedaOnclick()
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
        paginaActual = ultimaPagina
        paginaUltimaDesabilitado()
        numeroActualizoPaginaBusqueda()
          buscarInfo(valorBusqueda)
    } 
 
}

// Busqueda de universo
formBusquedaUniversos.oninput = e => {
    e.preventDefault()
    const valorBusqueda = inputBusquedaUniversos.value
    buscarInfoUniverso(valorBusqueda)

    seccionTarjetas.style.display = "none"
    resultadoBusqueda.style.display = "flex"
    conteinerBotonesPrincipales.style.display = "none"
    botonesPaginaBusqueda.style.display = "flex"

    prevBusqueda.onclick = () => {
        prevBusquedaOnclick()
        numeroActualizoPaginaBusqueda()
        buscarInfo(valorBusqueda)
    } 
    nextBusqueda.onclick = () => {
        nextBusquedaOnclick()
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
        paginaActual = ultimaPagina
        paginaUltimaDesabilitado()
        numeroActualizoPaginaBusqueda()
          buscarInfo(valorBusqueda)
    } 
 
}

// Busqueda de personajes
formBusquedaPersonaje.oninput = e => {
    e.preventDefault()
    const valorBusqueda = inputBusquedaPersonaje.value

    buscarInfo(valorBusqueda)

    seccionTarjetas.style.display = "none"
    resultadoBusqueda.style.display = "flex"
    conteinerBotonesPrincipales.style.display = "none"
    botonesPaginaBusqueda.style.display = "flex"

    prevBusqueda.onclick = () => {
        prevBusquedaOnclick()
        numeroActualizoPaginaBusqueda()
        buscarInfo(valorBusqueda)
    } 
    nextBusqueda.onclick = () => {
        nextBusquedaOnclick()
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
        paginaActual = ultimaPagina
        paginaUltimaDesabilitado()
        numeroActualizoPaginaBusqueda()
          buscarInfo(valorBusqueda)
    } 
}

//-----------------MOSTRAR RESULTADOS DE BUSQUEDA ------------------------------------------------------
const mostrarResultadoPersonaje = personaje => {

        const resultados = personaje.reduce((acc, curr) => {

            return acc + `
        <div class="tarjetas-datos diseño-card-general" data-id=${curr.id} >
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

    conteinerBotonesPrincipales.style.display = "none"
    const resultados = universos.reduce((acc, curr) => {

        return acc + `
        <div class="tarjetas-datos tarjetas-datos-universo diseño-card-general" data-id=${curr.id} >
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
        <div class="tarjetas-datos diseño-card-general" data-id=${curr.id} >
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
            if(data. results === undefined){
                resultadoBusqueda.style.display = "none"
                notFound.style.display ="flex"
                notFound.style.justifyContent = "center";
                botonesPaginaBusqueda.style.display="none"
                }
            else{
                ultimaPagina = data.info.pages
                mostrarResultadoPersonaje(data.results)
                clickPorTarjeta();
                resultadoBusqueda.style.display = "flex"
                notFound.style.display ="none"
                }
        })
}


//buscar por universo
const buscarInfoUniverso = (valor) => {
    fetch(`https://rickandmortyapi.com/api/location?page=${paginaActual}&name=${valor}`)
        .then(res => res.json())
        .then(data => {
            if(data. results === undefined){
                resultadoBusqueda.style.display = "none"
                notFound.style.display ="flex"
                notFound.style.justifyContent = "center";
                botonesPaginaBusqueda.style.display="none"
                }
            else{
                ultimaPagina = data.info.pages
                mostrarResultadoPersonaje(data.results)
                clickPorTarjeta();
                resultadoBusqueda.style.display = "flex"
                notFound.style.display ="none"
                }
        })
}


//buscar por capitulo
const buscarInfoCapitulo = (nombre) => {
    fetch(`https://rickandmortyapi.com/api/episode/?page=${paginaActual}&name=${nombre}`)
        .then(res => res.json())
        .then(data => {
            if(data. results === undefined){
                resultadoBusqueda.style.display = "none"
                notFound.style.display ="flex"
                notFound.style.justifyContent = "center";
                botonesPaginaBusqueda.style.display="none"
                }
            else{
                ultimaPagina = data.info.pages
                mostrarResultadoPersonaje(data.results)
                clickPorTarjeta();
                resultadoBusqueda.style.display = "flex"
                notFound.style.display ="none"
                }
        })

}

// Sort

select.onchange =(e)=>{
    e.preventDefault()
    if (formBusquedaUniversos.style.display === "flex") {
        universos()
    } else if (formBusquedaPersonaje.style.display === "flex") {
        personajes()
    } else if (formBusquedaCapitulos.style.display === "flex") {
        capitulos()
    }
}
const ordenarSelect = (data,value) =>{

        if(value === "sort"){
            const sinOrden = ()=>{
                             if (formBusquedaPersonaje.style.display === "flex") {
                 mostrarTarjetas(sinOrden)
                 }
             else if (formBusquedaUniversos.style.display === "flex") {
                       mostrarTarjetasUniversos(sinOrden)
                     }
            else if (formBusquedaCapitulos.style.display === "flex") {
                         mostrarTarjetasCapitulos(sinOrden)
                     }
            }
        }

        if(value === "a/z"){
        const ordenarAZ =data.sort((a,b)=>{
            if(a.name < b.name){
                return -1
            }
            if(a.name > b.name){
                return 1
            }
            return 0
        })
        if (formBusquedaPersonaje.style.display === "flex") {
            mostrarTarjetas(ordenarAZ)
        }
        else if (formBusquedaUniversos.style.display === "flex") {
            mostrarTarjetasUniversos(ordenarAZ)
        }
        else if (formBusquedaCapitulos.style.display === "flex") {
            mostrarTarjetasCapitulos(ordenarAZ)
        }
    }

    if(value === "z/a"){
        const ordenarZA = data.sort((a,b) =>{
                 if(a.name > b.name){
            return -1
        }
        if(a.name < b.name){
            return 1
        }
        return 0   
        })
        if (formBusquedaPersonaje.style.display === "flex") {
            mostrarTarjetas(ordenarZA)
        }
        else if (formBusquedaUniversos.style.display === "flex") {
            mostrarTarjetasUniversos(ordenarZA)
        }
        else if (formBusquedaCapitulos.style.display === "flex") {
            mostrarTarjetasCapitulos(ordenarZA)
        }
    }
  
}

//--------------funcion modo oscuro
modoOscuroBoton.onclick = () =>{
    modoOscuroBoton.classList.toggle("iconos-oscuro") 
    nav.classList.toggle("modo-oscuro") 
    footer.classList.toggle("footer-oscuro") 
    body.classList.toggle("modo-oscuro-body")
    const tarjetas = document.querySelectorAll(".diseño-card-general");
  for (let i = 0; i < tarjetas.length; i++) {
    const element = tarjetas[i];
    element.classList.toggle("modo-oscuro");
  }
}