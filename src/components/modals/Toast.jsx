import Svg from '../common/Svg';
import styles from './Toast.module.css';
import Button from '../common/Button';
import cn from '@/utils/clsx';
import { useEffect, useState } from 'react';

export default function Toast({ msg, onClose, onConfirm, buttonDisplay }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={cn(styles.Toast, {
        [styles.visible]: isVisible,
        [styles.hidden]: !isVisible,
      })}
    >
      <div className={styles.left}>
        <button onClick={handleClose} className={styles.close}>
          <Svg name="out" width="17px" />
        </button>
        <p className={styles.msg}>{msg}</p>
      </div>
      <Button
        variant="black"
        onClick={onConfirm}
        className={styles.confirm}
        padding="5px 18px"
      >
        {buttonDisplay}
      </Button>
    </div>
  );
}
