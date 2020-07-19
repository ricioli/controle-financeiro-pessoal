import React, { useEffect, useState } from 'react';
import * as api from './api/apiServer.js';
import Spinner from './components/Spinner.js';
import TransactionsControl from './components/TransactionsControl.js';
import ModalTransaction from './components/ModalTransaction.js';
import { periods, currentPeriod } from './helpers/period.js';
import { formatNumber } from './helpers/formatHelper.js';

export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [lancamentos, setLancamentos] = useState(0);
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState(currentPeriod);
  const [prevPeriod, setPrevPeriod] = useState(currentPeriod);
  const [nextPeriod, setNextPeriod] = useState(currentPeriod);

  const getTransactions = async (period) => {
    const transactions = await api.getAllTransactions(period);
    setAllTransactions(transactions);
  };

  useEffect(() => {
    const index = periods.findIndex((period) => period.value === selectedPeriod);

    const prev = periods[index - 1] ? periods[index - 1].value : '';
    const next = periods[index + 1] ? periods[index + 1].value : '';
    
    setPrevPeriod(prev);
    setNextPeriod(next);

    getTransactions(selectedPeriod);
  }, [selectedPeriod]);

  useEffect(() => {
    const transactions = allTransactions.filter((transaction) =>
      new RegExp(filterValue, 'i').test(transaction.description)
    );

    setFilteredTransactions(transactions);
  }, [filterValue, allTransactions]);

  useEffect(() => {
    const lancamentos = filteredTransactions.length,
      receitas = filteredTransactions.reduce((acc, { type, value }) => (type === '+' ? acc + value : acc), 0),
      despesas = filteredTransactions.reduce((acc, { type, value }) => (type === '-' ? acc + value : acc), 0),
      saldo = receitas - despesas;

    setLancamentos(lancamentos);
    setReceitas(receitas);
    setDespesas(despesas);
    setSaldo(saldo);
  }, [filteredTransactions]);

  const handleDelete = async ({ _id }) => {
    const isDeleted = await api.deleteTransaction(_id);
    if (isDeleted) {
      getTransactions(selectedPeriod);
    }
  };

  const handlePersist = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setSelectedTransaction({});
    setIsModalOpen(true);
  };

  const handlePersistData = async (formData) => {
    const { _id, newValue } = formData;

    if (!_id) {
      await api.insertTransaction(newValue);
    } else {
      await api.updateTransaction(_id, newValue);
    }

    getTransactions(selectedPeriod);

    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleImputValor = (event) => {
    setFilterValue(event.target.value);
  };

  const handleSelect = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const handlePrev = () => {
    setSelectedPeriod(prevPeriod);
  };

  const handleNext = () => {
    setSelectedPeriod(nextPeriod);
  };

  return (
    <div className="container">
      <div className="center">
        <h1>Controle Financeiro Pessoal</h1>
      </div>

      <div
        className="center"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10px',
        }}
      >
        <button
          className="waves-effect waves-light btn"
          style={styles.button}
          disabled={!prevPeriod}
          onClick={handlePrev}
        >
          &lt;
        </button>

        <select
          className="browser-default"
          style={{ width: '150px', fontFamily: "'Fira Code Retina', Consolas, monospace, Arial" }}
          value={selectedPeriod}
          onChange={handleSelect}
        >
          {periods.map((period) => (
            <option key={period.value} value={period.value}>
              {period.text}
            </option>
          ))}
        </select>

        <button
          className="waves-effect waves-light btn"
          style={styles.button}
          disabled={!nextPeriod}
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px',
          margin: '10px',
          border: '1px solid lightgrey',
          borderRadius: '4px',
        }}
      >
        <span>
          <strong>
            Lançamentos:
            <span style={{ color: 'rgb(22, 160, 133)' }}> {lancamentos}</span>
          </strong>
        </span>
        <span>
          <strong>
            Receitas:
            <span style={{ color: 'rgb(22, 160, 133)' }}> {formatNumber(receitas)}</span>
          </strong>
        </span>
        <span>
          <strong>
            Despesas:
            <span style={{ color: 'rgb(192, 57, 43)' }}> -{formatNumber(despesas)}</span>
          </strong>
        </span>
        <span>
          <strong>
            Saldo:
            {saldo >= 0 ? (
              <span style={{ color: 'rgb(22, 160, 133)' }}> {formatNumber(saldo)}</span>
            ) : (
              <span style={{ color: 'rgb(192, 57, 43)' }}> {formatNumber(saldo)}</span>
            )}
          </strong>
        </span>
      </div>

      <div
        style={{
          padding: '10px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <button className="waves-effect waves-light btn" onClick={handleNew}>
          + Novo lançamento
        </button>
        <div className="input-field" style={{ marginLeft: '10px', display: 'flex', flex: '1 1 0%' }}>
          <input placeholder="Filtro" type="text" value={filterValue} onChange={handleImputValor} />
        </div>
      </div>

      {allTransactions.length ? (
        <TransactionsControl transactions={filteredTransactions} onDelete={handleDelete} onPersist={handlePersist} />
      ) : (
        <Spinner />
      )}

      {isModalOpen && (
        <ModalTransaction onSave={handlePersistData} onClose={handleClose} selectedTransaction={selectedTransaction} />
      )}
    </div>
  );
}

const styles = {
  button: { marginLeft: '5px', marginRight: '5px', fontWeight: 'bold' },
};
