import React from 'react';
import ChallengeSearchbar from './ChallengeSearchbar';
import AplicationDropdown from './AplicationDropdown';
import styles from './SearchbarWithDropdown.module.css';

const SearchbarWithDropdown = ({ searchTerm, setSearchTerm, onOptionChange }) => {
  return (
    <div className={styles.SearchbarWithDropdown}>
      <ChallengeSearchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AplicationDropdown onOptionChange={onOptionChange} />
    </div>
  );
};

export default SearchbarWithDropdown;

