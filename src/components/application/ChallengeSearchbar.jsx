import React from 'react';
import styles from './ChallengeSearchbar.module.css';
import images from '../../variables/images';

const ChallengeSearchbar = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // 검색어 업데이트
  };

  return (
    <div className={styles.ChallengeSearchbar}>
      <img src={images.icons.search} alt="Search Icon" className={styles.icon} />
      <input
        type="text"
        className={styles.input}
        placeholder="챌린지 이름을 검색해보세요"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ChallengeSearchbar;

