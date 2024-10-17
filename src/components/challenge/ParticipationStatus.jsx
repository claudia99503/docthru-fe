import { useState } from 'react';

import styles from './ParticipationStatus.module.css';
import images from '@/variables/images';

const ParticipationStatus = ({ data }) => {
  const pageList = data?.meta;
  const userList = data?.list;
  const bestList = data?.bestList;

  console.log(pageList);
  console.log(userList);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = pageList?.totalPages;

  // 현재 페이지에 맞는 유저 리스트만 가져오기
  const currentUsers = userList?.slice(
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

  return (
    <>
      {data ? (
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
                  <img src={images.icons.arrowLeft} />
                </button>
                <button
                  onClick={() => handlePageChange('next')}
                  disabled={currentPage === totalPages}
                >
                  <img src={images.icons.arrowRight} />
                </button>
              </>
            </div>
          </div>
          <div>
            {currentUsers.map((participant, index) => (
              <div key={participant.id} className={styles['participant-row']}>
                <div className={styles['participant-right']}>
                  <div className={styles.rank}>
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </div>
                  <div className={styles['participant-info']}>
                    <span>{participant.userId}</span> {/* nickname */}
                    <span>{participant.userId}</span> {/* grade */}
                  </div>
                </div>
                <div className={styles['participant-right']}>
                  <span>❤ {participant.likeCount.toLocaleString()}</span>
                  <button>
                    <span>작업물 보기</span> <img src={images.icons.arrowRight} />
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
