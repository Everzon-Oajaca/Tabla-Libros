const express = require('express');
const router = express.Router();
const products = require('../controllers/product.controller.js'); // Asegúrate de que el nombre del controlador coincida

// Crear un producto
router.post('/api/products/create', products.create);

// Obtener todos los productos
router.get('/api/products/all', products.retrieveAllProducts);

// Obtener un producto por su ID
router.get('/api/products/onebyid/:id', products.getProductById);

// Filtrar productos por categoría
router.get('/api/products/filteringbycategory', products.filteringByCategory);

// Paginación de productos
router.get('/api/products/pagination', products.pagination);

// Paginación, filtrado y ordenación de productos
router.get('/api/products/pagefiltersort', products.pagingFilteringSorting);

// Actualizar un producto por su ID
router.put('/api/products/update/:id', products.updateById);

// Eliminar un producto por su ID
router.delete('/api/products/delete/:id', products.deleteById);

module.exports = router;
