import { useState } from 'react';
import styles from './ChallengeDropdown.module.css';
import images from '../../variables/images';

const ChallengeDropdown = ({ onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('필터');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedDocType, setSelectedDocType] = useState(null);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const handleFilterClick = (index) => {
    setSelectedFilters((prev) => {
      const newFilters = [...prev];
      newFilters[index] = !newFilters[index];
      return newFilters;
    });
  };

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

  const applyHandler = () => {
    const appliedFilters = filter.filter((_, index) => selectedFilters[index]);
    const data = {
      filter: appliedFilters,
      docType: selectedDocType,
      progress: selectedProgress,
    };

    if (docType[selectedDocType] === '공식문서') {
      // console.log('OFFICIAL');
      data.docType = 'OFFICIAL';
    } else if (docType[selectedDocType] === '블로그') {
      // console.log('BLOG');
      data.docType = 'BLOG';
    }
    if (progress[selectedProgress] === '진행중') {
      // console.log('true');
      data.progress = true;
    } else if (progress[selectedProgress] === '마감') {
      // console.log('false');
      data.progress = false;
    }
    // console.log(docType[selectedDocType]);
    // console.log(appliedFilters);
    // console.log(progress[selectedProgress]);
    console.log(data);
  };
  const handleDocTypeClick = (index) => {
    setSelectedDocType(index);
  };
  const handleProgressClick = (index) => {
    setSelectedProgress(index);
  };

  const resetHandler = () => {
    setSelectedFilters([]);
    setSelectedDocType(null);
    setSelectedProgress(null);
  };

  const filter = ['NEXTJS', 'MODERNJS', 'API', 'WEB', 'CAREER'];
  const docType = ['공식문서', '블로그'];
  const progress = ['진행중', '마감'];

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
        <div className={styles['dropdown-list']}>
          <div className={styles['dropdown-out']}>
            <span>필터</span>
            <img
              src={images.icons.out}
              alt="out"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className={styles['dropdown-category']}>
            <span className={styles['dropdown-title']}>분야</span>
            <ul className={styles['dropdown-gap']}>
              {filter.map((filter, index) => (
                <li
                  className={styles['dropdown-checkbox']}
                  key={index}
                  onClick={() => handleFilterClick(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={
                      selectedFilters[index]
                        ? images.icons.checkboxIn
                        : images.icons.checkboxOut
                    }
                    alt={selectedFilters[index] ? 'Checked' : 'Unchecked'}
                    className={styles['checkbox-icon']}
                  />
                  {filter}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles['dropdown-category']}>
            <span className={styles['dropdown-title']}>문서 타입</span>
            <ul className={styles['dropdown-gap']}>
              {docType.map((docType, index) => (
                <li
                  className={styles['dropdown-radio']}
                  key={index}
                  onClick={() => handleDocTypeClick(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={
                      selectedDocType === index
                        ? images.icons.radioIn
                        : images.icons.radioOut
                    }
                    alt={selectedDocType === index ? 'Selected' : 'Unselected'}
                    className={styles['radio-icon']}
                  />
                  {docType}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles['dropdown-category']}>
            <span className={styles['dropdown-title']}>상태</span>
            <ul className={styles['dropdown-gap']}>
              {progress.map((progress, index) => (
                <li
                  className={styles['dropdown-radio']}
                  key={index}
                  onClick={() => handleProgressClick(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={
                      selectedProgress === index
                        ? images.icons.radioIn
                        : images.icons.radioOut
                    }
                    alt={selectedProgress === index ? 'Selected' : 'Unselected'}
                    className={styles['radio-icon']}
                  />
                  {progress}
                </li>
              ))}
            </ul>
            <div className={styles['dropdown-buttons']}>
              <button className={styles['reset-button']} onClick={resetHandler}>
                초기화
              </button>
              <button className={styles['apply-button']} onClick={applyHandler}>
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeDropdown;
