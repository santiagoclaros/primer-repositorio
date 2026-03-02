// Burger Palace

const precioCombo1 = 15000;
const precioCombo2 = 22000;
const precioCombo3 = 35000;

let total = 0;
let opcion;

// preguntar hasta que el usuario escriba "finalizar pedido"
do {
  opcion = prompt("1 combo\n2 combo\n3 combo\n(escribe 'finalizar pedido' para terminar)");

  if (opcion === "1") {
    total += precioCombo1;
    console.log("Usted seleccionó el combo 1");
  } else if (opcion === "2") {
    total += precioCombo2;
    console.log("Usted seleccionó el combo 2");
  } else if (opcion === "3") {
    total += precioCombo3;
    console.log("Usted seleccionó el combo 3");
  }
} while (opcion !== "finalizar pedido");

console.log(`Total a pagar: $${total}`);

