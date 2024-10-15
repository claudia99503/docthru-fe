import React from 'react';
import styles from './ChallengeTable.module.css';
import { formatDate } from '@/utils/utilFunction';

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

const getStatusClass = (status) => {
  switch (status) {
    case 'WAITING':
      return styles.waiting;
    case 'ACCEPTED':
      return styles.accepted;
    case 'REJECTED':
      return styles.rejected;
    case 'DELETED':
      return styles.deleted;
    default:
      return '';
  }
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
        <div
          key={item.id}
          className={`${styles.row} ${
            item.status === 'DELETED' ? styles.deletedRow : ''
          }`}
        >
          <div className={styles.no}>{item.id}</div>
          <div className={styles.field}>
            {item.docType === 'OFFICIAL' ? '공식문서' : '블로그'}
          </div>
          <div className={styles.category}>{item.field}</div>
          <div className={styles.title}>{item.title}</div>
          <div className={styles.participants}>{item.participates}</div>
          <div className={styles.applicationDate}>
            {formatDate(item.applicationDate)}
          </div>
          <div className={styles.deadline}>{formatDate(item.deadline)}</div>
          <div className={`${styles.status} ${getStatusClass(item.status)}`}>
            {getStatusLabel(item.status)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengeTable;
