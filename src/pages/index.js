import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import Head from 'next/head';
import Pagination from '../components/application/Pagination';
import ChallengeSearchBarLarge from '../components/common/ChallengeSearchBarLarge';

import Card from '../components/challenge/Card';
import ChallengeDropdown from '../components/challenge/ChallengeDropdown';
import { seed } from '../../mockup/challenge';

import styles from '../styles/pages/Home.module.css';
import images from '../variables/images';

export default function Home() {
  const isMobile = useMediaQuery({ query: '(max-width: 743px)' });

  const [selectedOption, setSelectedOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const seedData = seed;

  const getMobilePage = () => {
    isMobile ? setItemsPerPage(4) : setItemsPerPage(5);
  };

  useEffect(() => {
    getMobilePage();
  }, [isMobile]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredData = seedData.filter((item) => {
    if (
      searchTerm &&
      !item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    if (selectedOption === '') {
      return true;
    }
    if (selectedOption === '승인 대기') {
      return item.status === 'WAITING';
    } else if (selectedOption === '신청 승인') {
      return item.status === 'ACCEPTED';
    } else if (selectedOption === '신청 거절') {
      return item.status === 'REJECTED';
    } else if (selectedOption === '챌린지 삭제') {
      return item.status === 'DELETED';
    }
    return true;
  })
    .sort((a, b) => {
      if (selectedOption === '신청 시간 빠른순') {
        return new Date(a.applicationDate) - new Date(b.applicationDate);
      } else if (selectedOption === '신청 시간 느린순') {
        return new Date(b.applicationDate) - new Date(a.applicationDate);
      } else if (selectedOption === '마감 기한 빠른순') {
        return new Date(a.deadline) - new Date(b.deadline);
      } else if (selectedOption === '마감 기한 느린순') {
        return new Date(b.deadline) - new Date(a.deadline);
      }
      return 0;
    });

  // 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 현재 페이지의 데이터만 추출
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Head>
        <title>챌린지 목록 페이지</title>
      </Head>
      <div>
        <div className={styles.title}>
          <span>챌린지 목록</span>
          <button
            className={styles['new-challenge-button']}
            onClick={() => router.push('/application')}
          >
            <span>신규 챌린지 신청</span>
            <img
              src={images.icons.plus}
              alt="plus Icon"
              className={styles.icon}
            />
          </button>
        </div>
        <div className={styles.SearchContainer}>
          <ChallengeDropdown onOptionChange={handleOptionChange} />
          <ChallengeSearchBarLarge
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <div className={styles.challengeTableWrapper}>
          {paginatedData.length > 0 ? (
            <>
              <div className={styles.AllCardSection}>
                {paginatedData.map((paginatedData) => (
                  <Card
                    key={`${paginatedData.id}`}
                    data={paginatedData}
                    site={'ongoing'}
                  />
                ))}
              </div>
              <div className={styles.paginationWrapper}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages} // 계산된 totalPages 사용
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className={styles.noChallenges}>아직 챌린지가 없어요.</div>
          )}
        </div>
      </div>
    </>
  );
}
