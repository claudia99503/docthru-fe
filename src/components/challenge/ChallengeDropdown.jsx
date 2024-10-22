import { useState } from 'react';
import styles from './ChallengeDropdown.module.css';
import images from '../../variables/images';

const ChallengeDropdown = ({ onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    const selectedOption = {
      'field': option?.field,
      'docType': option?.docType,
      'progress': option?.progress,
    }
    onOptionChange(selectedOption); // 상위 컴포넌트로 선택된 옵션 전달
    setIsOpen(false);
  };

  return (
    <div className={styles.ChallengeDropdown}>
      <button className={styles['dropdown-button']} onClick={toggleDropdown}>
        <span className={styles['selected-text']}>필터</span>
        <img
          src={images.icons.filterBlack}
          alt="Toggle Dropdown"
          className={styles.icon}
        />
      </button>
      {isOpen && (
        <ul className={styles['dropdown-list']}>
          <div className={styles['dropdown-out']}>
            <span>필터</span>
            <img
              src={images.icons.out}
              alt="out"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {[
            'NEXTJS',
            'MODERNJS',
            'API',
            'WEB',
            'CAREER',
          ].map((field, index) => (
            <li
              key={index}
              className={styles['dropdown-item']}
              onClick={() => handleOptionClick({'field': field})}
            >
              {field}
            </li>
          ))}
          {[
            'OFFICIAL',
            'BLOG',
          ].map((docType, index) => (
            <li
              key={index}
              className={styles['dropdown-item']}
              onClick={() => handleOptionClick({'docType': docType})}
            >
              {docType}
            </li>
          ))}
          {[
            'false',
            'true',
          ].map((progress, index) => (
            <li
              key={index}
              className={styles['dropdown-item']}
              onClick={() => handleOptionClick({'progress': progress})}
            >
              {progress}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChallengeDropdown;
