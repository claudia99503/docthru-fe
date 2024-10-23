import React from 'react';
import styles from './DocTypeSelection.module.css';

const DocTypeSelection = ({ onOptionChange }) => {
  const options = ['공식 문서', '블로그'];

  return (
    <ul className={styles['dropdown-list']}>
      {options.map((option, index) => (
        <li
          key={index}
          className={styles['dropdown-item']}
          onClick={() => onOptionChange(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  );
};

export default DocTypeSelection;

