// Parqueadero ParquiFacil

let opciones: string | null = null;
let costoTotal: number = 0;
const moto: number = 2000;
const carro: number = 4000;
const SUV: number = 6000;

while (true) {
  opciones = prompt("Seleccione una opcion: 1.Registrar vehiculo 2. cerrar jornada");
  console.log(`opción seleccionada: ${opciones}`);

  if (opciones === "1") {
    const placa: string = prompt("ingrese la placa del vehiculo") ?? "";
    console.log(`vehiculo con placa ${placa} registrado`);
  } else if (opciones === "2") {
    const tipoVehiculo: string = prompt("ingrese el tipo de vehiculo") ?? "";
    console.log(`vehiculo de tipo ${tipoVehiculo} registrado`);
    break; // salir del ciclo
  } else {
    console.log("Opción no válida, inténtelo de nuevo.");
  }
}
