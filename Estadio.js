// ========================================
// SISTEMA DE VENTAS Y GESTIÓN DE ENTRADAS - ESTADIO
// Conceptos: Switch, Ciclos, Funciones, Arrays, If, Operador Ternario
// ========================================

// ========================================
// DATOS: Array de eventos disponibles
// ========================================
const eventos = [
  { 
    id: 1, 
    nombre: "Fútbol: Equipo A vs Equipo B", 
    fecha: "2026-04-15",
    hora: "19:00",
    capacidad: 50000,
    entradasDisponibles: 50000,
    precioBasico: 50,
    precioPreferencial: 100,
    precioVIP: 200
  },
  { 
    id: 2, 
    nombre: "Concierto: Rock Festival", 
    fecha: "2026-05-20",
    hora: "20:00",
    capacidad: 30000,
    entradasDisponibles: 30000,
    precioBasico: 60,
    precioPreferencial: 120,
    precioVIP: 250
  },
  { 
    id: 3, 
    nombre: "Lucha Libre: Campeonato", 
    fecha: "2026-06-10",
    hora: "18:30",
    capacidad: 20000,
    entradasDisponibles: 20000,
    precioBasico: 40,
    precioPreferencial: 80,
    precioVIP: 150
  }
];

// Array para almacenar las ventas realizadas
let ventas = [];

// Array para almacenar los clientes
let clientes = [];

// Variable para llevar el ID de ventas
let contadorVentas = 100;

// ========================================
// FUNCIÓN: Mostrar menú principal
// ========================================
function mostrarMenu() {
  console.log("\n╔═══════════════════════════════════════════════╗");
  console.log("║   SISTEMA DE VENTAS DE ENTRADAS - ESTADIO    ║");
  console.log("╚═══════════════════════════════════════════════╝");
  console.log("1. Ver Eventos Disponibles");
  console.log("2. Ver Detalles de un Evento");
  console.log("3. Comprar Entradas");
  console.log("4. Ver Mis Compras");
  console.log("5. Cancelar Entrada");
  console.log("6. Listar Todas las Ventas");
  console.log("7. Reportes y Estadísticas");
  console.log("8. Aplicar Descuento");
  console.log("9. Salir");
  console.log("═══════════════════════════════════════════════");
}

// ========================================
// FUNCIÓN: Mostrar eventos disponibles
// ========================================
function mostrarEventos() {
  console.log("\n🎪 EVENTOS DISPONIBLES:");
  console.log("═══════════════════════════════════════════════");
  
  // Ciclo para mostrar cada evento
  eventos.forEach((evento, index) => {
    // Operador ternario para mostrar disponibilidad
    const disponibilidad = evento.entradasDisponibles > 0 
      ? `✅ ${evento.entradasDisponibles} entradas disponibles` 
      : "❌ Agotado";
    
    // Operador ternario para mostrar porcentaje ocupado
    const ocupacion = ((evento.capacidad - evento.entradasDisponibles) / evento.capacidad * 100).toFixed(1);
    
    console.log(`${index + 1}. ${evento.nombre}`);
    console.log(`   ID: ${evento.id} | Fecha: ${evento.fecha} | Hora: ${evento.hora}`);
    console.log(`   Capacidad: ${evento.capacidad} | Ocupación: ${ocupacion}%`);
    console.log(`   Precios: Básico $${evento.precioBasico} | Preferencial $${evento.precioPreferencial} | VIP $${evento.precioVIP}`);
    console.log(`   ${disponibilidad}`);
    console.log("   ───────────────────────────────────────────");
  });
}

// ========================================
// FUNCIÓN: Buscar evento por ID
// ========================================
function buscarEvento(idEvento) {
  return eventos.find(e => e.id === idEvento);
}

// ========================================
// FUNCIÓN: Mostrar detalles de un evento
// ========================================
function mostrarDetallesEvento(idEvento) {
  console.log(`\n📌 DETALLES DEL EVENTO - ID: ${idEvento}`);
  console.log("═══════════════════════════════════════════════");
  
  const evento = buscarEvento(idEvento);
  
  // IF para validar si el evento existe
  if (!evento) {
    console.log("❌ Error: Evento no encontrado.");
    return;
  }
  
  // Calcular porcentajes
  const ocupacion = ((evento.capacidad - evento.entradasDisponibles) / evento.capacidad * 100).toFixed(1);
  const disponible = (evento.entradasDisponibles / evento.capacidad * 100).toFixed(1);
  
  console.log(`🎤 Nombre: ${evento.nombre}`);
  console.log(`📅 Fecha: ${evento.fecha}`);
  console.log(`⏰ Hora: ${evento.hora}`);
  console.log(`\n📊 Estadísticas:`);
  console.log(`   Capacidad Total: ${evento.capacidad} personas`);
  console.log(`   Entradas Vendidas: ${evento.capacidad - evento.entradasDisponibles}`);
  console.log(`   Entradas Disponibles: ${evento.entradasDisponibles}`);
  console.log(`   Ocupación: ${ocupacion}% | Disponibles: ${disponible}%`);
  
  // Visualizar barra de ocupación
  const barraOcupacion = "█".repeat(Math.floor(ocupacion / 5)) + "░".repeat(20 - Math.floor(ocupacion / 5));
  console.log(`   Barra: [${barraOcupacion}]`);
  
  console.log(`\n💰 Precios:`);
  console.log(`   Entrada Básica: $${evento.precioBasico}`);
  console.log(`   Entrada Preferencial: $${evento.precioPreferencial}`);
  console.log(`   Entrada VIP: $${evento.precioVIP}`);
}

// ========================================
// FUNCIÓN: Registrar cliente
// ========================================
function registrarCliente(cedula, nombre, email, telefono) {
  // Buscar si el cliente ya existe
  const clienteExistente = clientes.find(c => c.cedula === cedula);
  
  if (clienteExistente) {
    return clienteExistente;
  }
  
  // Crear nuevo cliente
  const nuevoCliente = {
    cedula: cedula,
    nombre: nombre,
    email: email,
    telefono: telefono,
    fechaRegistro: new Date().toLocaleDateString()
  };
  
  clientes.push(nuevoCliente);
  return nuevoCliente;
}

// ========================================
// FUNCIÓN: Obtener precio según tipo de entrada
// ========================================
function obtenerPrecio(evento, tipoEntrada) {
  // SWITCH para obtener precio según tipo
  switch (tipoEntrada.toLowerCase()) {
    case "basica":
      return evento.precioBasico;
    case "preferencial":
      return evento.precioPreferencial;
    case "vip":
      return evento.precioVIP;
    default:
      return 0;
  }
}

// ========================================
// FUNCIÓN: Comprar entradas
// ========================================
function comprarEntradas(cedula, nombre, email, telefono, idEvento, cantidad, tipoEntrada) {
  // IF para validar cantidad
  if (cantidad <= 0) {
    console.log("❌ Error: La cantidad debe ser mayor a 0.");
    return;
  }
  
  // Buscar el evento
  const evento = buscarEvento(idEvento);
  
  // IF para validar si el evento existe
  if (!evento) {
    console.log("❌ Error: Evento no encontrado.");
    return;
  }
  
  // IF para validar disponibilidad
  if (cantidad > evento.entradasDisponibles) {
    console.log(`❌ Error: Solo hay ${evento.entradasDisponibles} entradas disponibles.`);
    return;
  }
  
  // Registrar o buscar cliente
  const cliente = registrarCliente(cedula, nombre, email, telefono);
  
  // Obtener precio unitario
  const precioUnitario = obtenerPrecio(evento, tipoEntrada);
  
  // IF para validar tipo de entrada válido
  if (precioUnitario === 0) {
    console.log("❌ Error: Tipo de entrada no válido. Use: 'Básica', 'Preferencial' o 'VIP'.");
    return;
  }
  
  // Calcular total
  const total = precioUnitario * cantidad;
  
  // Generar ID de venta
  contadorVentas++;
  const idVenta = contadorVentas;
  
  // Crear objeto de venta
  const venta = {
    id: idVenta,
    cedula: cedula,
    nombre: nombre,
    idEvento: idEvento,
    evento: evento.nombre,
    cantidad: cantidad,
    tipoEntrada: tipoEntrada,
    precioUnitario: precioUnitario,
    total: total,
    descuento: 0,
    totalConDescuento: total,
    fecha: new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString(),
    estado: "Pagado"
  };
  
  // Agregar la venta al array
  ventas.push(venta);
  
  // Decrementar entradas disponibles del evento
  evento.entradasDisponibles -= cantidad;
  
  console.log(`\n✅ ¡COMPRA EXITOSA!`);
  console.log("═════════════════════════════════���═════════════");
  console.log(`📌 ID Venta: ${idVenta}`);
  console.log(`👤 Cliente: ${nombre}`);
  console.log(`🎪 Evento: ${evento.nombre}`);
  console.log(`🎟️  Tipo de Entrada: ${tipoEntrada}`);
  console.log(`📊 Cantidad: ${cantidad} entradas`);
  console.log(`💵 Precio Unitario: $${precioUnitario}`);
  console.log(`💰 Total: $${total.toFixed(2)}`);
  console.log(`📅 Fecha: ${venta.fecha} | Hora: ${venta.hora}`);
  console.log(`✔️ Estado: ${venta.estado}`);
}

// ========================================
// FUNCIÓN: Ver mis compras
// ========================================
function verMisCompras(cedula) {
  console.log(`\n📋 MIS COMPRAS - Cédula: ${cedula}`);
  console.log("═══════════════════════════════════════════════");
  
  // Buscar todas las compras del cliente (usando filter)
  const misCompras = ventas.filter(v => v.cedula === cedula && v.estado !== "Cancelada");
  
  // IF para validar si hay compras
  if (misCompras.length === 0) {
    console.log("No tienes compras registradas.");
    return;
  }
  
  // Ciclo para mostrar cada compra
  misCompras.forEach((compra, index) => {
    console.log(`\n${index + 1}. ID Venta: ${compra.id}`);
    console.log(`   Evento: ${compra.evento}`);
    console.log(`   Entradas: ${compra.cantidad} x ${compra.tipoEntrada}`);
    console.log(`   Total: $${compra.totalConDescuento.toFixed(2)}`);
    console.log(`   Fecha: ${compra.fecha}`);
    console.log(`   Estado: ${compra.estado}`);
  });
  
  // Calcular total gastado (usando reduce)
  const totalGastado = misCompras.reduce((total, compra) => total + compra.totalConDescuento, 0);
  console.log(`\n💳 Total invertido: $${totalGastado.toFixed(2)}`);
}

// ========================================
// FUNCIÓN: Cancelar una entrada
// ========================================
function cancelarEntrada(idVenta) {
  console.log(`\n❌ CANCELACIÓN DE ENTRADA - ID: ${idVenta}`);
  console.log("═══════════════════════════════════════════════");
  
  // Buscar la venta
  const venta = ventas.find(v => v.id === idVenta);
  
  // IF para validar si la venta existe
  if (!venta) {
    console.log("❌ Error: Venta no encontrada.");
    return;
  }
  
  // IF para validar si ya está cancelada
  if (venta.estado === "Cancelada") {
    console.log("❌ Error: Esta entrada ya está cancelada.");
    return;
  }
  
  // Buscar el evento para restaurar entradas
  const evento = buscarEvento(venta.idEvento);
  if (evento) {
    evento.entradasDisponibles += venta.cantidad;
  }
  
  // Calcular reembolso (90% del valor)
  const reembolso = venta.totalConDescuento * 0.90;
  
  // Actualizar estado
  const cantidadAnterior = venta.cantidad;
  venta.estado = "Cancelada";
  
  console.log(`✅ Entrada cancelada exitosamente.`);
  console.log(`ID Venta: ${idVenta}`);
  console.log(`Entradas canceladas: ${cantidadAnterior}`);
  console.log(`Monto original: $${venta.totalConDescuento.toFixed(2)}`);
  console.log(`Reembolso (90%): $${reembolso.toFixed(2)}`);
  console.log(`Cargo por cancelación: $${(venta.totalConDescuento - reembolso).toFixed(2)}`);
}

// ========================================
// FUNCIÓN: Listar todas las ventas
// ========================================
function listarTodasVentas() {
  console.log("\n📊 TODAS LAS VENTAS DEL SISTEMA:");
  console.log("═══════════════════════════════════════════════");
  
  // IF para validar si hay ventas
  if (ventas.length === 0) {
    console.log("No hay ventas registradas.");
    return;
  }
  
  // Ciclo para mostrar todas las ventas
  ventas.forEach((venta, index) => {
    // Operador ternario para icono de estado
    const icono = venta.estado === "Pagado" ? "✅" : "❌";
    
    console.log(`\n${index + 1}. ${icono} ID: ${venta.id}`);
    console.log(`   Cliente: ${venta.nombre} (${venta.cedula})`);
    console.log(`   Evento: ${venta.evento}`);
    console.log(`   ${venta.cantidad} x ${venta.tipoEntrada} = $${venta.totalConDescuento.toFixed(2)}`);
    console.log(`   Fecha: ${venta.fecha} | Estado: ${venta.estado}`);
  });
}

// ========================================
// FUNCIÓN: Aplicar descuento a una venta
// ========================================
function aplicarDescuento(idVenta, porcentajeDescuento) {
  console.log(`\n🎁 APLICAR DESCUENTO - ID Venta: ${idVenta}`);
  console.log("═══════════════════════════════════════════════");
  
  // IF para validar porcentaje válido
  if (porcentajeDescuento < 0 || porcentajeDescuento > 50) {
    console.log("❌ Error: El descuento debe estar entre 0% y 50%.");
    return;
  }
  
  // Buscar la venta
  const venta = ventas.find(v => v.id === idVenta);
  
  // IF para validar si la venta existe
  if (!venta) {
    console.log("❌ Error: Venta no encontrada.");
    return;
  }
  
  // IF para validar si ya tiene descuento
  if (venta.descuento > 0) {
    console.log("❌ Error: Esta venta ya tiene descuento aplicado.");
    return;
  }
  
  // Calcular descuento
  const montoDescuento = venta.total * (porcentajeDescuento / 100);
  const totalConDescuento = venta.total - montoDescuento;
  
  // Aplicar descuento
  venta.descuento = porcentajeDescuento;
  venta.totalConDescuento = totalConDescuento;
  
  console.log(`✅ Descuento aplicado exitosamente.`);
  console.log(`Total original: $${venta.total.toFixed(2)}`);
  console.log(`Descuento: ${porcentajeDescuento}% (-$${montoDescuento.toFixed(2)})`);
  console.log(`Nuevo total: $${totalConDescuento.toFixed(2)}`);
}

// ========================================
// FUNCIÓN: Reportes y Estadísticas
// ========================================
function mostrarReportes() {
  console.log("\n📊 REPORTES Y ESTADÍSTICAS:");
  console.log("════════════════════════════════���══════════════");
  
  // 1. Total de ventas
  const ventasActivas = ventas.filter(v => v.estado === "Pagado");
  console.log(`\n1️⃣ Total de ventas activas: ${ventasActivas.length}`);
  
  // 2. Total de ingresos (usando reduce)
  const totalIngresos = ventasActivas.reduce((total, v) => total + v.totalConDescuento, 0);
  console.log(`2️⃣ Ingresos totales: $${totalIngresos.toFixed(2)}`);
  
  // 3. Ventas canceladas
  const ventasCanceladas = ventas.filter(v => v.estado === "Cancelada").length;
  console.log(`3️⃣ Ventas canceladas: ${ventasCanceladas}`);
  
  // 4. Clientes únicos (usando Set)
  const clientesUnicos = new Set(ventas.map(v => v.cedula)).size;
  console.log(`4️⃣ Clientes únicos: ${clientesUnicos}`);
  
  // 5. Promedio de venta
  const promedioVenta = ventasActivas.length > 0 
    ? (totalIngresos / ventasActivas.length).toFixed(2)
    : 0;
  console.log(`5️⃣ Promedio por venta: $${promedioVenta}`);
  
  // 6. Evento más vendido
  console.log(`\n6️⃣ Ventas por evento:`);
  eventos.forEach(evento => {
    const ventasEvento = ventasActivas.filter(v => v.idEvento === evento.id);
    const cantidadEntradas = ventasEvento.reduce((total, v) => total + v.cantidad, 0);
    const ingresosEvento = ventasEvento.reduce((total, v) => total + v.totalConDescuento, 0);
    
    // Operador ternario
    const occupancy = evento.capacidad > 0 
      ? ((evento.capacidad - evento.entradasDisponibles) / evento.capacidad * 100).toFixed(1)
      : 0;
    
    console.log(`   ${evento.nombre}: ${cantidadEntradas} entradas | Ingresos: $${ingresosEvento.toFixed(2)} | Ocupación: ${occupancy}%`);
  });
  
  // 7. Tipos de entrada más vendidos (usando filter y map)
  console.log(`\n7️⃣ Tipos de entrada más vendidos:`);
  const tiposEntrada = ["Básica", "Preferencial", "VIP"];
  tiposEntrada.forEach(tipo => {
    const ventasTipo = ventasActivas.filter(v => v.tipoEntrada === tipo);
    const cantidadTipo = ventasTipo.reduce((total, v) => total + v.cantidad, 0);
    console.log(`   ${tipo}: ${cantidadTipo} entradas`);
  });
  
  // 8. Descuentos aplicados
  const ventasConDescuento = ventas.filter(v => v.descuento > 0);
  const totalDescuentos = ventasConDescuento.reduce((total, v) => total + (v.total - v.totalConDescuento), 0);
  console.log(`\n8️⃣ Descuentos aplicados: ${ventasConDescuento.length} ventas | Monto: $${totalDescuentos.toFixed(2)}`);
}

// ========================================
// FUNCIÓN: Procesar opción (SWITCH)
// ========================================
function procesarOpcion(opcion, param1, param2, param3, param4, param5, param6, param7) {
  // SWITCH para manejar múltiples opciones
  switch (opcion) {
    case 1:
      mostrarEventos();
      break;
    
    case 2:
      mostrarDetallesEvento(param1);
      break;
    
    case 3:
      comprarEntradas(param1, param2, param3, param4, param5, param6, param7);
      break;
    
    case 4:
      verMisCompras(param1);
      break;
    
    case 5:
      cancelarEntrada(param1);
      break;
    
    case 6:
      listarTodasVentas();
      break;
    
    case 7:
      mostrarReportes();
      break;
    
    case 8:
      aplicarDescuento(param1, param2);
      break;
    
    case 9:
      console.log("\n👋 ¡Gracias por usar el sistema! Hasta luego.");
      break;
    
    default:
      console.log("❌ Opción no válida. Intenta de nuevo.");
  }
}

// ========================================
// EJECUTAR EL PROGRAMA
// ========================================
console.log("🏟️  BIENVENIDO AL SISTEMA DE VENTAS DE ENTRADAS - ESTADIO\n");

// Mostrar menú
mostrarMenu();

// SIMULACIÓN: Ejecutar operaciones
console.log("\n┌─ OPERACIÓN 1: Ver Eventos Disponibles ─┐");
procesarOpcion(1);

console.log("\n┌─ OPERACIÓN 2: Ver Detalles Evento #1 ─┐");
procesarOpcion(2, 1);

console.log("\n┌─ OPERACIÓN 3: Compra 1 (Cliente 1) ─┐");
procesarOpcion(3, "12345678", "Juan Pérez", "juan@email.com", "3015555000", 1, 2, "Preferencial");

console.log("\n┌─ OPERACIÓN 4: Compra 2 (Cliente 2) ─┐");
procesarOpcion(3, "87654321", "María García", "maria@email.com", "3015555001", 1, 4, "VIP");

console.log("\n┌─ OPERACIÓN 5: Compra 3 (Cliente 1 - Otro evento) ─┐");
procesarOpcion(3, "12345678", "Juan Pérez", "juan@email.com", "3015555000", 2, 3, "Básica");

console.log("\n┌─ OPERACIÓN 6: Compra 4 (Cliente 3) ─┐");
procesarOpcion(3, "11223344", "Carlos López", "carlos@email.com", "3015555002", 3, 5, "Básica");

console.log("\n┌─ OPERACIÓN 7: Ver Mis Compras (Cliente 1) ─┐");
procesarOpcion(4, "12345678");

console.log("\n┌─ OPERACIÓN 8: Aplicar Descuento a Venta ─┐");
procesarOpcion(8, 101, 15);

console.log("\n┌─ OPERACIÓN 9: Ver Detalles Evento #2 (Después de cambios) ─┐");
procesarOpcion(2, 2);

console.log("\n┌─ OPERACIÓN 10: Listar Todas las Ventas ─┐");
procesarOpcion(6);

console.log("\n┌─ OPERACIÓN 11: Cancelar una Entrada ─┐");
procesarOpcion(5, 102);

console.log("\n┌─ OPERACIÓN 12: Ver Detalles Evento #1 (Después de cancelación) ─┐");
procesarOpcion(2, 1);

console.log("\n┌─ OPERACIÓN 13: Reportes y Estadísticas ─┐");
procesarOpcion(7);

console.log("\n┌─ OPERACIÓN 14: Ver Todos los Eventos Finales ─┐");
procesarOpcion(1);