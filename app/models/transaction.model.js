module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('transaction', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      date: {
        type: Sequelize.DATE, // Fecha de la transacción, requerido
        allowNull: false, // Debe ser true para permitir nulos
      },
      transactionType: {
        type: Sequelize.STRING, // Tipo de transacción, opcional
        allowNull: true
      },
      creditTransaction: {
        type: Sequelize.INTEGER, // Transacción crédito, requerido
        allowNull: false
      },
      debitTransaction: {
        type: Sequelize.INTEGER, // Transacción débito, requerido
        allowNull: false
      }
    });
  
    return Transaction;
  };
  

  