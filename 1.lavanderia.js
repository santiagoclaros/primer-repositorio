// ¿cuantos clientes va a registar la lavanderia en el dia?

let clientes =  parseInt(readline("¿cuantos clientes va a registrar la lavanderia en el dia?")); 

console.log(`La lavanderia va a registrar ${clientes} clientes en el dia`);
const precioHora = 5000;

let total = 0;

for (let i = 1; i <= clientes; i++) {
  let nombre = prompt(`Ingrese el nombre del cliente ${i}`);
  let horas = parseInt(prompt(`Ingrese las horas de lavado del cliente ${i}`));
  let subtotal = horas * precioHora;
  total += subtotal;
  console.log(`Cliente: ${nombre}, Horas: ${horas}, Total: $${subtotal}`);
}
console.log(`Total sin descuento: $${total}`);
if (total >= 12) {
  let descuento = total * 0.30;
  let totalcondescuento = total - descuento;
  console.log(`Total con descuento: $${totalcondescuento}`);


total >= 12 ? console.log("Tienes un 30% de descuento") : console.log("No tienes descuento");}

//resumen del dia

console.log(`clientes del dia ${clientes}`)
console.log(`Total recaudado: $${total}`)