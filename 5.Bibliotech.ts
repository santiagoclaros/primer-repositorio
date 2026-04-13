const cantidadUsuarios: number = parseInt(prompt("¿Cuántos usuarios realizarán devoluciones hoy?") ?? "0", 10);

const multaDiaria: number = 1500;
const multaAdicional: number = 10000;

let totalMultas: number = 0;
let totalLibros: number = 0;
let librosConRetraso: number = 0;
let librosPuntuales: number = 0;

for (let i = 1; i <= cantidadUsuarios; i++) {
  console.log(`\n--- USUARIO ${i} ---`);

  const nombreUsuario: string = prompt("Ingrese el nombre del usuario:") ?? "";
  let cantidadLibros: number = parseInt(prompt("¿Cuántos libros devuelve? (Máximo 3)") ?? "0", 10);

  while (cantidadLibros > 3 || cantidadLibros <= 0) {
    cantidadLibros = parseInt(prompt("Cantidad inválida. Ingrese entre 1 y 3 libros:") ?? "0", 10);
  }

  let multaUsuario: number = 0;

  console.log(`Usuario: ${nombreUsuario}`);
  console.log(`Libros devueltos: ${cantidadLibros}`);

  for (let j = 1; j <= cantidadLibros; j++) {
    const diasPrestamo: number = parseInt(prompt(`Libro ${j} - ¿Cuántos días tuvo el libro?`) ?? "0", 10);
    let diasRetraso: number = 0;
    let multaLibro: number = 0;

    if (diasPrestamo > 7) {
      diasRetraso = diasPrestamo - 7;
    }

    if (diasRetraso === 0) {
      multaLibro = 0;
      librosPuntuales++;
    } else if (diasRetraso <= 15) {
      multaLibro = diasRetraso * multaDiaria;
      librosConRetraso++;
    } else {
      multaLibro = diasRetraso * multaDiaria + multaAdicional;
      librosConRetraso++;
    }

    console.log(
      `Libro ${j}: ${diasPrestamo} días — ${diasRetraso === 0 ? "Sin retraso" : diasRetraso + " días de retraso"} — Multa: $${multaLibro}`
    );

    multaUsuario += multaLibro;
    totalLibros++;
  }

  const estadoUsuario: string = multaUsuario === 0
    ? "PUNTUAL"
    : multaUsuario <= 15 * multaDiaria * cantidadLibros
      ? "CON RETRASO"
      : "CON RETRASO GRAVE";

  console.log(`Multa total usuario: $${multaUsuario} — ${estadoUsuario}`);

  totalMultas += multaUsuario;
}

console.log("\n=== RESUMEN BIBLIOTECH ===");
console.log(`Usuarios atendidos: ${cantidadUsuarios}`);
console.log(`Total libros: ${totalLibros}`);
console.log(`Libros puntuales: ${librosPuntuales}`);
console.log(`Libros con retraso: ${librosConRetraso}`);
console.log(`MULTAS RECAUDADAS: $${totalMultas}`);
