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
    description:
      "Next.js의 App Router 사용법과 라우팅 기초를 설명하는 공식 문서입니다.",
    maxParticipants: 10,
    applicationDate: "2024-01-16T09:00:00",
    deadline: "2024-02-24T23:59:59",
    status: "WAITING",
  },
  {
    id: 1022,
    docType: "BLOG",
    field: "API",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    description:
      "Fetch API의 에러 핸들링 방법에 대한 블로그 포스트. 실전에서 올바르게 에러를 처리하는 방법을 다룹니다.",
    maxParticipants: 5,
    applicationDate: "2024-01-16T10:00:00",
    deadline: "2024-02-23T23:59:59",
    status: "WAITING",
  },
  {
    id: 1021,
    docType: "OFFICIAL",
    field: "API",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    description:
      "Fetch API 에러 처리를 주제로 한 공식 문서로, 다양한 사례와 해결책을 제시합니다.",
    maxParticipants: 10,
    applicationDate: "2024-01-15T12:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "WAITING",
  },
  {
    id: 1020,
    docType: "BLOG",
    field: "CAREER",
    title: "개발자로서 자신만의 브랜드를 구축하는 방법(dailydev)",
    description:
      "개발자로서 개인 브랜드를 어떻게 구축할 수 있는지에 대한 전략과 팁을 제공하는 블로그 포스트입니다.",
    maxParticipants: 5,
    applicationDate: "2024-01-14T08:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "REJECTED",
  },
  {
    id: 1019,
    docType: "OFFICIAL",
    field: "NEXTJS",
    title: "Next.js - App Router: Routing Fundamentals",
    description:
      "Next.js의 App Router 사용법과 라우팅 기초를 설명하는 공식 문서입니다.",
    maxParticipants: 10,
    applicationDate: "2024-01-13T14:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "ACCEPTED",
  },
  {
    id: 1018,
    docType: "OFFICIAL",
    field: "API",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    description:
      "Fetch API의 에러 핸들링 방법에 대한 심도 있는 내용의 공식 문서입니다.",
    maxParticipants: 5,
    applicationDate: "2024-01-12T10:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "REJECTED",
  },
  {
    id: 1017,
    docType: "OFFICIAL",
    field: "API",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    description:
      "Fetch API 에러 처리와 관련된 최신 동향과 베스트 프랙티스를 다룬 공식 문서입니다.",
    maxParticipants: 10,
    applicationDate: "2024-01-11T15:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "ACCEPTED",
  },
  {
    id: 1016,
    docType: "BLOG",
    field: "CAREER",
    title: "개발자로서 자신만의 브랜드를 구축하는 방법(dailydev)",
    description:
      "개발자 커리어에서 개인 브랜드를 강화할 수 있는 다양한 전략과 팁을 제공하는 블로그 포스트입니다.",
    maxParticipants: 5,
    applicationDate: "2024-01-10T09:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "ACCEPTED",
  },
  {
    id: 1015,
    docType: "BLOG",
    field: "NEXTJS",
    title: "Next.js - App Router: Routing Fundamentals",
    description:
      "Next.js의 App Router와 라우팅에 대한 실전 가이드를 다룬 블로그 포스트입니다.",
    maxParticipants: 10,
    applicationDate: "2024-01-09T08:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "ACCEPTED",
  },
  {
    id: 1014,
    docType: "BLOG",
    field: "NEXTJS",
    title: "Next.js - App Router: Routing Fundamentals",
    description:
      "Next.js의 App Router 사용법을 다룬 블로그 포스트로, 최신 라우팅 기능을 설명합니다.",
    maxParticipants: 10,
    applicationDate: "2024-01-08T09:00:00",
    deadline: "2024-02-22T23:59:59",
    status: "DELETED",
  },
  {
    id: 2022,
    docType: "OFFICIAL",
    field: "NEXTJS",
    title: "Next.js - App Router: Routing Fundamentals",
    description:
      "Next.js의 App Router 사용법과 라우팅 기초를 설명하는 공식 문서입니다.",
    maxParticipants: 10,
    applicationDate: "2024-01-16T09:00:00",
    deadline: "2024-02-24T23:59:59",
    status: "WAITING",
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
          participants={challenge.participates}
        />

        <div className={styles.bottomBorder} />

        <a href="#" className={styles.originalLink}>
          원문 링크
        </a>
      </div>
    </>
  );
}

