import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { currentDate } from '../helpers/period.js';

Modal.setAppElement('#root');

const ModalTransaction = ({ onSave, onClose, selectedTransaction }) => {
  let { _id } = selectedTransaction;
  let typeIsReadOnly = false;

  if (!_id) {
    selectedTransaction = {
      description: '',
      value: '',
      category: '',
      type: '',
      yearMonthDay: '',
    };
  } else {
    typeIsReadOnly = true;
  }

  const date = selectedTransaction.yearMonthDay || currentDate;

  const [description, setDescription] = useState(selectedTransaction.description);
  const [value, setValue] = useState(selectedTransaction.value);
  const [category, setCategory] = useState(selectedTransaction.category);
  const [type, setType] = useState(selectedTransaction.type);
  const [yearMonthDay, setYearMonthDay] = useState(date);

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleValue = (event) => {
    setValue(event.target.value);
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleType = (event) => {
    if (typeIsReadOnly) return;
    setType(event.target.value);
  };
  const handleYearMonthDay = (event) => {
    setYearMonthDay(event.target.value);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      _id,
      newValue: {
        description,
        value,
        category,
        yearMonthDay,
        type,
        day: yearMonthDay.slice(-2),
        year: yearMonthDay.slice(0, 4),
        month: yearMonthDay.slice(5, 7),
        yearMonth: yearMonthDay.slice(0, 7),
      },
    };

    onSave(formData);
  };

  const handleModalClose = () => {
    onClose();
  };

  return (
    <div>
      <Modal isOpen={true} style={{ overlay: { zIndex: 10 } }}>
        <div style={styles.row}>
          <h3 style={{ marginRight: '10px', fontWeight: 'bold' }}>Edição de lançamento</h3>
          <button className="waves-effect waves-light btn red darken-4" onClick={handleModalClose}>
            X
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div style={{ border: '1px solid lightgrey', borderRadius: '4px', padding: '10px', marginBottom: '10px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '30px',
              }}
            >
              <label style={{ marginRight: '10px', marginLeft: '10px', padding: '20px' }}>
                <input
                  name="expense-earning"
                  type="radio"
                  disabled=""
                  value="-"
                  checked={type === '-'}
                  onChange={handleType}
                />
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Despesa</span>
              </label>
              <label style={{ marginRight: '10px', marginLeft: '10px', padding: '20px' }}>
                <input
                  name="expense-earning"
                  type="radio"
                  disabled=""
                  value="+"
                  checked={type === '+'}
                  onChange={handleType}
                />
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Receita</span>
              </label>
            </div>
            <div className="input-field ">
              <input id="inputDescription" type="text" required="" value={description} onChange={handleDescription} />
              <label htmlFor="inputDescription" className="active">
                Descrição:
              </label>
            </div>
            <div className="input-field ">
              <input id="inputCategory" type="text" required="" value={category} onChange={handleCategory} />
              <label htmlFor="inputCategory" className="active">
                Categoria:
              </label>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div className="input-field" style={{ marginRight: '10px' }}>
                <input
                  id="inputValue"
                  type="number"
                  min="0"
                  step="0.01"
                  required=""
                  value={value}
                  onChange={handleValue}
                />
                <label htmlFor="inputValue" className="active">
                  Valor:
                </label>
              </div>
              <input
                placeholder="Data"
                type="date"
                className="browser-default"
                required=""
                value={yearMonthDay}
                onChange={handleYearMonthDay}
              />
            </div>
          </div>
          <button type="submit" className="waves-effect waves-light btn">Salvar</button>
        </form>
      </Modal>
    </div>
  );
};

const styles = {
  row: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
};

export default ModalTransaction;
