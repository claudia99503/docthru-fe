import { forwardRef } from 'react';
import styles from './TwoBtnModal.module.css';
import { createPortal } from 'react-dom';
import Button from '../common/Button';
import Svg from '../common/Svg';

function TwoBtnModal(
  {
    msg = '정말 삭제하시겠어요?',
    onCancel,
    onConfirm,
    btnOne = '아니요',
    btnTwo = '네',
  },
  ref
) {
  return createPortal(
    <dialog ref={ref} className={styles.TwoBtnModal}>
      <div className={styles.check}>
        <Svg name="checkCircle" />
        <p className={styles['modal-msg']}>{msg}</p>
      </div>
      <div className={styles.buttons}>
        <Button
          variant="white-border"
          className={styles.cancel}
          onClick={onCancel}
          s
          type="button"
          padding="8px 0"
          width="90px"
        >
          <span>{btnOne}</span>
        </Button>
        <Button
          variant="black"
          className={styles.delete}
          onClick={onConfirm}
          type="button"
          padding="8px 0"
          width="90px"
        >
          <span>{btnTwo}</span>
        </Button>
      </div>
    </dialog>,
    document.getElementById('portal-root')
  );
}

export default forwardRef(TwoBtnModal);
