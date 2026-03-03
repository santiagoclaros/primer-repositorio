let suma = 0;
for( let i = 0; i <= 20; i++) {
if (i % 2 !== 0) {
  console.log(i);
  suma += i;
}
}
console.log("La suma de los números impares del 0 al 20 es: " + suma);