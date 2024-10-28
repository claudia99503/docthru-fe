import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';

import { useGiveUpChallenge } from '@/service/mutations/challenge';

import assets from '@/variables/images';

import styles from './Container.module.css';

const Container = ({ list, workBtn }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 743px)' });
  const router = useRouter();
  const { mutate } = useGiveUpChallenge({});

  const formatDeadline = (dateTime) => {
    const date = new Date(dateTime);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return `${date.toLocaleString('ko-KR', options)} 마감`;
  };

  const getButtonStyles = (type) => {
    if (type === 'style') {
      return !list.progress
        ? { backgroundColor: '#262626', color: '#FFFFFF' }
        : { backgroundColor: '#E5E5E5', color: '#737373' };
    } else if (type === 'action') {
      return !list.progress ? false : true;
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
    mutate({ id: list.id, isParticipate: true });
  };

  const getStatus = () => {
    return workBtn.new ? `/work/${workBtn.id}/edit` : `/work/new/${workBtn.id}`;
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
        <img
          src={assets.icons.deadline}
          alt="deadline icon"
          className={styles.icon}
        />
        <span className={styles.text}>{formatDeadline(list.deadline)}</span>
        <img
          src={assets.icons.person}
          alt="person icon"
          className={styles.icon}
        />
        <span className={styles.text}>
          {list.participants}/{list.maxParticipants}
        </span>
      </div>

      {!isMobile ? (
        <>
          <div className={styles['view-original-button-row']}>
            <a className={styles['primary-button']}>원문 보기</a>
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
          <a className={styles['primary-button']}>원문 보기</a>
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
