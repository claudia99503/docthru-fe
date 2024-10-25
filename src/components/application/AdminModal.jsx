import React, { useState } from "react";
import styles from "./AdminModal.module.css";
import assets from "../../variables/images";

export default function AdminModal({ type, onClose, onSubmit }) {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    const status = type === "reject" ? "REJECTED" : "DELETED";
    const formData = {
      status: status,
      message: message,
    };

    onSubmit(formData);
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.AdminModal}>
      <div className={styles.modalContent} onClick={handleModalClick}>
        <div className={styles.modalHeader}>
          <span className={styles.title}>
            {type === "reject" ? "거절 사유" : "삭제 사유"}
          </span>
          <img
            src={assets.icons.out}
            alt="닫기"
            className={styles.closeButton}
            onClick={onClose}
          />
        </div>
        <div className={styles.modalBody}>
          <label className={styles.label}>내용</label>
          <textarea
            className={styles.textarea}
            placeholder={
              type === "reject"
                ? "거절 사유를 입력해주세요"
                : "삭제 사유를 입력해주세요"
            }
            value={message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className={styles.submitButton} onClick={handleSubmit}>
          전송
        </button>
      </div>
    </div>
  );
}

