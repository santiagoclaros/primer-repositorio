// solicita al ususario cuantas personas va a registrar, para saber si cumple con los requistos para aplicar a los beneficios del programa

cantidadpersonas = parseInt(prompt("¿Cuántas personas va a registrar?"));
console.log(`Cantidad de beneficiarios registrados: ${cantidadpersonas}`);
subsidio = 13000000 * 0.12;
subsidio2 = 13000000 * 0.15;

for (let i = 1; i <= cantidadpersonas; i++) {
    let nombre = prompt(`Ingrese el nombre de la persona ${i}`);
    let edad = parseInt(prompt(`Ingrese la edad de la persona ${i}`));
}

if (edad >= 60 && edad <= 80){
    console.log(`La persona ${nombre} es beneficiaria del programa de adulto mayor, recibe 12% del salario minimo ${subsidio}`);
}
else if (edad > 80){
    console.log(`La persona de nombre ${nombre} es beneficiaria del programa del adulto mayor, recibe 15% del salario minimo ${subsidio2}`);
}

console.log(`Subsidio del 12%: ${subsidio}`);
console.log(`Subsidio del 15%: ${subsidio2}`);