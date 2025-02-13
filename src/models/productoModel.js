// models/productoModel.js
// const pool = require('../config/db');

// const getAllProducts = async () => {
//     const [rows] = await pool.query('SELECT * FROM productos');
//     return rows;
// };

// const getProductByCode = async (codigo) => {
//     const [rows] = await pool.query('SELECT * FROM productos WHERE codigo = ?', [codigo]);
//     return rows[0]; // Retorna el primer producto encontrado (o `undefined` si no hay resultados)
// };

// const addProduct = async (codigo, nombre, categoria, stock, precio) => {
//     const [result] = await pool.query(
//         'INSERT INTO productos (codigo, nombre, categoria, stock, precio) VALUES (?, ?, ?, ?, ?)',
//         [codigo, nombre, categoria, stock, precio]
//     );
//     return result.insertId;
// };

const products = [
  {
    id: 1,
    codigo: "162",
    nombre: "Mate Imperial",
    categoria: "Bazar",
    stock: 10,
    precio: "250.00",
  },
  {
    id: 2,
    codigo: "163",
    nombre: "Mochila Urbana",
    categoria: "Bazar",
    stock: 15,
    precio: "1200.00",
  },
  {
    id: 3,
    codigo: "164",
    nombre: "Set de Pinturas para Uñas",
    categoria: "Bazar",
    stock: 20,
    precio: "500.00",
  },
  {
    id: 4,
    codigo: "165",
    nombre: "Termo Acero Inoxidable 1L",
    categoria: "Bazar",
    stock: 8,
    precio: "2200.00",
  },
  {
    id: 5,
    codigo: "166",
    nombre: "Lámpara LED Recargable",
    categoria: "Bazar",
    stock: 12,
    precio: "1800.00",
  },
  {
    id: 6,
    codigo: "167",
    nombre: "Caja Organizadora Multiuso",
    categoria: "Bazar",
    stock: 18,
    precio: "750.00",
  },
  {
    id: 7,
    codigo: "168",
    nombre: "Set de Cubiertos de Acero",
    categoria: "Bazar",
    stock: 14,
    precio: "900.00",
  },
  {
    id: 8,
    codigo: "169",
    nombre: "Bolso de Viaje Grande",
    categoria: "Bazar",
    stock: 7,
    precio: "3200.00",
  },
  {
    id: 9,
    codigo: "170",
    nombre: "Botella Deportiva 750ml",
    categoria: "Bazar",
    stock: 25,
    precio: "650.00",
  },
  {
    id: 10,
    codigo: "171",
    nombre: "Porta Cosméticos con Espejo",
    categoria: "Bazar",
    stock: 10,
    precio: "1100.00",
  },
  {
    id: 11,
    codigo: "172",
    nombre: "Taza Cerámica Personalizada",
    categoria: "Bazar",
    stock: 30,
    precio: "350.00",
  },
  {
    id: 12,
    codigo: "173",
    nombre: "Soporte para Celular",
    categoria: "Bazar",
    stock: 20,
    precio: "400.00",
  },
  {
    id: 13,
    codigo: "174",
    nombre: "Cargador Portátil 10000mAh",
    categoria: "Electrónica",
    stock: 10,
    precio: "4500.00",
  },
  {
    id: 14,
    codigo: "175",
    nombre: "Auriculares Bluetooth",
    categoria: "Electrónica",
    stock: 15,
    precio: "5000.00",
  },
  {
    id: 15,
    codigo: "176",
    nombre: "Teclado Inalámbrico",
    categoria: "Electrónica",
    stock: 12,
    precio: "3800.00",
  },
  {
    id: 16,
    codigo: "177",
    nombre: "Mouse Gamer RGB",
    categoria: "Electrónica",
    stock: 19,
    precio: "2500.00",
  },
  {
    id: 17,
    codigo: "178",
    nombre: "Almohada Viscoelástica",
    categoria: "Hogar",
    stock: 25,
    precio: "2800.00",
  },
  {
    id: 18,
    codigo: "179",
    nombre: "Sábanas de Microfibra",
    categoria: "Hogar",
    stock: 14,
    precio: "3200.00",
  },
  {
    id: 19,
    codigo: "180",
    nombre: "Cortinas Blackout",
    categoria: "Hogar",
    stock: 10,
    precio: "4200.00",
  },
  {
    id: 20,
    codigo: "181",
    nombre: "Silla Ergonómica",
    categoria: "Oficina",
    stock: 8,
    precio: "15000.00",
  },
  {
    id: 21,
    codigo: "182",
    nombre: "Escritorio Minimalista",
    categoria: "Oficina",
    stock: 5,
    precio: "18000.00",
  },
  {
    id: 22,
    codigo: "183",
    nombre: "Lámpara de Escritorio LED",
    categoria: "Oficina",
    stock: 10,
    precio: "2800.00",
  },
  {
    id: 23,
    codigo: "184",
    nombre: "Cuaderno de Notas",
    categoria: "Papelería",
    stock: 50,
    precio: "600.00",
  },
];

function getAllProducts() {
  return products;
}

let getProductByCode = async (codigo) => {
  return products.filter((product) => product.codigo == codigo);
};

let addProduct = async (codigo, nombre, categoria, stock, precio) => {
  products.push({
    codigo: codigo,
    nombre: nombre,
    categoria,
    stock: stock,
    precio: precio,
  });
  return products.filter((product) => product.codigo == codigo);
};

module.exports = { getAllProducts, addProduct, getProductByCode };
