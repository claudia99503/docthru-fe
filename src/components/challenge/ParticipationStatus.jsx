import { useState } from 'react';

import { Profile } from '../common/Profile';
import LikeButton from '../common/LikeButton';

import styles from './ParticipationStatus.module.css';
import images from '@/variables/images';

const ParticipationStatus = ({ list }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const bestList = list?.bestList;
  const userList = list?.list;
  const pageList = list?.meta;

  // console.log(pageList);
  // console.log(userList);

  const itemsPerPage = 5;

  const totalPages = pageList?.totalPages;

  const filteredData = userList.sort((a, b) => {
    return b.likeCount - a.likeCount;
  });

  // 현재 페이지에 맞는 유저 리스트만 가져오기
  const currentUsers = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const rank = (index) => {
    const rank = index + 1 + (currentPage - 1) * itemsPerPage;
    return rank < 10 ? '0' + rank : rank;
  };

  return (
    <>
      {filteredData.length > 0 ? (
        <div className={styles.ParticipationStatus}>
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
                  <img src={images.icons.arrowRight} alt='arrowRight icon'/>
                </button>
              </>
            </div>
          </div>
          <div>
            {currentUsers.map((participant, index) => (
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
                    <Profile user={participant} />
                  </div>
                </div>
                <div className={styles['participant-right']}>
                  <LikeButton data={participant} />
                  <button type="button">
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
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};

export default ParticipationStatus;
