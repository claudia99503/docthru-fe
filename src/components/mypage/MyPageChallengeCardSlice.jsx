import { useRouter } from 'next/router';
import DocTypeChip from '../common/DocTypeChip';
import images from '../../variables/images';

import styles from './MyPageCardSlice.module.css';
import { useEffect, useState } from 'react';

const MyPageCardSlice = ({ data, site }) => {
  const [myData, setMyData] = useState(data);

  useEffect(() => {
    if (site !== 'home' && myData?.challenge) {
      setMyData(myData.challenge);
    }
  }, [site, myData]);

  const getCondition = () => {
    // const today = new Date();
    // const deadline = new Date(myData.deadline);

    // if (today >= deadline || myData.progress) {
    if (myData.progress) {
      return (
        <div
          className={styles['condition-chip']}
          style={{ backgroundColor: '#262626', color: '#FFFFFF' }}
        >
          <img src={images.icons.deadline} alt='deadline icon' />
          <span>챌린지가 마감되었어요</span>
        </div>
      );
    } else if (
      myData.participants === myData.maxParticipants &&
      !myData.progress
    ) {
      return (
        <div
          className={styles['condition-chip']}
          style={{ backgroundColor: '#E5E5E5' }}
        >
          <img src={images.icons.personWhite} alt='deadline icon' />
          <span>모집이 완료된 상태에요</span>
        </div>
      );
    }
  };

  const formatDeadline = (dateTime) => {
    const date = new Date(dateTime);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return `${date.toLocaleString('ko-KR', options)} 마감`;
  };

  const router = useRouter();

  const handleTabClick = (path) => {
    router.push(path);
  };

  const isAdmin = false;

  return (
    <div className={styles.Card}>
      <div className={styles['card-top']}>
        {getCondition()}
        <div
          className={styles['challenge-title']}
          onClick={() => handleTabClick(`/${data.id}`)}
        >
          {data.title}{' '}
        </div>
        <DocTypeChip field={data.field} docType={data.docType} />
      </div>
      <div className={styles['card-bottom']}>
        <div style={{ display: 'flex' }}>
          <img
            src={images.icons.deadline}
            alt='deadline icon'
            className={styles.icon}
          />
          <span className={styles.text}>{formatDeadline(data.deadline)}</span>
        </div>
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <img
            src={images.icons.person}
            alt='person icon'
            className={styles.icon}
          />
          <span className={styles.text}>
            {data.participants}/{data.maxParticipants} 참여중
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyPageCardSlice;
