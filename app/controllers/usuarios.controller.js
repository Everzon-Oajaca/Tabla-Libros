const db = require('../config/db.config.js');
const Usuario = db.Usuario;

exports.create = async (req, res) => {
  try {
    const usuario = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      fecha_registro: req.body.fecha_registro,
      estado: req.body.estado
    };

    const result = await Usuario.create(usuario);
    res.status(201).json({
      message: "Usuario creado con éxito con id = " + result.id_usuario,
      usuario: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "¡Falló!",
      error: error.message
    });
  }
};

exports.retrieveAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json({
      message: "¡Se obtuvieron todos los usuarios con éxito!",
      usuarios: usuarios
    });
  } catch (error) {
    res.status(500).json({
      message: "¡Error!",
      error: error.message
    });
  }
};

exports.getUsuarioById = async (req, res) => {
  const usuarioId = req.params.id;
  try {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({
        message: "No se encontró el usuario con id = " + usuarioId,
      });
    }
    res.status(200).json({
      message: "Se obtuvo con éxito el usuario con id = " + usuarioId,
      usuario: usuario
    });
  } catch (error) {
    res.status(500).json({
      message: "¡Error!",
      error: error.message
    });
  }
};

exports.updateById = async (req, res) => {
  const usuarioId = req.params.id;
  try {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({
        message: "No se encontró el usuario con id = " + usuarioId,
      });
    }

    const updatedObject = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      fecha_registro: req.body.fecha_registro,
      estado: req.body.estado
    };

    await Usuario.update(updatedObject, { where: { id_usuario: usuarioId } });
    res.status(200).json({
      message: "Actualización exitosa del usuario con id = " + usuarioId,
      usuario: updatedObject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el usuario con id = " + usuarioId,
      error: error.message
    });
  }
};

exports.deleteById = async (req, res) => {
  const usuarioId = req.params.id;
  try {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({
        message: `No existe un usuario con id = ${usuarioId}`,
      });
    }

    await usuario.destroy();
    res.status(200).json({
      message: `Eliminación exitosa del usuario con id = ${usuarioId}`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error -> No se puede eliminar el usuario con id = ${usuarioId}`,
      error: error.message,
    });
  }
};
