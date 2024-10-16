import { forwardRef } from 'react';
import styles from './AlertModal.module.css';
import { createPortal } from 'react-dom';

function AlertModal({ msg, onClose }, ref) {
  return createPortal(
    <dialog ref={ref} className={styles.AlertModal}>
      <p className={styles.msg}>{msg}</p>
      <button className={styles.btn} onClick={onClose} type="button">
        <span>확인</span>
      </button>
    </dialog>,
    document.getElementById('portal-root')
  );
}

export default forwardRef(AlertModal);
