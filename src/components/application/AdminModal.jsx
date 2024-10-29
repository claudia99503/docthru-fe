import React, { useState } from "react";
import styles from "./AdminModal.module.css";
import assets from "../../variables/images";
import { useAlertModal } from "../../hooks/useModal";
import Image from "next/image";

export default function AdminModal({ type, onClose, onSubmit }) {
  const [message, setMessage] = useState("");
  const { onModalOpen } = useAlertModal();

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

    onModalOpen({
      msg:
        status === "REJECTED"
          ? "챌린지가 거절되었습니다"
          : "챌린지가 삭제되었습니다",
    });
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.AdminModal}>
      <div className={styles["modal-content"]} onClick={handleModalClick}>
        <div className={styles["modal-header"]}>
          <span className={styles.title}>
            {type === "reject" ? "거절 사유" : "삭제 사유"}
          </span>
          <Image
            src={assets.icons.out}
            alt="닫기"
            className={styles["close-button"]}
            onClick={onClose}
            width={24}
            height={24}
          />
        </div>
        <div className={styles["modal-body"]}>
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
        <button className={styles["submit-button"]} onClick={handleSubmit}>
          전송
        </button>
      </div>
    </div>
  );
}

