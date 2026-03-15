// ========================================
// SISTEMA DE CARRITO DE COMPRA
// Conceptos: Switch, Ciclos, Funciones, Arrays, If, Operador Ternario
// ========================================

// ========================================
// DATOS: Array de productos disponibles
// ========================================
const productos = [
  { id: 1, nombre: "Laptop Dell", precio: 800, categoria: "Electrónica", stock: 5 },
  { id: 2, nombre: "Mouse Logitech", precio: 25, categoria: "Accesorios", stock: 15 },
  { id: 3, nombre: "Teclado Mecánico", precio: 120, categoria: "Accesorios", stock: 8 },
  { id: 4, nombre: "Monitor LG 24\"", precio: 250, categoria: "Electrónica", stock: 3 },
  { id: 5, nombre: "USB-C Cable", precio: 15, categoria: "Cables", stock: 20 },
  { id: 6, nombre: "Webcam HD", precio: 80, categoria: "Accesorios", stock: 6 },
  { id: 7, nombre: "Auriculares", precio: 60, categoria: "Audio", stock: 10 }
];

// Variable global para guardar el carrito
let carrito = [];

// ========================================
// FUNCIÓN: Mostrar menú principal
// ========================================
function mostrarMenu() {
  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║       SISTEMA DE CARRITO DE COMPRA      ║");
  console.log("╚══════════════════════════════════════════╝");
  console.log("1. Ver Productos Disponibles");
  console.log("2. Agregar Producto al Carrito");
  console.log("3. Ver Carrito");
  console.log("4. Quitar Producto del Carrito");
  console.log("5. Cambiar Cantidad de un Producto");
  console.log("6. Vaciar Carrito");
  console.log("7. Procesar Compra");
  console.log("8. Salir");
  console.log("══════════════════════════════════════════");
}

// ========================================
// FUNCIÓN: Mostrar todos los productos disponibles
// ========================================
function mostrarProductos() {
  console.log("\n📦 PRODUCTOS DISPONIBLES:");
  console.log("══════════════════════════════════════════");
  
  // Ciclo para mostrar cada producto con su información
  productos.forEach((producto, index) => {
    // Operador ternario para mostrar disponibilidad
    const disponibilidad = producto.stock > 0 
      ? `✅ ${producto.stock} en stock` 
      : "❌ Agotado";
    
    console.log(`${index + 1}. ${producto.nombre}`);
    console.log(`   ID: ${producto.id} | Precio: $${producto.precio}`);
    console.log(`   Categoría: ${producto.categoria} | ${disponibilidad}`);
    console.log("   ───────────────────────────────────────");
  });
}

// ========================================
// FUNCIÓN: Buscar un producto por ID
// ========================================
function buscarProducto(idProducto) {
  return productos.find(p => p.id === idProducto);
}

// ========================================
// FUNCIÓN: Buscar un producto en el carrito
// ========================================
function buscarEnCarrito(idProducto) {
  return carrito.find(item => item.id === idProducto);
}

// ========================================
// FUNCIÓN: Agregar producto al carrito
// ========================================
function agregarAlCarrito(idProducto, cantidad) {
  // IF para validar que la cantidad sea positiva
  if (cantidad <= 0) {
    console.log("❌ Error: La cantidad debe ser mayor a 0.");
    return;
  }
  
  // Buscar el producto en la lista de productos
  const producto = buscarProducto(idProducto);
  
  // IF para validar si el producto existe
  if (!producto) {
    console.log("❌ Error: Producto no encontrado.");
    return;
  }
  
  // IF para validar si hay stock disponible
  if (cantidad > producto.stock) {
    console.log(`❌ Error: Solo hay ${producto.stock} unidades disponibles.`);
    return;
  }
  
  // Verificar si el producto ya está en el carrito
  const itemEnCarrito = buscarEnCarrito(idProducto);
  
  // Operador ternario: si existe, incrementar cantidad; si no, crear nuevo
  if (itemEnCarrito) {
    // Validar que no se exceda el stock
    if (itemEnCarrito.cantidad + cantidad > producto.stock) {
      console.log(`❌ Error: Solo puedes agregar ${producto.stock - itemEnCarrito.cantidad} más unidades.`);
      return;
    }
    itemEnCarrito.cantidad += cantidad;
    console.log(`✅ Se agregaron ${cantidad} unidad(es) más de "${producto.nombre}".`);
  } else {
    // Crear nuevo item en el carrito
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: cantidad,
      subtotal: producto.precio * cantidad
    });
    console.log(`✅ "${producto.nombre}" agregado al carrito (${cantidad} unidad(es)).`);
  }
}

// ========================================
// FUNCIÓN: Ver contenido del carrito
// ========================================
function verCarrito() {
  console.log("\n🛒 CARRITO DE COMPRA:");
  console.log("══════════════════════════════════════════");
  
  // IF para validar si el carrito está vacío
  if (carrito.length === 0) {
    console.log("El carrito está vacío.");
    return;
  }
  
  // Ciclo para mostrar cada item del carrito
  carrito.forEach((item, index) => {
    console.log(`${index + 1}. ${item.nombre}`);
    console.log(`   Precio Unitario: $${item.precio}`);
    console.log(`   Cantidad: ${item.cantidad}`);
    console.log(`   Subtotal: $${item.subtotal.toFixed(2)}`);
    console.log("   ───────────────────────────────────────");
  });
  
  // Mostrar total
  const total = calcularTotal();
  console.log(`\n💰 TOTAL: $${total.toFixed(2)}`);
}

// ========================================
// FUNCIÓN: Calcular el total del carrito
// ========================================
function calcularTotal() {
  // reduce() suma todos los subtotales
  return carrito.reduce((total, item) => total + item.subtotal, 0);
}

// ========================================
// FUNCIÓN: Calcular la cantidad total de artículos
// ========================================
function calcularCantidadTotal() {
  // reduce() suma todas las cantidades
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}

// ========================================
// FUNCIÓN: Quitar un producto del carrito
// ========================================
function quitarDelCarrito(idProducto) {
  // Buscar el índice del producto en el carrito
  const index = carrito.findIndex(item => item.id === idProducto);
  
  // IF para validar si el producto existe en el carrito
  if (index === -1) {
    console.log("❌ Error: Producto no encontrado en el carrito.");
    return;
  }
  
  // Obtener el nombre del producto antes de eliminarlo
  const nombreProducto = carrito[index].nombre;
  
  // Usar splice() para remover el producto del array
  carrito.splice(index, 1);
  
  console.log(`✅ "${nombreProducto}" removido del carrito.`);
}

// ========================================
// FUNCIÓN: Cambiar cantidad de un producto
// ========================================
function cambiarCantidad(idProducto, nuevaCantidad) {
  // IF para validar que la cantidad sea positiva
  if (nuevaCantidad <= 0) {
    console.log("❌ Error: La cantidad debe ser mayor a 0.");
    quitarDelCarrito(idProducto);
    return;
  }
  
  // Buscar el producto en el carrito
  const item = buscarEnCarrito(idProducto);
  
  // IF para validar si el producto existe en el carrito
  if (!item) {
    console.log("❌ Error: Producto no encontrado en el carrito.");
    return;
  }
  
  // Buscar el producto original para validar stock
  const producto = buscarProducto(idProducto);
  
  // IF para validar si la nueva cantidad excede el stock
  if (nuevaCantidad > producto.stock) {
    console.log(`❌ Error: Solo hay ${producto.stock} unidades disponibles.`);
    return;
  }
  
  // Obtener la cantidad anterior
  const cantidadAnterior = item.cantidad;
  
  // Actualizar cantidad y subtotal
  item.cantidad = nuevaCantidad;
  item.subtotal = item.precio * nuevaCantidad;
  
  console.log(`✅ Cantidad actualizada: ${cantidadAnterior} → ${nuevaCantidad} unidad(es).`);
  console.log(`   Nuevo subtotal: $${item.subtotal.toFixed(2)}`);
}

// ========================================
// FUNCIÓN: Vaciar el carrito
// ========================================
function vaciarCarrito() {
  // IF para validar si el carrito está vacío
  if (carrito.length === 0) {
    console.log("❌ El carrito ya está vacío.");
    return;
  }
  
  // Obtener cantidad de items antes de vaciar
  const cantidadItems = carrito.length;
  
  // Limpiar el array asignando un array vacío
  carrito = [];
  
  console.log(`✅ Carrito vaciado. Se eliminaron ${cantidadItems} producto(s).`);
}

// ========================================
// FUNCIÓN: Aplicar descuento (bonus)
// ========================================
function aplicarDescuento(porcentaje) {
  // IF para validar que el porcentaje sea válido
  if (porcentaje < 0 || porcentaje > 100) {
    console.log("❌ Error: El descuento debe estar entre 0 y 100.");
    return 0;
  }
  
  const total = calcularTotal();
  const descuento = total * (porcentaje / 100);
  return descuento;
}

// ========================================
// FUNCIÓN: Procesar compra (resumen final)
// ========================================
function procesarCompra() {
  console.log("\n📋 RESUMEN DE COMPRA FINAL:");
  console.log("══════════════════════════════════════════");
  
  // IF para validar si el carrito está vacío
  if (carrito.length === 0) {
    console.log("❌ Error: El carrito está vacío. No hay nada que comprar.");
    return;
  }
  
  // Mostrar detalles de cada producto
  console.log("\nProductos:");
  carrito.forEach((item, index) => {
    console.log(`${index + 1}. ${item.nombre}`);
    console.log(`   ${item.cantidad} x $${item.precio} = $${item.subtotal.toFixed(2)}`);
  });
  
  // Calcular totales
  const cantidadTotal = calcularCantidadTotal();
  const subtotal = calcularTotal();
  const impuesto = subtotal * 0.19; // IVA 19%
  const totalFinal = subtotal + impuesto;
  
  console.log("\n─────────────────────────────────────────");
  console.log(`Cantidad de artículos: ${cantidadTotal}`);
  console.log(`Subtotal: $${subtotal.toFixed(2)}`);
  console.log(`Impuesto (19%): $${impuesto.toFixed(2)}`);
  console.log(`\n💳 TOTAL A PAGAR: $${totalFinal.toFixed(2)}`);
  console.log("══════════════════════════════════════════");
  
  // Operador ternario: mostrar mensaje según el total
  const mensaje = totalFinal > 500 
    ? "¡Obtuviste un envío GRATIS por compra mayor a $500!" 
    : "Compra por más de $500 para obtener envío gratis.";
  console.log(`\n🎁 ${mensaje}`);
  
  // Vaciar carrito después de procesar
  carrito = [];
  console.log("\n✅ ¡Compra procesada exitosamente!");
}

// ========================================
// FUNCIÓN: Procesar opci��n (SWITCH)
// ========================================
function procesarOpcion(opcion, parametro1, parametro2) {
  // SWITCH para manejar m��ltiples opciones
  switch (opcion) {
    case 1:
      mostrarProductos();
      break;
    
    case 2:
      agregarAlCarrito(parametro1, parametro2);
      break;
    
    case 3:
      verCarrito();
      break;
    
    case 4:
      quitarDelCarrito(parametro1);
      break;
    
    case 5:
      cambiarCantidad(parametro1, parametro2);
      break;
    
    case 6:
      vaciarCarrito();
      break;
    
    case 7:
      procesarCompra();
      break;
    
    case 8:
      console.log("\n👋 ¡Gracias por su compra! Hasta luego.");
      break;
    
    default:
      console.log("❌ Opción no válida. Intenta de nuevo.");
  }
}

// ========================================
// EJECUTAR EL PROGRAMA
// ========================================
console.log("🛍️  BIENVENIDO AL SISTEMA DE CARRITO DE COMPRA\n");

// Mostrar menú
mostrarMenu();

// SIMULACIÓN: Ejecutar operaciones
console.log("\n┌─ OPERACIÓN 1: Ver Productos ─────────┐");
procesarOpcion(1);

console.log("\n┌─ OPERACIÓN 2: Agregar Producto #1 ─┐");
procesarOpcion(2, 1, 1); // Laptop, cantidad 1

console.log("\n┌─ OPERACIÓN 3: Agregar Producto #2 ─┐");
procesarOpcion(2, 2, 2); // Mouse, cantidad 2

console.log("\n┌─ OPERACIÓN 4: Agregar Producto #3 ─┐");
procesarOpcion(2, 3, 1); // Teclado, cantidad 1

console.log("\n┌─ OPERACIÓN 5: Ver Carrito ────────┐");
procesarOpcion(3);

console.log("\n┌─ OPERACIÓN 6: Agregar Más Mouse ──┐");
procesarOpcion(2, 2, 2); // 2 más al mouse

console.log("\n┌─ OPERACIÓN 7: Ver Carrito Actualizado ┐");
procesarOpcion(3);

console.log("\n┌─ OPERACIÓN 8: Cambiar Cantidad Teclado ┐");
procesarOpcion(5, 3, 2); // Cambiar teclado a 2 unidades

console.log("\n┌─ OPERACIÓN 9: Ver Carrito Final ──┐");
procesarOpcion(3);

console.log("\n┌─ OPERACIÓN 10: Quitar Mouse ──────┐");
procesarOpcion(4, 2); // Quitar mouse

console.log("\n┌─ OPERACIÓN 11: Ver Carrito ──────┐");
procesarOpcion(3);

console.log("\n┌─ OPERACIÓN 12: Procesar Compra ──┐");
procesarOpcion(7);

console.log("\n┌─ OPERACIÓN 13: Ver Carrito (después de compra) ┐");
procesarOpcion(3);