import Svg from '../common/Svg';
import styles from './Toast.module.css';
import Button from '../common/Button';

export default function Toast({ msg, onClose, onConfirm }) {
  return (
    <div className={styles.Toast}>
      <button onClick={onClose}>
        <Svg name="out" className={styles.close} />
      </button>
      <p className={styles.msg}>{msg}</p>
      <Button variant="black" onClick={onConfirm} className={styles.confirm} />
    </div>
  );
}
