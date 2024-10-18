import { useRouter } from "next/router";
import Head from "next/head";
import ChallengeStatusBadge from "../../../components/application/ChallengeStatusBadge";
import DocTypeChip from "../../../components/common/DocTypeChip";
import InfoContainer from "../../../components/challenge/InfoContainer";
import KebabMenu from "../../../components/common/KebabMenu";
import styles from "../../../styles/pages/application/MyApplicationDetailPage.module.css";

const seedData = [
  {
    id: 1023,
    docType: "OFFICIAL",
    field: "NEXTJS",
    title: "Next.js - App Router: Routing Fundamentals",
    maxParticipants: 10,
    applicationDate: "2024-01-16T09:00:00",
    deadline: "2024-02-24T23:59:59",
    status: "WAITING",
    docUrl: "https://www.youtube.com/embed/T8S8aS9vswE",
  },
  {
    id: 1022,
    docType: "BLOG",
    field: "API",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    maxParticipants: 5,
    applicationDate: "2024-01-16T10:00:00",
    deadline: "2024-02-23T23:59:59",
    status: "WAITING",
    docUrl: "https://www.youtube.com/embed/T8S8aS9vswE",
  },
  {
    id: 1021,
    docType: "OFFICIAL",
    field: "API",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    maxParticipants: 10,
    applicationDate: "2024-01-15T12:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "WAITING",
    docUrl: "https://www.youtube.com/embed/T8S8aS9vswE",
  },
  {
    id: 1020,
    docType: "BLOG",
    field: "Career",
    title: "개발자로서 자신만의 브랜드를 구축하는 방법(dailydev)",
    maxParticipants: 5,
    applicationDate: "2024-01-14T08:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "REJECTED",
    docUrl: "https://www.youtube.com/embed/T8S8aS9vswE",
  },
  {
    id: 1019,
    docType: "OFFICIAL",
    field: "NEXTJS",
    title: "Next.js - App Router: Routing Fundamentals",
    maxParticipants: 10,
    applicationDate: "2024-01-13T14:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "ACCEPTED",
    docUrl: "https://www.youtube.com/embed/T8S8aS9vswE",
  },
  {
    id: 1018,
    docType: "OFFICIAL",
    field: "API",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    maxParticipants: 5,
    applicationDate: "2024-01-12T10:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "REJECTED",
    docUrl: "https://www.youtube.com/embed/T8S8aS9vswE",
  },
  {
    id: 1017,
    docType: "OFFICIAL",
    field: "API",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    maxParticipants: 10,
    applicationDate: "2024-01-11T15:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "ACCEPTED",
    docUrl: "https://www.youtube.com/embed/T8S8aS9vswE",
  },
  {
    id: 1016,
    docType: "BLOG",
    field: "Career",
    title: "개발자로서 자신만의 브랜드를 구축하는 방법(dailydev)",
    maxParticipants: 5,
    applicationDate: "2024-01-10T09:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "ACCEPTED",
    docUrl: "https://www.youtube.com/embed/T8S8aS9vswE",
  },
  {
    id: 1015,
    docType: "BLOG",
    field: "NEXTJS",
    title: "Next.js - App Router: Routing Fundamentals",
    maxParticipants: 10,
    applicationDate: "2024-01-09T08:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "ACCEPTED",
    docUrl: "https://www.youtube.com/embed/T8S8aS9vswE",
  },
  {
    id: 1014,
    docType: "BLOG",
    field: "NEXTJS",
    title: "Next.js - App Router: Routing Fundamentals",
    maxParticipants: 10,
    applicationDate: "2024-01-08T09:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "DELETED",
    docUrl: "https://www.youtube.com/embed/T8S8aS9vswE",
  },
  {
    id: 2022,
    docType: "OFFICIAL",
    field: "NEXTJS",
    title: "Next.js - App Router: Routing Fundamentals",
    maxParticipants: 10,
    applicationDate: "2024-01-16T09:00:00",
    deadline: "2024-02-24T23:59:59",
    status: "WAITING",
    docUrl: "https://www.youtube.com/embed/T8S8aS9vswE",
  },
];

export default function MyApplicationDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const challenge = seedData.find((item) => item.id === Number(id));

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

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{challenge.title}</h1>
          <KebabMenu />
        </div>

        <div className={styles.docTypeContainer}>
          <DocTypeChip field={challenge.field} docType={challenge.docType} />
        </div>

        <p className={styles.description}>{challenge.description}</p>

        <InfoContainer
          applicationDate={challenge.applicationDate}
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
            onClick={() => (window.location.href = challenge.docUrl)}
          >
            링크 열기
            <img src="/assets/icons/ic_diagonal.svg" alt="링크 열기" />
          </button>
        </div>
      </div>
    </>
  );
}

