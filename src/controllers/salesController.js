const { createSale, getSaleById } = require('../models/Sales')
const getSale = async (req,res) =>{
         const { codigo } = req.params;
    try {
        const venta = await getSaleById(codigo);
        if (!venta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.json(venta);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la venta', details: error.message });
    }   
}

const postSale = async (req, res) => {
    console.log(req.body)

    const { usuarioId, detalles } = req.body;
    const resultado = await createSale({ usuarioId, detalles });

    if (resultado.success) {
        res.status(201).json({ mensaje: 'Venta registrada', ventaId: resultado.ventaId });
    } else {
        res.status(400).json({ error: resultado.error });
    }
};

module.exports = {postSale, getSale}