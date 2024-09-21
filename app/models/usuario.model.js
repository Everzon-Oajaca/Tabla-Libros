module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define('usuario', {
    id_usuario: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false // Requerido
    },
    apellido: {
      type: Sequelize.STRING,
      allowNull: false // Requerido
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false, // Requerido
     
    },
    telefono: {
      type: Sequelize.STRING, // Puedes ajustar el tipo según el formato
      allowNull: true
    },
    direccion: {
      type: Sequelize.STRING,
      allowNull: true
    },
    fecha_registro: {
      type: Sequelize.STRING,
      allowNull: true // Requerido
    },
    estado: {
      type: Sequelize.STRING,
      allowNull: false // Requerido
    }
  });

  return Usuario;
};
