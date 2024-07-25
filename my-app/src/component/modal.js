// components/Modal.js
import styles from './Modal.module.css';

const Modal = ({ message, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Success!</h2>
        <p className={styles.modalMessage}>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Modal;
