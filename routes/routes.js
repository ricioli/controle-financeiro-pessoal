const express = require('express');
const transactionRouter = express.Router();
const Transaction = require('../services/transactionService.js');

transactionRouter.get('/', Transaction.findAll);
transactionRouter.get('/:id', Transaction.findOne);
transactionRouter.put('/:id', Transaction.update);
transactionRouter.delete('/:id', Transaction.remove);
transactionRouter.post('/', Transaction.create);

module.exports = transactionRouter;
