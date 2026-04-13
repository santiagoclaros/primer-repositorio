// ¿Cuántos clientes va a registrar la lavandería en el día?

const clientes: number = parseInt(readline("¿cuantos clientes va a registrar la lavanderia en el dia?"), 10);
console.log(`La lavanderia va a registrar ${clientes} clientes en el dia`);
const precioHora: number = 5000;

let total: number = 0;

for (let i = 1; i <= clientes; i++) {
  const nombre: string = prompt(`Ingrese el nombre del cliente ${i}`) ?? "";
  const horas: number = parseInt(prompt(`Ingrese las horas de lavado del cliente ${i}`) ?? "0", 10);
  const subtotal: number = horas * precioHora;
  total += subtotal;
  console.log(`Cliente: ${nombre}, Horas: ${horas}, Total: $${subtotal}`);
}

console.log(`Total sin descuento: $${total}`);

if (total >= 12) {
  const descuento: number = total * 0.30;
  const totalConDescuento: number = total - descuento;
  console.log(`Total con descuento: $${totalConDescuento}`);
  console.log("Tienes un 30% de descuento");
} else {
  console.log("No tienes descuento");
}

console.log(`Clientes del dia: ${clientes}`);
console.log(`Total recaudado: $${total}`);
