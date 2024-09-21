module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define('book', {
    id_libro: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: {
      type: Sequelize.STRING(100), // Título del libro, texto de hasta 100 caracteres
      allowNull: false
    },
    id_autor: {
      type: Sequelize.INTEGER, // ID del autor, entero
      allowNull: false
    },
    isbn: {
      type: Sequelize.STRING(20), // ISBN, texto de hasta 20 caracteres
      allowNull: false
    },
    editorial: {
      type: Sequelize.STRING(50) // Editorial, texto de hasta 50 caracteres
    },
    anio_publicacion: {
      type: Sequelize.INTEGER // Año de publicación, entero
    },
    categoria: {
      type: Sequelize.STRING(30) // Categoría, texto de hasta 30 caracteres
    },
    cantidad_disponible: {
      type: Sequelize.INTEGER, // Cantidad disponible, entero
      allowNull: false
    },
    ubicacion: {
      type: Sequelize.STRING(50) // Ubicación, texto de hasta 50 caracteres
    }
  });

  return Book;
}
