// ========================================
// SISTEMA DE CAJERO AUTOMÁTICO
// Conceptos: Switch, Ciclos, Funciones, Arrays, If, Operador Ternario
// ========================================

// ========================================
// DATOS: Array de cuentas bancarias
// ========================================
const cuentas = [
  { 
    id: 1, 
    titular: "Juan Pérez", 
    numeroCuenta: "1001-5000", 
    saldo: 5000,
    activa: true
  },
  { 
    id: 2, 
    titular: "María García", 
    numeroCuenta: "1002-5001", 
    saldo: 3500,
    activa: true
  },
  { 
    id: 3, 
    titular: "Carlos López", 
    numeroCuenta: "1003-5002", 
    saldo: 2000,
    activa: true
  },
  { 
    id: 4, 
    titular: "Ana Martínez", 
    numeroCuenta: "1004-5003", 
    saldo: 8000,
    activa: true
  }
];

// Variable global para la cuenta autenticada
let cuentaActual = null;

// Array para registrar el historial de transacciones
let historialTransacciones = [];

// ========================================
// FUNCIÓN: Mostrar menú principal
// ========================================
function mostrarMenu() {
  console.log("\n╔══════════════════════════════════════╗");
  console.log("║   CAJERO AUTOMÁTICO - BANCO SEGURO   ║");
  console.log("╚══════════════════════════════════════╝");
  console.log("1. Consultar Saldo");
  console.log("2. Retirar Dinero");
  console.log("3. Consignar Dinero");
  console.log("4. Transferencia a Otra Cuenta");
  console.log("5. Ver Historial de Transacciones");
  console.log("6. Cerrar Sesión");
  console.log("══════════════════════════════════════");
}

// ========================================
// FUNCIÓN: Autenticarse (ingresar a una cuenta)
// ========================================
function autenticar(numeroCuenta) {
  // Buscar la cuenta en el array
  const cuenta = cuentas.find(c => c.numeroCuenta === numeroCuenta);
  
  // Operador ternario: validar si la cuenta existe y está activa
  const autenticado = cuenta && cuenta.activa ? true : false;
  
  if (autenticado) {
    cuentaActual = cuenta;
    historialTransacciones = []; // Reiniciar historial
    console.log(`\n✅ ¡Bienvenido ${cuenta.titular}!`);
    console.log(`Número de Cuenta: ${cuenta.numeroCuenta}`);
    return true;
  } else {
    console.log("\n❌ Error: Cuenta no encontrada o inactiva.");
    return false;
  }
}

// ========================================
// FUNCIÓN: Consultar saldo
// ========================================
function consultarSaldo() {
  // IF para validar si hay sesión activa
  if (!cuentaActual) {
    console.log("❌ Error: No hay sesión activa.");
    return;
  }
  
  console.log("\n💰 CONSULTA DE SALDO");
  console.log("══════════════════════════════════════");
  console.log(`Titular: ${cuentaActual.titular}`);
  console.log(`Número de Cuenta: ${cuentaActual.numeroCuenta}`);
  
  // Operador ternario para mostrar saldo con formato especial
  const saldoFormato = cuentaActual.saldo > 0 
    ? `$${cuentaActual.saldo.toLocaleString()}` 
    : `Saldo negativo: -$${Math.abs(cuentaActual.saldo)}`;
  
  console.log(`Saldo Actual: ${saldoFormato}`);
}

// ========================================
// FUNCIÓN: Retirar dinero
// ========================================
function retirarDinero(cantidad) {
  // IF para validar si hay sesión activa
  if (!cuentaActual) {
    console.log("❌ Error: No hay sesión activa.");
    return;
  }
  
  // IF para validar cantidad positiva
  if (cantidad <= 0) {
    console.log("❌ Error: La cantidad debe ser mayor a 0.");
    return;
  }
  
  // IF para validar saldo suficiente
  if (cantidad > cuentaActual.saldo) {
    console.log(`❌ Error: Saldo insuficiente.`);
    console.log(`Saldo disponible: $${cuentaActual.saldo}`);
    return;
  }
  
  // Realizar el retiro
  cuentaActual.saldo -= cantidad;
  
  // Registrar transacción
  const transaccion = {
    tipo: "RETIRO",
    cantidad: cantidad,
    fecha: new Date().toLocaleString(),
    saldoResultante: cuentaActual.saldo
  };
  historialTransacciones.push(transaccion);
  
  console.log(`\n✅ RETIRO EXITOSO`);
  console.log("══════════════════════════════════════");
  console.log(`Cantidad Retirada: $${cantidad}`);
  console.log(`Saldo Anterior: $${cuentaActual.saldo + cantidad}`);
  console.log(`Saldo Actual: $${cuentaActual.saldo}`);
  console.log(`Fecha: ${transaccion.fecha}`);
}

// ========================================
// FUNCIÓN: Consignar dinero
// ========================================
function consignarDinero(cantidad) {
  // IF para validar si hay sesión activa
  if (!cuentaActual) {
    console.log("❌ Error: No hay sesión activa.");
    return;
  }
  
  // IF para validar cantidad positiva
  if (cantidad <= 0) {
    console.log("❌ Error: La cantidad debe ser mayor a 0.");
    return;
  }
  
  // Realizar el depósito
  const saldoAnterior = cuentaActual.saldo;
  cuentaActual.saldo += cantidad;
  
  // Registrar transacción
  const transaccion = {
    tipo: "CONSIGNACIÓN",
    cantidad: cantidad,
    fecha: new Date().toLocaleString(),
    saldoResultante: cuentaActual.saldo
  };
  historialTransacciones.push(transaccion);
  
  console.log(`\n✅ CONSIGNACIÓN EXITOSA`);
  console.log("══════════════════════════════════════");
  console.log(`Cantidad Consignada: $${cantidad}`);
  console.log(`Saldo Anterior: $${saldoAnterior}`);
  console.log(`Saldo Actual: $${cuentaActual.saldo}`);
  console.log(`Fecha: ${transaccion.fecha}`);
}

// ========================================
// FUNCIÓN: Buscar cuenta por número
// ========================================
function buscarCuenta(numeroCuenta) {
  return cuentas.find(c => c.numeroCuenta === numeroCuenta);
}

// ========================================
// FUNCIÓN: Listar todas las cuentas disponibles
// ========================================
function listarCuentasDisponibles() {
  console.log("\n📋 CUENTAS DISPONIBLES PARA TRANSFERENCIA:");
  console.log("══════════════════════════════════════");
  
  // Ciclo para mostrar cuentas (excepto la actual)
  cuentas.forEach((cuenta, index) => {
    // Operador ternario para marcar la cuenta actual
    const indicador = cuenta.id === cuentaActual.id ? " (Tu cuenta)" : "";
    
    // IF para no mostrar la cuenta del usuario actual
    if (cuenta.id !== cuentaActual.id) {
      console.log(`${index}. ${cuenta.numeroCuenta} - ${cuenta.titular} (Saldo: $${cuenta.saldo})${indicador}`);
    }
  });
}

// ========================================
// FUNCIÓN: Transferencia a otra cuenta
// ========================================
function transferencia(numeroCuentaDestino, cantidad) {
  // IF para validar si hay sesión activa
  if (!cuentaActual) {
    console.log("❌ Error: No hay sesión activa.");
    return;
  }
  
  // IF para validar cantidad positiva
  if (cantidad <= 0) {
    console.log("❌ Error: La cantidad debe ser mayor a 0.");
    return;
  }
  
  // IF para validar que no sea la misma cuenta
  if (numeroCuentaDestino === cuentaActual.numeroCuenta) {
    console.log("❌ Error: No puedes transferir a tu propia cuenta.");
    return;
  }
  
  // Buscar la cuenta destino
  const cuentaDestino = buscarCuenta(numeroCuentaDestino);
  
  // IF para validar si la cuenta destino existe
  if (!cuentaDestino) {
    console.log("❌ Error: Cuenta destino no encontrada.");
    return;
  }
  
  // IF para validar saldo suficiente
  if (cantidad > cuentaActual.saldo) {
    console.log(`❌ Error: Saldo insuficiente.`);
    console.log(`Saldo disponible: $${cuentaActual.saldo}`);
    return;
  }
  
  // Realizar la transferencia
  const saldoAnterior = cuentaActual.saldo;
  cuentaActual.saldo -= cantidad;
  cuentaDestino.saldo += cantidad;
  
  // Registrar transacción (cuenta origen)
  const transaccion = {
    tipo: "TRANSFERENCIA ENVIADA",
    cantidad: cantidad,
    destino: cuentaDestino.numeroCuenta,
    titular: cuentaDestino.titular,
    fecha: new Date().toLocaleString(),
    saldoResultante: cuentaActual.saldo
  };
  historialTransacciones.push(transaccion);
  
  console.log(`\n✅ TRANSFERENCIA EXITOSA`);
  console.log("══════════════════════════════════════");
  console.log(`Cantidad Transferida: $${cantidad}`);
  console.log(`Cuenta Destino: ${cuentaDestino.numeroCuenta}`);
  console.log(`Titular Destino: ${cuentaDestino.titular}`);
  console.log(`Saldo Anterior: $${saldoAnterior}`);
  console.log(`Saldo Actual: $${cuentaActual.saldo}`);
  console.log(`Fecha: ${transaccion.fecha}`);
}

// ========================================
// FUNCIÓN: Ver historial de transacciones
// ========================================
function verHistorial() {
  // IF para validar si hay sesión activa
  if (!cuentaActual) {
    console.log("❌ Error: No hay sesión activa.");
    return;
  }
  
  console.log(`\n📅 HISTORIAL DE TRANSACCIONES - ${cuentaActual.titular}`);
  console.log("══════════════════════════════════════");
  
  // IF para validar si hay transacciones
  if (historialTransacciones.length === 0) {
    console.log("No hay transacciones registradas.");
    return;
  }
  
  // Ciclo para mostrar cada transacción con índice
  historialTransacciones.forEach((trans, index) => {
    console.log(`\n${index + 1}. ${trans.tipo}`);
    console.log(`   Cantidad: $${trans.cantidad}`);
    console.log(`   Fecha: ${trans.fecha}`);
    console.log(`   Saldo Resultante: $${trans.saldoResultante}`);
    
    // Mostrar información adicional si es una transferencia
    if (trans.destino) {
      console.log(`   Enviado a: ${trans.titular} (${trans.destino})`);
    }
  });
}

// ========================================
// FUNCIÓN: Procesar opción (SWITCH)
// ========================================
function procesarOpcion(opcion, parametro1, parametro2) {
  // SWITCH para manejar múltiples opciones
  switch (opcion) {
    case 1:
      consultarSaldo();
      break;
    
    case 2:
      retirarDinero(parametro1);
      break;
    
    case 3:
      consignarDinero(parametro1);
      break;
    
    case 4:
      listarCuentasDisponibles();
      transferencia(parametro1, parametro2);
      break;
    
    case 5:
      verHistorial();
      break;
    
    case 6:
      console.log("\n👋 Gracias por usar nuestro cajero. ¡Hasta luego!");
      cuentaActual = null;
      break;
    
    default:
      console.log("❌ Opción no válida. Intenta de nuevo.");
  }
}

// ========================================
// EJECUTAR EL PROGRAMA
// ========================================
console.log("🏦 BIENVENIDO AL CAJERO AUTOMÁTICO - BANCO SEGURO\n");

// SIMULACIÓN: Autenticarse
console.log("┌─ INGRESO AL SISTEMA ─────────────────┐");
autenticar("1001-5000"); // Juan Pérez
console.log("└───────────────────────────────────────┘");

// Mostrar menú
mostrarMenu();

// SIMULACIÓN: Ejecutar operaciones
console.log("\n┌─ OPERACIÓN 1: Consultar Saldo ─────┐");
procesarOpcion(1);

console.log("\n┌─ OPERACIÓN 2: Consignar $1500 ─────┐");
procesarOpcion(3, 1500);

console.log("\n┌─ OPERACIÓN 3: Retirar $800 ────────┐");
procesarOpcion(2, 800);

console.log("\n┌─ OPERACIÓN 4: Transferencia ───────┐");
procesarOpcion(4, "1002-5001", 500); // A María García

console.log("\n┌─ OPERACIÓN 5: Ver Historial ──────┐");
procesarOpcion(5);

console.log("\n┌─ OPERACIÓN 6: Consultar Saldo Final ┐");
procesarOpcion(1);

console.log("\n┌─ OPERACIÓN 7: Cerrar Sesión ──────┐");
procesarOpcion(6);