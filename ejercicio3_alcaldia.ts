// Solicita al usuario cuántas personas va a registrar, para determinar si cumplen con los requisitos del programa

const cantidadPersonas: number = parseInt(prompt("¿Cuántas personas va a registrar?") ?? "0", 10);
console.log(`Cantidad de beneficiarios registrados: ${cantidadPersonas}`);
const subsidio12: number = 13000000 * 0.12;
const subsidio15: number = 13000000 * 0.15;

for (let i = 1; i <= cantidadPersonas; i++) {
  const nombre: string = prompt(`Ingrese el nombre de la persona ${i}`) ?? "";
  const edad: number = parseInt(prompt(`Ingrese la edad de la persona ${i}`) ?? "0", 10);

  if (edad >= 60 && edad <= 80) {
    console.log(`La persona ${nombre} es beneficiaria del programa de adulto mayor, recibe 12% del salario minimo (${subsidio12})`);
  } else if (edad > 80) {
    console.log(`La persona de nombre ${nombre} es beneficiaria del programa del adulto mayor, recibe 15% del salario minimo (${subsidio15})`);
  } else {
    console.log(`La persona ${nombre} no es beneficiaria del programa de adulto mayor.`);
  }
}

console.log(`Subsidio del 12%: ${subsidio12}`);
console.log(`Subsidio del 15%: ${subsidio15}`);
