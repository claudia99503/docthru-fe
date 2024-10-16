import React from 'react';
import styles from './ChallengeStatusBadge.module.css';

const ChallengeStatusBadge = ({ status }) => {
  let badgeText = '';
  let textColor = '';
  let backgroundColor = '';

  switch (status) {
    case 'WAITING':
      badgeText = '승인 대기 중입니다.';
      textColor = '#F2BC00';
      backgroundColor = '#FFFDE7';
      break;
    case 'ACCEPTED':
      badgeText = '신청이 승인되었습니다.';
      textColor = '#4095DE';
      backgroundColor = '#DFF0FF';
      break;
    case 'REJECTED':
      badgeText = '신청이 거절되었습니다.';
      textColor = '#E54946';
      backgroundColor = '#FFF0F0';
      break;
    case 'DELETED':
      badgeText = '삭제된 챌린지입니다.';
      textColor = '#FAFAFA';
      backgroundColor = '#737373';
      break;
  }

  return (
    <div
      className={styles.badgeContainer}
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      {badgeText}
    </div>
  );
};

export default ChallengeStatusBadge;

