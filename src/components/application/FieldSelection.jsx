import React from 'react';
import styles from './FieldSelection.module.css';

const FieldSelection = ({ onOptionChange }) => {
  const options = ['Next.js', 'API', 'Career', 'Modern JS', 'Web'];

  return (
    <ul className={styles['dropdown-list']}>
      {options.map((option, index) => (
        <li
          key={index}
          className={styles['dropdown-item']}
          onClick={() => {
            console.log('선택됨:', option);
            onOptionChange(option);
          }}
        >
          {option}
        </li>
      ))}
    </ul>
  );
};

export default FieldSelection;

