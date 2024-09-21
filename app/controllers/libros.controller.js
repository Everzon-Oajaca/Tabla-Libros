const db = require('../config/db.config.js');
const Book = db.Book;

exports.create = (req, res) => {
  let book = {};

  try {
    book.titulo = req.body.titulo;
    book.id_autor = req.body.id_autor;
    book.isbn = req.body.isbn;
    book.editorial = req.body.editorial;
    book.anio_publicacion = req.body.anio_publicacion;
    book.categoria = req.body.categoria;
    book.cantidad_disponible = req.body.cantidad_disponible;
    book.ubicacion = req.body.ubicacion;

    Book.create(book).then(result => {
      res.status(200).json({
        message: "Libro creado con éxito con id = " + result.id_libro,
        book: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "¡Falló!",
      error: error.message
    });
  }
}

exports.retrieveAllBooks = (req, res) => {
  Book.findAll()
    .then(bookInfos => {
      res.status(200).json({
        message: "¡Se obtuvieron todos los libros con éxito!",
        books: bookInfos
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
}

exports.getBookById = (req, res) => {
  let bookId = req.params.id;
  Book.findByPk(bookId)
    .then(book => {
      if (!book) {
        return res.status(404).json({
          message: "No se encontró el libro con id = " + bookId,
          error: "404"
        });
      }
      res.status(200).json({
        message: "Se obtuvo con éxito el libro con id = " + bookId,
        book: book
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
}

exports.filteringByAuthor = (req, res) => {
  let authorId = req.query.id_autor;

  Book.findAll({
    where: { id_autor: authorId }
  })
    .then(results => {
      res.status(200).json({
        message: "Se obtuvieron todos los libros del autor con id = " + authorId,
        books: results,
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
}

exports.pagination = (req, res) => {
  try {
    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || 10;

    const offset = page * limit;

    Book.findAndCountAll({ limit: limit, offset: offset })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "¡La paginación se completó! Parámetros de consulta: página = " + page + ", límite = " + limit,
          data: {
            "totalItems": data.count,
            "totalPages": totalPages,
            "limit": limit,
            "currentPageNumber": page + 1,
            "currentPageSize": data.rows.length,
            "books": data.rows
          }
        };
        res.send(response);
      });
  } catch (error) {
    res.status(500).send({
      message: "Error -> No se puede completar la solicitud de paginación.",
      error: error.message,
    });
  }
}

exports.pagingFilteringSorting = (req, res) => {
  try {
    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || 10;
    let authorId = req.query.id_autor;

    const offset = page * limit;

    Book.findAndCountAll({
      where: authorId ? { id_autor: authorId } : {},
      order: [['titulo', 'ASC']],
      limit: limit,
      offset: offset
    })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "La solicitud de paginación, filtrado y ordenación se completó. Parámetros de consulta: página = " + page + ", límite = " + limit + ", autor = " + authorId,
          data: {
            "totalItems": data.count,
            "totalPages": totalPages,
            "limit": limit,
            "author-filtering": authorId,
            "currentPageNumber": page + 1,
            "currentPageSize": data.rows.length,
            "books": data.rows
          }
        };
        res.send(response);
      });
  } catch (error) {
    res.status(500).send({
      message: "Error -> No se puede completar la solicitud de paginación.",
      error: error.message,
    });
  }
}

exports.updateById = async (req, res) => {
  try {
    let bookId = req.params.id;
    let book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({
        message: "No se encontró el libro para actualizar con id = " + bookId,
        error: "404"
      });
    }

    let updatedObject = {
      titulo: req.body.titulo,
      id_autor: req.body.id_autor,
      isbn: req.body.isbn,
      editorial: req.body.editorial,
      anio_publicacion: req.body.anio_publicacion,
      categoria: req.body.categoria,
      cantidad_disponible: req.body.cantidad_disponible,
      ubicacion: req.body.ubicacion
    };

    let result = await Book.update(updatedObject, { returning: true, where: { id_libro: bookId } });

    if (!result[0]) {
      return res.status(500).json({
        message: "Error -> No se puede actualizar el libro con id = " + req.params.id,
        error: "No se pudo actualizar",
      });
    }

    res.status(200).json({
      message: "Actualización exitosa del libro con id = " + bookId,
      book: updatedObject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el libro con id = " + req.params.id,
      error: error.message
    });
  }
}

exports.deleteById = async (req, res) => {
  try {
    let bookId = req.params.id;
    let book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({
        message: "No existe un libro con id = " + bookId,
        error: "404",
      });
    }

    await book.destroy();
    res.status(200).json({
      message: "Eliminación exitosa del libro con id = " + bookId,
      book: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el libro con id = " + req.params.id,
      error: error.message,
    });
  }
}
