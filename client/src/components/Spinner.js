import React from 'react';

const Spinner = () => {
  return (
    <div style={styles.flexRow}>
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <span>Aguarde...</span>
    </div>
  );
};

const styles = {
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Spinner;
