const express = require('express');
const router = express.Router();
const transactions = require('../controllers/transaction.controller.js'); // Asegúrate de que el nombre del controlador coincida

// Crear una transacción
router.post('/api/transactions/create', transactions.create);

// Obtener todas las transacciones
router.get('/api/transactions/all', transactions.retrieveAllTransactions);

// Obtener una transacción por su ID
router.get('/api/transactions/onebyid/:id', transactions.getTransactionById);

// Paginación de transacciones
router.get('/api/transactions/pagination', transactions.pagination);

// Actualizar una transacción por su ID
router.put('/api/transactions/update/:id', transactions.updateById);

// Eliminar una transacción por su ID
router.delete('/api/transactions/delete/:id', transactions.deleteById);

module.exports = router;
