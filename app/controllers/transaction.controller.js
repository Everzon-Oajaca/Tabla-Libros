const db = require('../config/db.config.js');
const Transaction = db.Transaction;

exports.create = (req, res) => {
  let transaction = {};

  try {
    transaction.date = req.body.date;
    transaction.transactionType = req.body.transactionType;
    transaction.creditTransaction = req.body.creditTransaction;
    transaction.debitTransaction = req.body.debitTransaction;

    Transaction.create(transaction).then(result => {
      res.status(200).json({
        message: "Transacción creada con éxito con id = " + result.id,
        transaction: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "¡Falló!",
      error: error.message
    });
  }
}

exports.retrieveAllTransactions = (req, res) => {
  Transaction.findAll()
    .then(transactionInfos => {
      res.status(200).json({
        message: "¡Se obtuvieron todas las transacciones con éxito!",
        transactions: transactionInfos
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

exports.getTransactionById = (req, res) => {
  let transactionId = req.params.id;
  Transaction.findByPk(transactionId)
    .then(transaction => {
      res.status(200).json({
        message: "Se obtuvo con éxito la transacción con id = " + transactionId,
        transaction: transaction
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

exports.filteringByTransactionType = (req, res) => {
  let transactionType = req.query.transactionType;

  Transaction.findAll({
    where: { transactionType: transactionType }
  })
    .then(results => {
      res.status(200).json({
        message: "Se obtuvieron todas las transacciones del tipo = " + transactionType,
        transactions: results,
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

    Transaction.findAndCountAll({ limit: limit, offset: offset })
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
            "transactions": data.rows
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
    let transactionId = req.params.id;
    let transaction = await Transaction.findByPk(transactionId);

    if (!transaction) {
      res.status(404).json({
        message: "No se encontró la transacción para actualizar con id = " + transactionId,
        transaction: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        date: req.body.date,
        transactionType: req.body.transactionType,
        creditTransaction: req.body.creditTransaction,
        debitTransaction: req.body.debitTransaction
      };
      let result = await Transaction.update(updatedObject, { returning: true, where: { id: transactionId } });

      if (!result[0]) {
        res.status(500).json({
          message: "Error -> No se puede actualizar la transacción con id = " + req.params.id,
          error: "No se pudo actualizar",
        });
      }

      res.status(200).json({
        message: "Actualización exitosa de la transacción con id = " + transactionId,
        transaction: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar la transacción con id = " + req.params.id,
      error: error.message
    });
  }
}

exports.deleteById = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).json({
        message: `No existe una transacción con id = ${transactionId}`,
        error: "404",
      });
    }

    await transaction.destroy();
    return res.status(200).json({
      message: `Eliminación exitosa de la transacción con id = ${transactionId}`,
      transaction: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error -> No se puede eliminar la transacción con id = ${req.params.id}`,
      error: error.message,
    });
  }
}
