import { useState } from 'react';
import styles from './ApplicationDropdown.module.css';
import images from '../../variables/images';

const AplicationDropdown = ({ onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('승인 대기');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onOptionChange(option); // 상위 컴포넌트로 선택된 옵션 전달
    setIsOpen(false);
  };

  return (
    <div className={styles.ApplicationDropdown}>
      <button className={styles['dropdown-button']} onClick={toggleDropdown}>
        <span className={styles['selected-text']}>{selectedOption}</span>
        <img
          src={isOpen ? images.icons.toggleUp : images.icons.toggleDown}
          alt="Toggle Dropdown"
          className={styles.icon}
        />
      </button>
      {isOpen && (
        <ul className={styles['dropdown-list']}>
          {['승인 대기', '신청 승인', '신청 거절', '신청 시간 빠른순', '신청 시간 느린순', '마감 기한 빠른순', '마감 기한 느린순'].map((option, index) => (
            <li key={index} className={styles['dropdown-item']} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AplicationDropdown;

