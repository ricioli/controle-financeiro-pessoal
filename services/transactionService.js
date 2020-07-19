const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

// const logger = require( '../config/logger.js');
const logger = console;

class Transaction {
  static create = async (req, res) => {
    try {
      const transaction = new TransactionModel(req.body);
      const data = await transaction.save(transaction);

      res.json(data);
      logger.info(`POST /transaction - ${JSON.stringify()}`);
    } catch (error) {
      res.status(500).json({ message: error.message || 'Algum erro ocorreu ao salvar' });
      logger.error(`POST /transaction - ${JSON.stringify(error.message)}`);
    }
  };

  static findAll = async (req, res) => {
    const { period, description } = req.query;

    if (!period)
      return res.json({
        error: 'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
      });

    const condition = { yearMonth: period };

    if (typeof description) {
      condition.description = { $regex: new RegExp(description), $options: 'i' };
    }

    try {
      const data = await TransactionModel.find(condition).sort({day: 1});

      res.json({transactions: data});
      logger.info(`GET /transaction`);
    } catch (error) {
      res.status(500).json({ message: error.message || 'Erro ao listar todos os documentos' });
      logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
    }
  };

  static findOne = async (req, res) => {
    const id = req.params.id;

    try {
      const data = await TransactionModel.findById({ _id: id });

      res.json(data);
      logger.info(`GET /transaction - ${id}`);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar o transaction id: ' + id });
      logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
    }
  };

  static update = async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        message: 'Dados para atualizacao vazio',
      });
    }

    const id = req.params.id;

    try {
      const data = await TransactionModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });

      if (!data) {
        return res.json({ message: `Transação id ${id} nao encontrado` });
      } else {
        res.json(data);
      }

      logger.info(`PUT /transaction - ${id} - ${JSON.stringify(req.body)}`);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar a transação id: ' + id });
      logger.error(`PUT /transaction - ${JSON.stringify(error.message)}`);
    }
  };

  static remove = async (req, res) => {
    const id = req.params.id;

    try {
      const data = await TransactionModel.findByIdAndRemove({ _id: id });

      if (!data) {
        return res.json({ message: `Transação id ${id} nao encontrado` });
      } else {
        res.json({ message: 'Transaction excluido com sucesso' });
      }

      logger.info(`DELETE /transaction - ${id}`);
    } catch (error) {
      res.status(500).json({ message: 'Nao foi possivel deletar o transaction id: ' + id });
      logger.error(`DELETE /transaction - ${JSON.stringify(error.message)}`);
    }
  };

  // static removeAll = async (_, res) => {
  //   try {
  //     await TransactionModel.deleteMany();

  //     res.json({
  //       message: `Transações excluidos`,
  //     });
  //     logger.info(`DELETE /transaction`);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Erro ao excluir todos as transações' });
  //     logger.error(`DELETE /transaction - ${JSON.stringify(error.message)}`);
  //   }
  // };
}

module.exports = Transaction;
