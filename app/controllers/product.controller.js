const db = require('../config/db.config.js');
const Product = db.Product;

exports.create = (req, res) => {
  let product = {};

  try {
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.category = req.body.category;
    product.stock = req.body.stock;

    Product.create(product).then(result => {
      res.status(200).json({
        message: "Producto creado con éxito con id = " + result.id,
        product: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "¡Falló!",
      error: error.message
    });
  }
}

exports.retrieveAllProducts = (req, res) => {
  Product.findAll()
    .then(productInfos => {
      res.status(200).json({
        message: "¡Se obtuvieron todos los productos con éxito!",
        products: productInfos
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

exports.getProductById = (req, res) => {
  let productId = req.params.id;
  Product.findByPk(productId)
    .then(product => {
      res.status(200).json({
        message: "Se obtuvo con éxito el producto con id = " + productId,
        product: product
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

exports.filteringByCategory = (req, res) => {
  let category = req.query.category;

  Product.findAll({
    attributes: ['id', 'name', 'description', 'price', 'category', 'stock'],
    where: { category: category }
  })
    .then(results => {
      res.status(200).json({
        message: "Se obtuvieron todos los productos de la categoría = " + category,
        products: results,
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

    Product.findAndCountAll({ limit: limit, offset: offset })
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
            "products": data.rows
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
    let category = req.query.category;

    const offset = page * limit;

    Product.findAndCountAll({
      attributes: ['id', 'name', 'description', 'price', 'category', 'stock'],
      where: category ? { category: category } : {},
      order: [['name', 'ASC']],
      limit: limit,
      offset: offset
    })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "La solicitud de paginación, filtrado y ordenación se completó. Parámetros de consulta: página = " + page + ", límite = " + limit + ", categoría = " + category,
          data: {
            "totalItems": data.count,
            "totalPages": totalPages,
            "limit": limit,
            "category-filtering": category,
            "currentPageNumber": page + 1,
            "currentPageSize": data.rows.length,
            "products": data.rows
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
    let productId = req.params.id;
    let product = await Product.findByPk(productId);

    if (!product) {
      res.status(404).json({
        message: "No se encontró el producto para actualizar con id = " + productId,
        product: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock
      }
      let result = await Product.update(updatedObject, { returning: true, where: { id: productId } });

      if (!result[0]) {
        res.status(500).json({
          message: "Error -> No se puede actualizar el producto con id = " + req.params.id,
          error: "No se pudo actualizar",
        });
      }

      res.status(200).json({
        message: "Actualización exitosa del producto con id = " + productId,
        product: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el producto con id = " + req.params.id,
      error: error.message
    });
  }
}

exports.deleteById = async (req, res) => {
  try {
    let productId = req.params.id;
    let product = await Product.findByPk(productId);

    if (!product) {
      res.status(404).json({
        message: "No existe un producto con id = " + productId,
        error: "404",
      });
    } else {
      await product.destroy();
      res.status(200).json({
        message: "Eliminación exitosa del producto con id = " + productId,
        product: product,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el producto con id = " + req.params.id,
      error: error.message,
    });
  }
}
