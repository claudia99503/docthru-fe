import React from 'react';
import ChallengeSearchbar from './ChallengeSearchbar';
import ApplicationDropdown from './ApplicationDropdown';
import styles from './SearchbarWithDropdown.module.css';

const SearchbarWithDropdown = ({ searchTerm, setSearchTerm, onOptionChange }) => {
  return (
    <div className={styles.SearchbarWithDropdown}>
      <ChallengeSearchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ApplicationDropdown onOptionChange={onOptionChange} />
    </div>
  );
};

export default SearchbarWithDropdown;

