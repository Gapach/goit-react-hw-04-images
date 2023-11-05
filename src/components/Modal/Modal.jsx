import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ onClose, largeImage }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  
  const handleClickBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleClickBackdrop}>
      <div className="Modal">
        <img src={largeImage} alt="img" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};

export default Modal;
