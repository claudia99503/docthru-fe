import { useParams } from 'next/navigation';

import Head from 'next/head';

import ChallengeDetailInfo from '../components/challenge/ChallengeDetailInfo';
import ParticipationStatus from '../components/challenge/ParticipationStatus';

import styles from '../styles/pages/Home.module.css'
import { challengeList } from '../../mockup/challenge';

export default function ChallengeDetailPage() {
  const seedData = challengeList[0].list;
  const challenges = useParams('');
  console.log(seedData);

  const detailData = seedData.filter((item) => {
    try {
      if (challenges.id == item.id) {
        return true;
      } else return item
    } catch (err) {}
  })[0];

  return (
    <>
      <Head>
        <title>챌린지 상세 페이지</title>
        <meta
          name="description"
          content="챌린지에 대한 상세 정보를 제공합니다."
        />
      </Head>
      <div className={styles.mainContainer}>
        <ChallengeDetailInfo detailData={detailData} />
        <ParticipationStatus />
      </div>
    </>
  );
}
