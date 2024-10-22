import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import SeveralBestRecCards from './SeveralBestRecCards';

import styles from './BestRecWork.module.css';
import images from '@/variables/images';
SwiperCore.use([Navigation]);

const BestRecWork = ({ list }) => {
  const getLastI = (i) => {
    return i == list.length - 1 ? 'last' : 'notLast';
  };

  const getPrevBtnStyles = (i) => {
    if (i == 0) {
      return { opacity: 0.3 };
    }

    if (i == list.length - 1) {
      return { left: '786px' };
    }
  };

  const getNextBtnStyles = (i) => {
    if (i == list.length - 1) {
      return { left: '836px', opacity: 0.3 };
    }
  };

  return (
    <>
      {list.length == 1 ? (
        <div className={styles.BestRecWork}>
          <SeveralBestRecCards list={list[0]} />
        </div>
      ) : (
        <Swiper
          navigation={{
            nextEl: '.next-button',
            prevEl: '.prev-button',
          }}
          autoplay={false}
          spaceBetween={-42}
          slidesPerView={1}
          loop={false}
          className={styles.BestRecWork}
        >
          {list?.map((best, i) => (
            <SwiperSlide key={i} className={styles['slide-box']}>
              <SeveralBestRecCards
                key={best.id}
                list={best}
                index={getLastI(i)}
              />
              <button
                className={`prev-button ${styles['prev-button']}`}
                style={getPrevBtnStyles(i)}
              >
                <img
                  src={images.icons.arrowWhite}
                  style={{ rotate: '180deg' }}
                  alt="icon arrow white"
                />
              </button>
              <button
                className={`next-button ${styles['next-button']}`}
                style={getNextBtnStyles(i)}
              >
                <img src={images.icons.arrowWhite} alt="icon arrow white" />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default BestRecWork;
