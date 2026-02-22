let numeroAleatorio = Math.floor(Math.random() * 10) + 1;
console.log(numeroAleatorio);

let persona1 = "juan";
let maquina = "computadora";

let resultado = (numeroAleatorio % 2 === 0) ? `${persona1} gana` : `${maquina} gana`;
console.log(resultado);


