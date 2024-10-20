import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Loader from '@/components/common/Loader';

import ChallengeDetailInfo from '../components/challenge/ChallengeDetailInfo';
import ParticipationStatus from '../components/challenge/ParticipationStatus';

import styles from '../styles/pages/Home.module.css';

import { useGetChallengeDetail } from '@/service/queries/challenge';
import { useGetWorkList } from '@/service/queries/work';
import { challengeDetail, participantsList } from '../../mockup/challenge';
import BestRecWork from '@/components/challenge/BestRecWork';

export default function ChallengeDetailPage() {
  const router = useRouter();
  const { id: challengeId } = router.query;
  const [validId, setValidId] = useState(null);

  useEffect(() => {
    if (challengeId) {
      setValidId(challengeId);
    }
  }, [challengeId]);

  const challengeData = challengeDetail;
  const worksData = participantsList;

  //추후 삭제 예정 - 해당 챌린지와 챌린지에 참여한 사람만 나타냄
  const data = challengeData[challengeId - 1];

  const bestList = worksData?.bestList.filter((item) => {
    if (item.challengeId == challengeId) return item;
  });
  const list = worksData?.list.filter((item) => {
    if (item.challengeId == challengeId) return item;
  });
  const meta = {
    current: 1,
    totalCount: list.length,
    totalPages: Math.ceil(list.length / 5),
  };

  const workList = {
    bestList: bestList,
    list: list,
    meta: meta,
  };
  // ------------------------------------------------------------------

  // const { data: challengeData, isPending, refetch: refetchChallenge, isFetching } = useGetChallengeDetail(validId, {
  //   enabled: !!validId,
  //   queryKey: ['detailedChallenge', validId],
  // });

  // const { data: worksData, isWorkPending, refetch: refetchWork } = useGetWorkList(validId, {
  //   enabled: !!validId,
  //   queryKey: ['workList', validId],
  // });

  // useEffect(() => {
  //   if (validId) {
  //     refetchChallenge();
  //     refetchWork();
  //   }
  // }, [validId, refetchChallenge, refetchWork]);

  // if ((isPending) || isWorkPending) {
  //   return <Loader />;
  // }
  // console.log('cdata', challengeData);
  // console.log('wdata', worksData);

  // 추후 util로 분리 예정
  const getPassedDeadline = (date) => {
    const today = new Date();
    const deadline = new Date(date);

    // console.log('deadline', deadline);
    // console.log('today', today);

    if (deadline <= today) {
      return false;
    } else return true;
  };
  // -----------------------------------------------

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
        <ChallengeDetailInfo list={data} />
        {!getPassedDeadline(data?.deadline) && <BestRecWork list={workList.bestList} />}
        <ParticipationStatus list={workList} />
      </div>
    </>
  );
}
