import React from "react";
import styles from "./DeleteModal.module.css";

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.Component}>
      <div className={styles.modal}>
        <div className={styles["top-box"]}>
          <div className={styles["icon-wrapper"]}>
            <img src="/assets/images/img_black.svg" alt="Warning" className={styles["black-icon"]} />
            <img src="/assets/images/img_check.svg" alt="Check" className={styles["check-icon"]} />
          </div>
          <p className={styles.message}>정말 삭제하시겠어요?</p>
        </div>
        <div className={styles["bottom-box"]}>
          <button className={styles["cancel-button"]} onClick={onCancel}>
            아니오
          </button>
          <button className={styles["confirm-button"]} onClick={onConfirm}>
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

