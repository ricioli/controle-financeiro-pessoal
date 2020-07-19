import React from 'react';

const Action = ({ transaction, type, onActionClick }) => {
  const handleIconClick = () => {
    onActionClick(transaction, type);
  };

  return (
    <i
      className="material-icons"
      onClick={handleIconClick}
      style={{ fontSize: "1.2rem", cursor: "pointer", marginRight: "10px" }}
    >
      {type}
    </i>
  );
};

export default Action;
