let si = true
let No = false
let algoritmo = "es un conjunto de instrucciones bien definidas, ordenadas y finitas que permiten realializar una tarea o resolver un problema"
let pregunta = "¿es javascript un lenguaje de programacion?"
let pregunta2 = "¿es python un lenguaje de programacion universal?"
let pregunta3 = "¿es VS code un lenguaje de programacion?"
let pregunta4 = "¿Que es un algoritmo?"

let respuesta1 = (si)? "¡correcto es un lenguaje de programacion!" : "!incorrecto¡";
console.log(respuesta1);

let respuesta2 =(si)? "correcto, es un lenguaje multiusos" : "incorrecto, python es un lenguaje de programacion universal";
console.log(respuesta2);

let respuesta3 = (si)? "incorrecto, vs code es un editor de codigo" : "correcto, vs code es un lenguaje de programacion";
console.log(respuesta3);

let respuesta4 = (algoritmo);
console.log(respuesta4);

if (respuesta1 === "¡correcto es un lenguaje de programacion!" && respuesta2 === "correcto, es un lenguaje multiusos" && respuesta3 === "incorrecto, vs code es un editor de codigo" && respuesta4 === algoritmo) {
  console.log("¡Felicitaciones! Has respondido todas las preguntas correctamente, su nota es 5.0.");
} else {
  console.log("Alguna respuesta fue incorrecta. Inténtalo de nuevo.");
}
