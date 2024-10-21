import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/pages/application/CreateApplicationPage.module.css";
import { createChallengeApplication } from "../../service/api/challenge";
import Loader from "../../components/common/Loader";

export default function CreateApplicationPage() {
  const [formData, setFormData] = useState({
    title: "",
    docUrl: "",
    field: "",
    docType: "",
    deadline: "",
    maxParticipants: "",
    description: "",
  });

  const [selectedDate, setSelectedDate] = useState(""); // 화면에서만 표시 될 날짜
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 날짜 변경
  const handleDateChange = (e) => {
    const date = e.target.value;
    const formattedDate = new Date(date).toISOString();
    setSelectedDate(date); // 선택한 날짜를 업데이트 (YYYY-MM-DD)
    setFormData((prevData) => ({
      ...prevData,
      deadline: formattedDate, // ISO 형식으로 폼 데이터 업데이트
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const {
      title,
      docUrl,
      field,
      docType,
      deadline,
      maxParticipants,
      description,
    } = formData;
    if (
      !title ||
      !docUrl ||
      !field ||
      !docType ||
      !deadline ||
      !maxParticipants ||
      !description
    ) {
      setError("모든 필드를 입력해주세요.");
      setLoading(false);
      return;
    }

    const dataToSend = {
      title,
      docUrl,
      field,
      docType,
      deadline,
      maxParticipants: Number(maxParticipants),
      description,
    };

    console.log("전송할 데이터:", JSON.stringify(dataToSend, null, 2));

    try {
      const response = await createChallengeApplication(dataToSend);
      console.log("챌린지 생성 성공:", response);
      alert("챌린지 신청이 성공적으로 완료되었습니다!");
      router.push("/me/application");
    } catch (error) {
      console.error(
        "챌린지 생성 실패:",
        error.response ? error.response.data : error.message
      );
      setError("챌린지 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>챌린지 신청하기</title>
        <meta
          name="description"
          content="사용자가 챌린지를 신청하는 페이지입니다."
        />
      </Head>
      <div className={styles.CreateApplicationPage}>
        <h1 className={styles["application-title"]}>신규 챌린지 신청</h1>

        {loading && <Loader msg="챌린지를 생성 중입니다" />}

        {!loading && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>제목</label>
            <div className={styles["input-wrapper"]}>
              <input
                type="text"
                name="title"
                placeholder="제목을 입력해주세요"
                className={styles.input}
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <label className={styles.label}>원문 링크</label>
            <div className={styles["input-wrapper"]}>
              <input
                type="text"
                name="docUrl"
                placeholder="원문 링크를 입력해주세요"
                className={styles.input}
                value={formData.docUrl}
                onChange={handleInputChange}
              />
            </div>

            <label className={styles.label}>분야</label>
            <div className={styles["input-wrapper"]}>
              <input
                type="text"
                name="field"
                placeholder="분야를 입력해주세요"
                className={styles["select-input"]}
                value={formData.field}
                onChange={handleInputChange}
              />
              <img src="/assets/icons/ic_down.svg" className={styles.icon} />
            </div>

            <label className={styles.label}>문서타입</label>
            <div className={styles["input-wrapper"]}>
              <input
                type="text"
                name="docType"
                placeholder="문서타입을 입력해주세요"
                className={styles["select-input"]}
                value={formData.docType}
                onChange={handleInputChange}
              />
              <img src="/assets/icons/ic_down.svg" className={styles.icon} />
            </div>

            <label className={styles.label}>마감일</label>
            <div className={styles["input-wrapper"]}>
              <input
                type="text"
                name="deadline"
                placeholder="YYYY-MM-DD"
                className={styles.input}
                value={selectedDate} // 화면에 표시할 날짜
                readOnly
              />
              <input
                type="date"
                className={styles.dateInput}
                onChange={handleDateChange}
              />
              <img
                src="/assets/icons/ic_calender.svg"
                className={styles.icon}
                onClick={() =>
                  document.querySelector(`.${styles.dateInput}`).showPicker()
                }
              />
            </div>

            <label className={styles.label}>최대인원</label>
            <div className={styles["input-wrapper"]}>
              <input
                type="number"
                name="maxParticipants"
                placeholder="인원을 입력해주세요"
                className={styles.input}
                value={formData.maxParticipants}
                onChange={handleInputChange}
              />
            </div>

            <label className={styles.label}>내용</label>
            <textarea
              name="description"
              placeholder="내용을 입력해주세요"
              className={styles.textarea}
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>

            <button className={styles["submit-button"]} type="submit">
              신청하기
            </button>
          </form>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </>
  );
}

