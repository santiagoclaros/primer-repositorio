// ========================================
// SISTEMA DE DIGITURNO (Gestión de Turnos)
// Conceptos: Switch, Ciclos, Funciones, Arrays, If, Operador Ternario
// ========================================

// ========================================
// DATOS: Array de servicios disponibles
// ========================================
const servicios = [
  { id: 1, nombre: "Consulta General", tiempo: 15, disponibilidad: 5 },
  { id: 2, nombre: "Odontología", tiempo: 30, disponibilidad: 3 },
  { id: 3, nombre: "Psicología", tiempo: 45, disponibilidad: 2 },
  { id: 4, nombre: "Dermatología", tiempo: 20, disponibilidad: 4 },
  { id: 5, nombre: "Oftalmología", tiempo: 25, disponibilidad: 3 }
];

// Array para almacenar los turnos asignados
let turnos = [];

// Variable para llevar el contador de turnos
let contadorTurnos = 1000;

// ========================================
// FUNCIÓN: Mostrar menú principal
// ========================================
function mostrarMenu() {
  console.log("\n╔═══════════════════════════════════════════╗");
  console.log("║      SISTEMA DE DIGITURNO - CLÍNICA      ║");
  console.log("╚═══════════════════════════════════════════╝");
  console.log("1. Ver Servicios Disponibles");
  console.log("2. Sacar Turno");
  console.log("3. Ver Mis Turnos");
  console.log("4. Cancelar Turno");
  console.log("5. Listar Todos los Turnos");
  console.log("6. Buscar Turno por ID");
  console.log("7. Cambiar Hora de Turno");
  console.log("8. Reportes y Estadísticas");
  console.log("9. Salir");
  console.log("═══════════════════════════════════════════");
}

// ========================================
// FUNCIÓN: Mostrar servicios disponibles
// ========================================
function mostrarServicios() {
  console.log("\n🏥 SERVICIOS DISPONIBLES:");
  console.log("═══════════════════════════════════════════");
  
  // Ciclo para mostrar cada servicio
  servicios.forEach((servicio, index) => {
    // Operador ternario para mostrar disponibilidad
    const estado = servicio.disponibilidad > 0 
      ? `✅ ${servicio.disponibilidad} turnos disponibles` 
      : "❌ Sin disponibilidad";
    
    console.log(`${index + 1}. ${servicio.nombre}`);
    console.log(`   Duración: ${servicio.tiempo} minutos`);
    console.log(`   ${estado}`);
    console.log("   ───────────────────────────────────────");
  });
}

// ========================================
// FUNCIÓN: Generar la próxima hora disponible
// ========================================
function generarHora() {
  // Horario de atención: 8:00 AM a 5:00 PM
  const horas = [];
  
  // Ciclo para generar horas disponibles
  for (let i = 8; i < 17; i++) {
    horas.push(`${i}:00`);
    horas.push(`${i}:30`);
  }
  
  // Retornar una hora aleatoria
  return horas[Math.floor(Math.random() * horas.length)];
}

// ========================================
// FUNCIÓN: Buscar servicio por ID
// ========================================
function buscarServicio(idServicio) {
  return servicios.find(s => s.id === idServicio);
}

// ========================================
// FUNCIÓN: Buscar turno por ID
// ========================================
function buscarTurno(idTurno) {
  return turnos.find(t => t.id === idTurno);
}

// ========================================
// FUNCIÓN: Buscar turnos por cédula
// ========================================
function buscarTurnosPorCedula(cedula) {
  return turnos.filter(t => t.cedula === cedula);
}

// ========================================
// FUNCIÓN: Sacar un nuevo turno
// ========================================
function sacarTurno(cedula, nombre, idServicio, telefono) {
  // IF para validar que la cédula no esté vacía
  if (!cedula || cedula.trim() === "") {
    console.log("❌ Error: La cédula es requerida.");
    return;
  }
  
  // IF para validar que el nombre no esté vacío
  if (!nombre || nombre.trim() === "") {
    console.log("❌ Error: El nombre es requerido.");
    return;
  }
  
  // Buscar el servicio
  const servicio = buscarServicio(idServicio);
  
  // IF para validar si el servicio existe
  if (!servicio) {
    console.log("❌ Error: Servicio no encontrado.");
    return;
  }
  
  // IF para validar disponibilidad del servicio
  if (servicio.disponibilidad <= 0) {
    console.log(`❌ Error: El servicio "${servicio.nombre}" no tiene disponibilidad.`);
    return;
  }
  
  // Validar que el usuario no tenga más de 2 turnos activos
  const turnosActivos = buscarTurnosPorCedula(cedula);
  
  if (turnosActivos.length >= 2) {
    console.log("❌ Error: No puedes tener más de 2 turnos activos.");
    return;
  }
  
  // Generar ID del turno
  contadorTurnos++;
  const idTurno = contadorTurnos;
  
  // Generar hora del turno
  const hora = generarHora();
  
  // Obtener fecha actual
  const fecha = new Date().toLocaleDateString();
  
  // Crear el turno
  const nuevoTurno = {
    id: idTurno,
    cedula: cedula,
    nombre: nombre,
    servicio: servicio.nombre,
    idServicio: idServicio,
    hora: hora,
    fecha: fecha,
    telefono: telefono,
    estado: "Confirmado"
  };
  
  // Agregar el turno al array
  turnos.push(nuevoTurno);
  
  // Decrementar disponibilidad del servicio
  servicio.disponibilidad--;
  
  console.log(`\n✅ ¡TURNO ASIGNADO EXITOSAMENTE!`);
  console.log("═══════════════════════════════════════════");
  console.log(`📌 ID Turno: ${idTurno}`);
  console.log(`👤 Nombre: ${nombre}`);
  console.log(`🆔 Cédula: ${cedula}`);
  console.log(`🏥 Servicio: ${servicio.nombre}`);
  console.log(`📅 Fecha: ${fecha}`);
  console.log(`⏰ Hora: ${hora}`);
  console.log(`📞 Teléfono: ${telefono}`);
  console.log(`✔️ Estado: ${nuevoTurno.estado}`);
}

// ========================================
// FUNCIÓN: Ver mis turnos (por cédula)
// ========================================
function verMisTurnos(cedula) {
  console.log(`\n📋 MIS TURNOS - Cédula: ${cedula}`);
  console.log("═══════════════════════════════════════════");
  
  // Buscar todos los turnos del usuario
  const misTurnos = buscarTurnosPorCedula(cedula);
  
  // IF para validar si hay turnos
  if (misTurnos.length === 0) {
    console.log("No tienes turnos asignados.");
    return;
  }
  
  // Ciclo para mostrar cada turno
  misTurnos.forEach((turno, index) => {
    console.log(`\n${index + 1}. ID Turno: ${turno.id}`);
    console.log(`   Servicio: ${turno.servicio}`);
    console.log(`   Fecha: ${turno.fecha}`);
    console.log(`   Hora: ${turno.hora}`);
    console.log(`   Estado: ${turno.estado}`);
  });
}

// ========================================
// FUNCIÓN: Listar todos los turnos
// ========================================
function listarTodosTurnos() {
  console.log("\n📅 TODOS LOS TURNOS DEL SISTEMA:");
  console.log("═══════════════════════════════════════════");
  
  // IF para validar si hay turnos
  if (turnos.length === 0) {
    console.log("No hay turnos asignados aún.");
    return;
  }
  
  // Ciclo para mostrar todos los turnos
  turnos.forEach((turno, index) => {
    // Operador ternario para colorear estado
    const icono = turno.estado === "Confirmado" ? "✅" : "❌";
    
    console.log(`\n${index + 1}. ${icono} ID: ${turno.id}`);
    console.log(`   Paciente: ${turno.nombre} (Cédula: ${turno.cedula})`);
    console.log(`   Servicio: ${turno.servicio}`);
    console.log(`   Fecha: ${turno.fecha}`);
    console.log(`   Hora: ${turno.hora}`);
    console.log(`   Estado: ${turno.estado}`);
  });
}

// ========================================
// FUNCIÓN: Buscar turno por ID
// ========================================
function buscarYMostrarTurno(idTurno) {
  console.log(`\n🔍 BÚSQUEDA DE TURNO - ID: ${idTurno}`);
  console.log("═══════════════════════════════════════════");
  
  // Buscar el turno
  const turno = buscarTurno(idTurno);
  
  // IF para validar si el turno existe
  if (!turno) {
    console.log("❌ Error: Turno no encontrado.");
    return;
  }
  
  // Mostrar detalles del turno
  console.log(`✅ Turno encontrado:`);
  console.log(`Paciente: ${turno.nombre}`);
  console.log(`Cédula: ${turno.cedula}`);
  console.log(`Servicio: ${turno.servicio}`);
  console.log(`Fecha: ${turno.fecha}`);
  console.log(`Hora: ${turno.hora}`);
  console.log(`Teléfono: ${turno.telefono}`);
  console.log(`Estado: ${turno.estado}`);
}

// ========================================
// FUNCIÓN: Cancelar un turno
// ========================================
function cancelarTurno(idTurno) {
  console.log(`\n❌ CANCELACIÓN DE TURNO - ID: ${idTurno}`);
  console.log("═══════════════════════════════════════════");
  
  // Buscar el índice del turno
  const index = turnos.findIndex(t => t.id === idTurno);
  
  // IF para validar si el turno existe
  if (index === -1) {
    console.log("❌ Error: Turno no encontrado.");
    return;
  }
  
  // Obtener datos del turno
  const turno = turnos[index];
  
  // IF para validar si el turno ya está cancelado
  if (turno.estado === "Cancelado") {
    console.log("❌ Error: Este turno ya está cancelado.");
    return;
  }
  
  // Buscar el servicio para incrementar disponibilidad
  const servicio = buscarServicio(turno.idServicio);
  if (servicio) {
    servicio.disponibilidad++;
  }
  
  // Actualizar estado del turno
  turno.estado = "Cancelado";
  
  console.log(`✅ Turno cancelado exitosamente.`);
  console.log(`ID Turno: ${idTurno}`);
  console.log(`Paciente: ${turno.nombre}`);
  console.log(`Servicio liberado: ${turno.servicio}`);
}

// ========================================
// FUNCIÓN: Cambiar hora de un turno
// ========================================
function cambiarHoraTurno(idTurno, nuevaHora) {
  console.log(`\n⏰ CAMBIO DE HORA - ID: ${idTurno}`);
  console.log("═══════════════════════════════════════════");
  
  // Buscar el turno
  const turno = buscarTurno(idTurno);
  
  // IF para validar si el turno existe
  if (!turno) {
    console.log("❌ Error: Turno no encontrado.");
    return;
  }
  
  // IF para validar si el turno está cancelado
  if (turno.estado === "Cancelado") {
    console.log("❌ Error: No se puede cambiar la hora de un turno cancelado.");
    return;
  }
  
  // Obtener hora anterior
  const horaAnterior = turno.hora;
  
  // Actualizar la hora
  turno.hora = nuevaHora;
  
  console.log(`✅ Hora actualizada exitosamente.`);
  console.log(`Turno ID: ${idTurno}`);
  console.log(`Hora anterior: ${horaAnterior}`);
  console.log(`Hora nueva: ${nuevaHora}`);
  console.log(`Paciente: ${turno.nombre}`);
}

// ========================================
// FUNCIÓN: Reportes y Estadísticas
// ========================================
function mostrarReportes() {
  console.log("\n📊 REPORTES Y ESTADÍSTICAS:");
  console.log("═══════════════════════════════════════════");
  
  // 1. Total de turnos
  console.log(`\n1️⃣ Total de turnos: ${turnos.length}`);
  
  // 2. Turnos confirmados (usando filter y length)
  const turnosConfirmados = turnos.filter(t => t.estado === "Confirmado").length;
  console.log(`2️⃣ Turnos confirmados: ${turnosConfirmados}`);
  
  // 3. Turnos cancelados
  const turnosCancelados = turnos.filter(t => t.estado === "Cancelado").length;
  console.log(`3️⃣ Turnos cancelados: ${turnosCancelados}`);
  
  // 4. Distribución por servicio (usando map y reduce)
  console.log(`\n4️⃣ Turnos por servicio:`);
  servicios.forEach(servicio => {
    const turnosServicio = turnos.filter(t => t.idServicio === servicio.id).length;
    // Operador ternario
    const porcentaje = turnos.length > 0 
      ? ((turnosServicio / turnos.length) * 100).toFixed(1) 
      : 0;
    console.log(`   ${servicio.nombre}: ${turnosServicio} turnos (${porcentaje}%)`);
  });
  
  // 5. Disponibilidad de servicios
  console.log(`\n5️⃣ Disponibilidad de servicios:`);
  servicios.forEach(servicio => {
    const barraDisponibilidad = "█".repeat(servicio.disponibilidad) + "░".repeat(5 - servicio.disponibilidad);
    console.log(`   ${servicio.nombre}: [${barraDisponibilidad}] ${servicio.disponibilidad}/5`);
  });
  
  // 6. Promedio de turnos por paciente
  if (turnos.length > 0) {
    const cedulasUnicas = new Set(turnos.map(t => t.cedula));
    const promedio = (turnos.length / cedulasUnicas.size).toFixed(2);
    console.log(`\n6️⃣ Pacientes únicos: ${cedulasUnicas.size}`);
    console.log(`   Promedio de turnos por paciente: ${promedio}`);
  }
}

// ========================================
// FUNCIÓN: Procesar opción (SWITCH)
// ========================================
function procesarOpcion(opcion, param1, param2, param3, param4) {
  // SWITCH para manejar múltiples opciones
  switch (opcion) {
    case 1:
      mostrarServicios();
      break;
    
    case 2:
      sacarTurno(param1, param2, param3, param4);
      break;
    
    case 3:
      verMisTurnos(param1);
      break;
    
    case 4:
      cancelarTurno(param1);
      break;
    
    case 5:
      listarTodosTurnos();
      break;
    
    case 6:
      buscarYMostrarTurno(param1);
      break;
    
    case 7:
      cambiarHoraTurno(param1, param2);
      break;
    
    case 8:
      mostrarReportes();
      break;
    
    case 9:
      console.log("\n👋 ¡Gracias por usar el Digiturno! Hasta luego.");
      break;
    
    default:
      console.log("❌ Opción no válida. Intenta de nuevo.");
  }
}

// ========================================
// EJECUTAR EL PROGRAMA
// ========================================
console.log("🏥 BIENVENIDO AL SISTEMA DE DIGITURNO\n");

// Mostrar menú
mostrarMenu();

// SIMULACIÓN: Ejecutar operaciones
console.log("\n┌─ OPERACIÓN 1: Ver Servicios Disponibles ─┐");
procesarOpcion(1);

console.log("\n┌─ OPERACIÓN 2: Sacar Turno (Paciente 1) ─┐");
procesarOpcion(2, "12345678", "Juan Pérez", 1, "3015555000");

console.log("\n┌─ OPERACIÓN 3: Sacar Turno (Paciente 2) ─┐");
procesarOpcion(2, "87654321", "María García", 2, "3015555001");

console.log("\n┌─ OPERACIÓN 4: Sacar Turno (Paciente 1 - Otro) ─┐");
procesarOpcion(2, "12345678", "Juan Pérez", 3, "3015555000");

console.log("\n┌─ OPERACIÓN 5: Sacar Turno (Paciente 3) ─┐");
procesarOpcion(2, "11223344", "Carlos López", 4, "3015555002");

console.log("\n┌─ OPERACIÓN 6: Ver Mis Turnos (Paciente 1) ─┐");
procesarOpcion(3, "12345678");

console.log("\n┌─ OPERACIÓN 7: Listar Todos los Turnos ─┐");
procesarOpcion(5);

console.log("\n┌─ OPERACIÓN 8: Buscar Turno por ID ─┐");
procesarOpcion(6, 1001);

console.log("\n┌─ OPERACIÓN 9: Cambiar Hora de Turno ─┐");
procesarOpcion(7, 1001, "14:30");

console.log("\n┌─ OPERACIÓN 10: Ver Servicios Actualizados ─┐");
procesarOpcion(1);

console.log("\n┌─ OPERACIÓN 11: Cancelar Turno ─┐");
procesarOpcion(4, 1002);

console.log("\n┌─ OPERACIÓN 12: Reportes y Estadísticas ─┐");
procesarOpcion(8);

console.log("\n┌─ OPERACIÓN 13: Ver Turnos Después de Cambios ─┐");
procesarOpcion(5);