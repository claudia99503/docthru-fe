import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';

import { useParticipateChallenge } from '@/service/mutations/challenge';

import styles from './Container.module.css';
import Svg from '../common/Svg';

const Container = ({ list }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 743px)' });
  const router = useRouter();
  const challengeId = list.id;
  const { mutate } = useParticipateChallenge(challengeId);

  const formatDeadline = (dateTime) => {
    const date = new Date(dateTime);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return `${date.toLocaleString('ko-KR', options)} 마감`;
  };

  const getButtonStyles = (type) => {
    if (
      (list.maxParticipants === list.participations.length &&
        !list.isParticipated) ||
      list.progress
    ) {
      return type === 'style'
        ? { backgroundColor: 'var(--grey-200)', color: 'var(--grey-500)' }
        : true;
    } else {
      return type === 'style'
        ? { backgroundColor: 'var(--grey-800)', color: 'white' }
        : false;
    }
  };

  const getBtnAction = () => {
    if (!list.isParticipated) {
      handleChallenge();
      router.push(getStatus());
    } else {
      router.push(getStatus());
    }
  };

  const handleChallenge = () => {
    mutate(challengeId);
  };

  const getStatus = () => {
    return list.workId ? `/work/${list.workId}/edit` : `/work/new/${list.id}`;
  };

  const getBtnText = () => {
    return list.isParticipated
      ? list.progress
        ? '작업 도전하기'
        : '도전 계속하기'
      : '작업 도전하기';
  };

  return (
    <div className={styles.container}>
      <div className={styles['info-row']}>
        <Svg name="deadline" alt="deadline icon" className={styles.icon} />
        <span className={styles.text}>{formatDeadline(list.deadline)}</span>
        <Svg name="person" alt="person icon" className={styles.icon} />
        <span className={styles.text}>
          {list.participants}/{list.maxParticipants}
        </span>
      </div>

      {!isMobile ? (
        <>
          <div className={styles['view-original-button-row']}>
            <a className={styles['primary-button']} href={list.docUrl}>
              원문 보기
            </a>
          </div>
          <div className={styles['challenge-button-row']}>
            <button
              className={styles['gray-button']}
              style={getButtonStyles('style')}
              onClick={getBtnAction}
              disabled={getButtonStyles('action')}
            >
              {getBtnText()}
            </button>
          </div>
        </>
      ) : (
        <div className={styles['mobile-buttons-row']}>
          <a className={styles['primary-button']} href={list.docUrl}>
            원문 보기
          </a>
          <button
            className={styles['gray-button']}
            style={getButtonStyles('style')}
            onClick={() => router.push(getStatus('uri'))}
            disabled={getButtonStyles('action')}
          >
            {getBtnText()}
          </button>
        </div>
      )}
    </div>
  );
};

export default Container;
