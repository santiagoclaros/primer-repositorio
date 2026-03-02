// Parqueadero ParquiFacil

// Mostrar un menú repetidamente hasta que el usuario cierre la jornada
let opciones;
let costotoal = 0;
const moto = 2000
const carro = 4000
const SUV = 6000 

while (true) {
  opciones = prompt("Seleccione una opcion: 1.Registrar vehiculo 2. cerrar jornada");
  console.log(`opción seleccionada: ${opciones}`);

  if (opciones === "1") {
    let placa = prompt("ingrese la placa del vehiculo");
    console.log(`vehiculo con placa ${placa} registrado`);
  } else if (opciones === "2") {
    let Tipovehiculo = prompt("ingrese el tipo de vehiculo");
    console.log(`vehiculo de tipo ${Tipovehiculo} registrado`);
    break; // salir del ciclo
  } else {
    console.log("Opción no válida, inténtelo de nuevo.");
  }
}


