import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import SeveralBestRecCards from './SeveralBestRecCards';

import Svg from '../common/Svg';

import styles from './BestRecWork.module.css';

SwiperCore.use([Navigation]);

const BestRecWork = ({ list }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lastSlide, setLastSlide] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width: 743px)' });
  const isTablet = useMediaQuery({
    query: '(min-width: 744px) and (max-width: 1199px)',
  });

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
          <SeveralBestRecCards list={list[0]} last={true} />
        </div>
      ) : (
        <Swiper
          navigation={{
            nextEl: '.next-button',
            prevEl: '.prev-button',
          }}
          autoplay={false}
          spaceBetween={isMobile ? -30 : isTablet ? -44 : -42}
          slidesPerView={1}
          loop={false}
          className={styles.BestRecWork}
          onSlideChange={(swiper) => {
            setCurrentSlide(swiper.activeIndex);
            if (swiper.activeIndex !== list.length - 1) {
              setLastSlide(false);
            }
          }}
          onReachEnd={() => {
            setLastSlide(true);
          }}
        >
          {list?.map((best, i) => (
            <SwiperSlide
              key={i}
              className={styles['slide-box']}
              style={{
                opacity: currentSlide === i ? 1 : 0.2,
              }}
            >
              <SeveralBestRecCards key={best.id} list={best} last={lastSlide} />
              <div
                className={`${styles['pageBtn-box']} ${
                  lastSlide ? styles.last : ''
                }`}
              >
                <button
                  className={`prev-button ${styles['prev-button']}`}
                  style={getPrevBtnStyles(i)}
                >
                  <Svg
                    name="arrowWhite"
                    style={{ rotate: '180deg' }}
                    alt="icon arrow white"
                  />
                </button>
                <button
                  className={`next-button ${styles['next-button']}`}
                  style={getNextBtnStyles(i)}
                >
                  <Svg name="arrowWhite" alt="icon arrow white" />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default BestRecWork;
