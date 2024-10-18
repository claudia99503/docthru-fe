import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/pages/application/EditApplicationPage.module.css';

export default function EditApplicationPage() {
  const [selectedDate, setSelectedDate] = useState('');

  // 날짜 변경
  const handleDateChange = (e) => {
    const date = e.target.value;
    const formattedDate = new Date(date).toISOString().slice(0, 10).replace(/-/g, '/');
    setSelectedDate(formattedDate);
  };

  return (
    <>
      <Head>
        <title>챌린지 수정하기</title>
        <meta name="description" content="챌린지를 수정하는 페이지입니다." />
      </Head>
      <div className={styles.EditApplicationPage}>
        <h1 className={styles['application-title']}>챌린지 수정하기</h1>
        <form className={styles.form}>
          <label className={styles.label}>제목</label>
          <div className={styles['input-wrapper']}>
            <input
              type="text"
              name="applicationTitle"
              placeholder="제목을 입력해주세요"
              className={styles.input}
            />
          </div>

          <label className={styles.label}>원문 링크</label>
          <div className={styles['input-wrapper']}>
            <input
              type="text"
              name="docUrl"
              placeholder="원문 링크를 입력해주세요"
              className={styles.input}
            />
          </div>

          <label className={styles.label}>분야</label>
          <div className={styles['input-wrapper']}>
            <input
              type="text"
              name="field"
              placeholder="카테고리"
              className={styles['select-input']}
            />
            <img src="/assets/icons/ic_down.svg" className={styles.icon} />
          </div>

          <label className={styles.label}>문서타입</label>
          <div className={styles['input-wrapper']}>
            <input
              type="text"
              name="docType"
              placeholder="카테고리"
              className={styles['select-input']}
            />
            <img src="/assets/icons/ic_down.svg" className={styles.icon} />
          </div>

          <label className={styles.label}>마감일</label>
          <div className={styles['input-wrapper']}>
            <input
              type="text"
              name="deadline"
              placeholder="YYYY/MM/DD"
              className={styles.input}
              value={selectedDate}
              readOnly
            />
            <input
              type="date"
              className={styles.dateInput}
              onChange={handleDateChange}
            />
            <img
              src="/assets/icons/ic_calender.svg"
              className={styles.icon}
              onClick={() => document.querySelector(`.${styles.dateInput}`).showPicker()} // 클릭 시 달력 열기
            />
          </div>

          <label className={styles.label}>최대인원</label>
          <div className={styles['input-wrapper']}>
            <input
              type="text"
              name="maxParticipants"
              placeholder="인원을 입력해주세요"
              className={styles.input}
            />
          </div>

          <label className={styles.label}>내용</label>
          <textarea
            name="description"
            placeholder="내용을 입력해주세요"
            className={styles.textarea}
          ></textarea>

          <button className={styles['submit-button']}>수정하기</button>
        </form>
      </div>
    </>
  );
}

