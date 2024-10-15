import React from 'react';
import ChallengeSearchBar from './ChallengeSearchBar';
import ApplicationDropdown from '../application/ApplicationDropdown';
import styles from './SearchBarWithDropdown.module.css';

const SearchBarWithDropdown = ({
  searchTerm,
  setSearchTerm,
  onOptionChange,
}) => {
  return (
    <div className={styles.SearchBarWithDropdown}>
      <ChallengeSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <ApplicationDropdown onOptionChange={onOptionChange} />
    </div>
  );
};

export default SearchBarWithDropdown;
