import { forwardRef } from 'react';
import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';
import Button from '../common/Button';
import Image from 'next/image';
import assets from '@/variables/images';

function TwoBtnModal(
  { msg, onCancel, onConfirm, btnOne = '아니요', btnTwo = '네' },
  ref
) {
  return createPortal(
    <dialog ref={ref} className={styles.DeleteModal}>
      <Image
        src={assets.icons.check}
        width={24}
        height={24}
        className={styles.check}
      />
      <p className={styles['modal-msg']}>{msg}</p>
      <div className={styles.buttons}>
        <Button
          variant="black-border"
          className={styles.cancel}
          onClick={onCancel}
          type="button"
          padding="10px 0"
          width="90px"
        >
          <span>{btnOne}</span>
        </Button>
        <Button
          variant="black"
          className={styles.delete}
          onClick={onConfirm}
          type="button"
          padding="10px 0"
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
