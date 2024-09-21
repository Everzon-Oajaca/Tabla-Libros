module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('product', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING, // Nombre del producto, texto requerido
      allowNull: false
    },
    description: {
      type: Sequelize.STRING // Descripción, texto opcional
    },
    price: {
      type: Sequelize.DECIMAL(10, 2), // Precio, moneda (con 10 dígitos en total y 2 decimales)
      allowNull: false
    },
    category: {
      type: Sequelize.STRING, // Categoría, texto requerido
      allowNull: false
    },
    stock: {
      type: Sequelize.INTEGER, // Stock, entero requerido
      allowNull: false
    }
  });

  return Product;
};
