import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import ChallengeStatusBadge from "../../../components/application/ChallengeStatusBadge";
import DocTypeChip from "../../../components/common/DocTypeChip";
import InfoContainer from "../../../components/challenge/InfoContainer";
import KebabMenu from "../../../components/common/KebabMenu";
import AdminModal from "../../../components/application/AdminModal";
import ReasonBox from "../../../components/application/ReasonBox";
import { getChallenge, updateChallenge } from "../../../service/api/challenge";
import { useGetWorkList } from "@/service/queries/work";
import Loader from "../../../components/common/Loader";
import BestRecWork from "../../../components/challenge/BestRecWork";
import styles from "../../../styles/pages/application/AdminApplicationDetailPage.module.css";
import assets from "@/variables/images";
import { useAlertModal } from "../../../hooks/useModal";
import Image from "next/image";

export default function AdminApplicationDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [reasonData, setReasonData] = useState(null);
  const { Modal, onModalOpen } = useAlertModal();

  const { data: worksData } = useGetWorkList(
    id,
    { page: 1 },
    {
      enabled: !!id && challenge?.status === "ACCEPTED",
    }
  );

  useEffect(() => {
    if (id) {
      const fetchChallenge = async () => {
        try {
          setLoading(true);
          const data = await getChallenge(id);
          setChallenge(data);

          if (data.status === "REJECTED" || data.status === "DELETED") {
            setReasonData({
              type: data.status === "REJECTED" ? "reject" : "delete",
              message: data.message,
              nickname: "독스루 운영진",
              updatedAt: data.updatedAt,
            });
          }
        } catch (error) {
          setError("챌린지를 불러오는데 실패했습니다.");
        } finally {
          setLoading(false);
        }
      };

      fetchChallenge();
    }
  }, [id]);

  const handleDelete = () => {
    setModalType("delete");
    setIsModalOpen(true);
  };

  const handleReject = () => {
    setModalType("reject");
    setIsModalOpen(true);
  };

  const handleApprove = async () => {
    try {
      await updateChallenge(id, { status: "ACCEPTED" });
      setChallenge({ ...challenge, status: "ACCEPTED" });
      onModalOpen({
        msg: "챌린지가 승인되었습니다",
        action: () => router.push(`/admin/application/${id}`),
      });
    } catch (error) {
      onModalOpen({ msg: "승인 중 오류가 발생했습니다" });
    }
  };

  const handleEdit = () => {
    router.push(`/admin/edit/${id}`);
  };

  const handleModalSubmit = async (formData) => {
    try {
      await updateChallenge(id, { ...formData });
      setChallenge({
        ...challenge,
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
      onModalOpen({
        msg: formData.status === "REJECTED" ? "챌린지가 거절되었습니다." : "챌린지가 삭제되었습니다.",
        action: () => router.push(`/admin/application/${id}`),
      });
    } catch (error) {
      onModalOpen({ msg: "처리 중 오류가 발생했습니다" });
    }
  };

  if (loading) {
    return <Loader msg="챌린지를 불러오는 중" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!challenge) {
    return <div>해당 챌린지를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <Head>
        <title>신청 관리 디테일 페이지</title>
        <meta
          name="description"
          content={`관리자가 보는 신청 관리 상세 페이지입니다.`}
        />
      </Head>
      <div className={styles.pageContainer}>
        <div className={styles.idNumber}>No.{id}</div>
        <ChallengeStatusBadge status={challenge.status} />

        {reasonData && (
          <>
            <ReasonBox
              type={challenge.status === "REJECTED" ? "reject" : "delete"}
              message={reasonData.message}
              nickname={reasonData.nickname}
              updatedAt={reasonData.updatedAt}
            />
            <div className={styles.reasonBoxBorder} />
          </>
        )}

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{challenge.title}</h1>
          <KebabMenu onEdit={handleEdit} onDelete={handleDelete} />
        </div>

        <div className={styles.docTypeContainer}>
          <DocTypeChip field={challenge.field} docType={challenge.docType} />
        </div>

        <p className={styles.description}>{challenge.description}</p>

        <InfoContainer
          applicationDate={challenge.createdAt}
          deadline={challenge.deadline}
          maxParticipants={challenge.maxParticipants}
        />

        <div className={styles.bottomBorder} />

        <a href={challenge.docUrl} className={styles.originalLink}>
          원문 링크
        </a>

        <div className={styles.previewContainer}>
          <iframe
            src={challenge.docUrl}
            className={styles.iframePreview}
            title="Document Preview"
          ></iframe>
          <button
            className={styles.previewButton}
            onClick={() => window.open(challenge.docUrl, "_blank")}
          >
            링크 열기
            <Image
              src={assets.icons.diagonal}
              alt="링크 열기"
              width={12}
              height={12}
            />
          </button>
        </div>

        {challenge.status === "ACCEPTED" && (
          <>
            {!worksData?.bestList || worksData.bestList.length === 0 ? (
              <p>최다 추천 번역물이 없습니다.</p>
            ) : (
              <>
                <div
                  style={{
                    border: "1px solid #F5F5F5",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                />
                <BestRecWork list={worksData.bestList} />
              </>
            )}
          </>
        )}

        {challenge.status === "WAITING" && (
          <div className={styles.buttonContainer}>
            <button className={styles.rejectButton} onClick={handleReject}>
              거절하기
            </button>
            <button className={styles.approveButton} onClick={handleApprove}>
              승인하기
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AdminModal
          type={modalType}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
      <Modal />
    </>
  );
}
