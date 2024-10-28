import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useGetChallengeDetail } from '@/service/queries/challenge';
import { useGetWorkList } from '@/service/queries/work';
import {  updateChallenge } from "@/service/api/challenge";

import Head from 'next/head';
import Loader from '@/components/common/Loader';
import Container from '@/components/challenge/Container';
import KebabMenu from '@/components/common/KebabMenu';
import AdminModal from '@/components/application/AdminModal';

import ChallengeDetailInfo from '@/components/challenge/ChallengeDetailInfo';
import ParticipationStatus from '@/components/challenge/ParticipationStatus';
import BestRecWork from '@/components/challenge/BestRecWork';

import styles from '@/styles/pages/Home.module.css';

export default function ChallengeDetailPage() {
  const router = useRouter();
  const { id: challengeId } = router.query;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [validId, setValidId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState({
    page: 1,
  });

  useEffect(() => {
    if (challengeId) {
      setValidId(challengeId);
    }
  }, [challengeId]);

  const {
    data: challengeData,
    refetch: refetchChallenge,
    isPending: isChallengeLoading,
  } = useGetChallengeDetail(validId, {
    enabled: !!validId,
  });

  //오류나서 isPending으로 바꿔줬어요
  const {
    data: worksData,
    refetch: refetchWork,
    isPending: isWorkLoading,
  } = useGetWorkList(validId, selectedOption, {
    enabled: !!validId,
  });

  const handleEditClick = () => {
    router.push(`/application/${challengeId}`);
  }
  
    const handleDelete = () => {
      setModalType("delete");
      setIsModalOpen(true);
    };

    const handleModalSubmit = async (formData) => {
      try {
        await updateChallenge(challengeId, { ...formData });
        setChallenge({
          ...challengeData,
          status: formData.status,
          message: formData.message,
        });
        setReasonData({
          type: formData.status === "REJECTED" ? "reject" : "delete",
          message: formData.message,
          nickname: "독스루 운영진",
          updatedAt: new Date().toISOString(),
        });
        setIsModalOpen(false);
      } catch (error) {
        console.log(error)
        alert("처리 중 오류가 발생했습니다.");
      }
    };

  const handleOptionChange = (option) => {
    setSelectedOption((pev) => ({ ...pev, ...option }));
  };

  useEffect(() => {
    if (validId) {
      refetchChallenge();
      refetchWork();
    }
  }, [validId, refetchChallenge, refetchWork]);

  useEffect(() => {
    const option = {
      page: currentPage,
    };

    handleOptionChange(option);
  }, [currentPage]);

  if (isChallengeLoading || isWorkLoading) {
    return <Loader />;
  }

  // 추후 util로 분리 예정
  const getPassedDeadline = (date) => {
    const today = new Date();
    const deadline = new Date(date);

    if (deadline <= today) {
      return false;
    } else return true;
  };
  // -----------------------------------------------

  const workId = worksData?.list?.find(
    (work) => work.userId === challengeData.userId
  )?.id;

  const getParamId = () => {
    return workId
      ? { id: workId, new: true }
      : { id: challengeData?.id, new: false };
  };

  return (
    <>
      <Head>
        <title>챌린지 상세 페이지</title>
        <meta
          name="description"
          content="챌린지에 대한 상세 정보를 제공합니다."
        />
      </Head>
      {challengeData ? (
        <div className={styles.ChallengeDetailPage}>
          <div className={styles['info-container']}>
            <ChallengeDetailInfo list={challengeData} />{' '}
            <KebabMenu
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
            <Container list={challengeData} workBtn={getParamId()} />
          </div>
          {worksData?.bestList && !getPassedDeadline(challengeData.deadline) ? (
            <BestRecWork list={worksData.bestList} />
          ) : null}
          <ParticipationStatus list={worksData} onPageChange={setCurrentPage} />
        </div>
      ) : (
        <>챌린지 X || 권한 없음 || 경로 확인 필요</>
      )}

       {isModalOpen && (
        <AdminModal
          type={modalType}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </>
  );
}
