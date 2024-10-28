import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Profile } from '../common/Profile';
import LikeButton from '../common/LikeButton';

import styles from './ParticipationStatus.module.css';
import images from '@/variables/images';
import Message from '../common/Message';

const ParticipationStatus = ({ list, onPageChange }) => {
  const router = useRouter();

  const userList = list?.list;
  const pageList = list?.meta;

  const [currentPage, setCurrentPage] = useState(pageList?.currentPage);
  const totalPages = pageList?.totalPages;

  const msg =  `아직 참여한 도전자가 없어요,\n지금 바로 도전해보세요!`;

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  const rank = (index) => {
    const rank = index + 1 + (currentPage - 1) * 5;
    return rank < 10 ? '0' + rank : rank;
  };

  return (
    <>
      <div className={styles.ParticipationStatus}>
        {userList?.length > 0 ? (
          <>
            <div className={styles['ParticipationStatus-top']}>
              <span>참여 현황</span>
              <div className={styles.pagination}>
                <span>
                  {currentPage} / {totalPages}
                </span>
                <>
                  <button
                    onClick={() => handlePageChange('prev')}
                    disabled={currentPage === 1}
                  >
                    <img src={images.icons.arrowLeft} alt="arrowLeft icon" />
                  </button>
                  <button
                    onClick={() => handlePageChange('next')}
                    disabled={currentPage === totalPages}
                  >
                    <img src={images.icons.arrowRight} alt="arrowRight icon" />
                  </button>
                </>
              </div>
            </div>
            <div className={styles['participants-list']}>
              {userList?.map((participant, index) => (
                <div key={participant.id} className={styles['participant-row']}>
                  <div className={styles['participant-left']}>
                    {currentPage == 1 && index == 0 ? (
                      <div className={styles['first-rank']}>
                        <img
                          src={images.icons.crown}
                          alt="Crown Icon"
                          className={styles['icon-crown']}
                        />
                        <span>{rank(index)}</span>
                      </div>
                    ) : (
                      <div className={styles.rank}>{rank(index)}</div>
                    )}
                    <div className={styles['participant-info']}>
                      {participant && <Profile user={participant} />}
                    </div>
                  </div>
                  <div className={styles['participant-right']}>
                    {participant && <LikeButton data={participant} />}
                    <button
                      type="button"
                      onClick={() => router.push(`/work/${userList[index].id}`)}
                    >
                      <span>작업물 보기</span>
                      <Image
                        src={images.icons.arrowRight}
                        alt="arrow icon"
                        width={30}
                        height={30}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <Message className={styles.text} msg={msg} />
          </>
        )}
      </div>
    </>
  );
};

export default ParticipationStatus;
