import React from 'react';
import Action from './Action.js';

const TransactionsControll = ({ transactions, onDelete, onPersist }) => {
  const handleActionClick = (transaction, type) => {
    if (type === 'delete') {
      onDelete(transaction);
      return;
    }
    onPersist(transaction);
  };

  return (
    <div className="center" style={{ padding: '5px' }}>
      {transactions.map((transaction) => {
        const {
          _id,
          description,
          value,
          category,
          day,
          type,
          // year, month,  yearMonth, yearMonthDay
        } = transaction;

        const styleLine = {
          display: 'flex',
          flexFlow: 'row wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
          border: '1px solid transparent',
          borderRadius: '4px',
          padding: '5px',
          margin: '20px 5px 5px',
        };

        styleLine.backgroundColor = type === '+' ? 'rgb(161, 240, 220)' : 'rgb(240, 161, 168)';

        return (
          <div
            key={_id}
            style={styleLine}
          >
            <span
              style={{
                marginRight: '20px',
                fontFamily: 'Consolas, monospace',
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}
            >
              {day}
            </span>
            <div
              style={{
                display: 'flex',
                flex: '7 1 0%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{category}</span>
                <span style={{ fontSize: '1.1rem' }}>{description}</span>
              </div>
              <span style={{ textAlign: 'right', fontFamily: 'Consolas, monospace', fontSize: '1.8rem' }}>
                {value}
              </span>
            </div>
            <div
              style={{
                marginLeft: '10px',
                display: 'flex',
                flex: '1 1 0%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Action transaction={transaction} type="edit" onActionClick={handleActionClick} />
              <Action transaction={transaction} type="delete" onActionClick={handleActionClick} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionsControll;
