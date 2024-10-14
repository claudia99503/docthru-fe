import React from 'react';
import styles from './ChallengeTable.module.css';

// 상태 값을 한국어로 변환하는 함수
const getStatusLabel = (status) => {
  switch (status) {
    case 'WAITING':
      return '승인 대기';
    case 'ACCEPTED':
      return '신청 승인';
    case 'REJECTED':
      return '신청 거절';
    case 'DELETED':
      return '챌린지 삭제';
    default:
      return status;
  }
};

// 날짜를 'YY/MM/DD' 형식으로 변환하는 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(2); // 연도 마지막 두 자리
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월 (1부터 시작)
  const day = date.getDate().toString().padStart(2, '0'); // 일
  return `${year}/${month}/${day}`;
};

const ChallengeTable = ({ data }) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <div className={styles.no}>No.</div>
        <div className={styles.field}>분야</div>
        <div className={styles.category}>카테고리</div>
        <div className={styles.title}>챌린지 제목</div>
        <div className={styles.participants}>모집 인원</div>
        <div className={styles.applicationDate}>신청일</div>
        <div className={styles.deadline}>마감 기한</div>
        <div className={styles.status}>상태</div>
      </div>

      {data.map((item) => (
        <div key={item.id} className={styles.row}>
          <div className={styles.no}>{item.id}</div>
          <div className={styles.field}>{item.docType === 'OFFICIAL' ? '공식문서' : '블로그'}</div>
          <div className={styles.category}>{item.field}</div>
          <div className={styles.title}>{item.title}</div>
          <div className={styles.participants}>{item.participates}</div>
          <div className={styles.applicationDate}>{formatDate(item.applicationDate)}</div>
          <div className={styles.deadline}>{formatDate(item.deadline)}</div>
          <div className={styles.status}>{getStatusLabel(item.status)}</div>
        </div>
      ))}
    </div>
  );
};

export default ChallengeTable;

