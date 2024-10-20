import Slider from 'react-slick';

import AllBestRecCards from './AllBestRecCards';

import styles from './BestRecWork.module.css';
import images from '@/variables/images';

const NextArrow = (props) => {
  const { className, onClick } = props;

  return (
    <div className={`${className} ${styles.nextArrow}`} onClick={onClick}>
      {/* 원하는 화살표 디자인 */}
      <img src="/path-to-your-icon/arrow-right.svg" alt="Next" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} ${styles.prevArrow}`} onClick={onClick}>
      {/* 원하는 화살표 디자인 */}
      <img src="/path-to-your-icon/arrow-left.svg" alt="Prev" />
    </div>
  );
};

const BestRecWork = ({ list }) => {
  console.log(list);

  return (
    <div className={styles.BestRecWork}>
      <div className={styles['bestRecWork-badge']}>
        <img src={images.icons.medal} alt="bestRecWork-badge icon" />
        <span>최다 추천 번역</span>
      </div>
      {list.map((best) => (
        <AllBestRecCards key={best.id} list={best} />
      ))}
    </div>
  );
};

export default BestRecWork;
