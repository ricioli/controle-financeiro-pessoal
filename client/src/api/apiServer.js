import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transaction';

const getAllTransactions = async (period) => {
  const res = await axios.get(`${API_URL}?period=${period}`);
  return res.data.transactions;
};

const insertTransaction = async (transaction) => {
  const res = await axios.post(API_URL, transaction);
  return res.data;
};

const updateTransaction = async (id, transaction) => {
  const res = await axios.put(`${API_URL}/${id}`, transaction);
  return res.data;
};

const deleteTransaction = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export {
  getAllTransactions,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
};
