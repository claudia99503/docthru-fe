import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import ChallengeStatusBadge from "../../../components/application/ChallengeStatusBadge";
import DocTypeChip from "../../../components/common/DocTypeChip";
import InfoContainer from "../../../components/challenge/InfoContainer";
import CancelMenu from "../../../components/common/CancelMenu";
import ReasonBox from "../../../components/application/ReasonBox";
import { getChallenge, deleteChallenges } from "../../../service/api/challenge";
import Loader from "../../../components/common/Loader";
import styles from "../../../styles/pages/application/MyApplicationDetailPage.module.css";
import assets from "@/variables/images";

export default function MyApplicationDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchChallenge = async () => {
        try {
          setLoading(true);
          const data = await getChallenge(id);
          setChallenge(data);
        } catch (error) {
          setError("챌린지를 불러오는데 실패했습니다.");
        } finally {
          setLoading(false);
        }
      };

      fetchChallenge();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteChallenges(id);
      alert("챌린지가 취소되었습니다.");
      router.push("/me/application");
    } catch (error) {
      alert(error.message);
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
        <title>신청한 챌린지 상세페이지</title>
        <meta
          name="description"
          content={`사용자가 신청한 챌린지 ${challenge.title}의 상세 정보입니다.`}
        />
      </Head>
      <div className={styles.pageContainer}>
        <ChallengeStatusBadge status={challenge.status} />

        {(challenge.status === "REJECTED" ||
          challenge.status === "DELETED") && (
          <>
            <ReasonBox
              type={challenge.status === "REJECTED" ? "거절" : "삭제"}
              message={challenge.message}
              nickname="독스루 운영진"
              updatedAt={challenge.updatedAt}
            />
            <div className={styles.bottomBorder} />
          </>
        )}

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{challenge.title}</h1>
          <CancelMenu onDelete={handleDelete} />
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
            onClick={() => window.open(challenge.docUrl, '_blank')}
          >
            링크 열기
            <img src={assets.icons.diagonal} alt="링크 열기" />
          </button>
        </div>
      </div>
    </>
  );
}

