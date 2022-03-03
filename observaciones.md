Ro, Flor, 

Estoy muy contenta recorriendo su web, me encanta como quedó. Me parece que usaron muy bien los recursos que da la API para lograr una web completa, útil y fácil de recorrer. 

Como siempre, dejo varios comentarios a lo largo de los archivos. De la web en sí, tanto a nivel visual como a nivel comportamiento estoy satisfecha. A nivel contenidos, creo que el TP demuestra la comprensión de los temas vistos. 

El problema mas grave que veo es que no funciona la vista de detalle, y eso es porque la lógica que eligieron no es la correcta. El origen del problema está en que para hacer los `onclick` de las tarjetas estan seleccionando todas a la vez, y para decidir qué fetch debe hacerse preguntan qué elemento tiene como display flex. Pero en ese punto de su codigo, ningun elemento lo tiene (el display flex de css no se puede detectar en js). Seria preferible que arreglaran eso dandole una clase distinta a cada tipo diferente de tarjeta, y asignaran el onclick con esa clase. 

Donde veo más problemas es en los temas que ya espero manejen con seguridad. Los dejo comentados, pero insisto aquí en algunos puntos:

- La desprolijidad de su código es una constante, y es algo que les va a restar muchísimos puntos en una entrevista técnica. Ni en HTML, ni en CSS, ni en JS hay un buen tabulado. Dejan saltos de línea al azar, no tabulan correctamente, no dejan los espacios necesarios entre las cosas.

- Si bien lo ideal sería que aprendan a ser mas prolijas, sé que el tiempo muchas veces no es un aliado. Las super animo a que se bajen la extensión `prettier` para VSCode y se familiaricen con su uso. Revisen siempre antes de una entrega todos los archivos y corran la extensión para cada uno de ellos. 

- Recuerden que el favicon debe estar en la carpeta principal, no en assets, y llamarse favicon.ico. 

Nota final: 8