const pool = require('../config/db'); // o donde tengas tu archivo de conexión

const getSaleById = async (id) => {
     // Llamamos al stored procedure que devuelve las filas con venta + detalles
  const [rows] = await pool.query('CALL obtener_venta_con_detalles(?)', [id]);
  
  const detallesRows = rows[0];

  if (detallesRows.length === 0) {
    return null; // no existe esa venta
  }

  const venta = {
    venta_id: detallesRows[0].venta_id,
    fecha: detallesRows[0].fecha,
    total: detallesRows[0].total,
    usuario_id: detallesRows[0].usuario_id,
    detalles: detallesRows.map(row => ({
      detalle_id: row.detalle_id,
      producto_id: row.producto_id,
      producto_nombre: row.producto_nombre,
      categoria_id: row.categoria_id,
      cantidad: row.cantidad,
      precio_unitario: row.precio_unitario,
      subtotal: row.subtotal,
    }))
  };

  return venta;
}

const createSale = async ({ usuarioId, detalles }) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // 1. Calcular total de la venta
        const total = detalles.reduce((sum, item) => sum + item.precio_unitario * item.cantidad, 0);

        // 2. Insertar la venta
        const [ventaResult] = await connection.execute(
            'INSERT INTO ventas (fecha, total, usuario_id) VALUES (NOW(), ?, ?)',
            [total, usuarioId]
        );

        const ventaId = ventaResult.insertId;

        // 3. Insertar los detalles de la venta
        for (const item of detalles) {
            await connection.execute(
                'INSERT INTO detalles_venta (venta_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
                [
                    ventaId,
                    item.producto_id,
                    item.cantidad,
                    item.precio_unitario,
                    item.precio_unitario * item.cantidad
                ]
            );

            // 4. Actualizar el stock del producto
            const [stockUpdate] = await connection.execute(
                'UPDATE productos SET stock = stock - ? WHERE id = ? AND stock >= ?',
                [item.cantidad, item.producto_id, item.cantidad]
            );

            if (stockUpdate.affectedRows === 0) {
                throw new Error(`Stock insuficiente para el producto ID ${item.producto_id}`);
            }
        }

        // 5. Confirmar transacción
        await connection.commit();
        return { success: true, ventaId };

    } catch (error) {
        // ⚠️ Si algo falla, deshacer todo
        await connection.rollback();
        return { success: false, error: error.message };
    } finally {
        connection.release();
    }
}

module.exports = {
    createSale,
    getSaleById
};
