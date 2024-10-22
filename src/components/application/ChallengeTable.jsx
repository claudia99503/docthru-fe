import { useRouter } from "next/router";
import styles from "./ChallengeTable.module.css";
import { formatDate } from "@/utils/utilFunction";

const statusMap = {
  WAITING: { label: "승인 대기", className: styles.waiting },
  ACCEPTED: { label: "신청 승인", className: styles.accepted },
  REJECTED: { label: "신청 거절", className: styles.rejected },
  DELETED: { label: "챌린지 삭제", className: styles.deleted },
};

const getFieldLabel = (field) => {
  const fieldMap = {
    NEXTJS: "Next.js",
    API: "API",
    CAREER: "Career",
    MODERNJS: "Modern.js",
    WEB: "WEB",
  };
  return fieldMap[field] || field;
};

const getDocTypeLabel = (docType) => {
  return docType === "OFFICIAL" ? "공식문서" : "블로그";
};

const ChallengeTable = ({ data }) => {
  const router = useRouter();

  const handleRowClick = (id) => {
    router.push(`/me/application/${id}`);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <div className={styles.no}>No.</div>
        <div className={styles.field}>분야</div>
        <div className={styles.category}>카테고리</div>
        <div className={styles.title}>챌린지 제목</div>
        <div className={styles.maxParticipants}>모집 인원</div>
        <div className={styles.applicationDate}>신청일</div>
        <div className={styles.deadline}>마감 기한</div>
        <div className={styles.status}>상태</div>
      </div>

      {data.map((item) => {
        const { label: statusLabel, className: statusClass } = statusMap[
          item.status
        ] || { label: item.status, className: "" };
        const applicationDate = formatDate(item.createdAt);
        const deadline = formatDate(item.deadline);

        return (
          <div
            key={item.id}
            className={`${styles.row} ${
              item.status === "DELETED" ? styles.deletedRow : ""
            }`}
            onClick={() => handleRowClick(item.id)}
          >
            <div className={styles.no}>{item.id}</div>
            <div className={styles.field}>{getDocTypeLabel(item.docType)}</div>
            <div className={styles.category}>{getFieldLabel(item.field)}</div>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.maxParticipants}>{item.maxParticipants}</div>
            <div className={styles.applicationDate}>{applicationDate}</div>
            <div className={styles.deadline}>{deadline}</div>
            <div className={`${styles.status} ${statusClass}`}>
              {statusLabel}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChallengeTable;

