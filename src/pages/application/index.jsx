import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/pages/application/CreateApplicationPage.module.css";
import { createChallengeApplication } from "../../service/api/challenge";
import Loader from "../../components/common/Loader";
import FieldSelection from "../../components/application/FieldSelection";
import DocTypeSelection from "../../components/application/DocTypeSelection";
import assets from "../../variables/images";

const fieldMapping = {
  "Next.js": "NEXTJS",
  API: "API",
  Career: "CAREER",
  "Modern JS": "MODERNJS",
  Web: "WEB",
};

const docTypeMapping = {
  "공식 문서": "OFFICIAL",
  블로그: "BLOG",
};

const CreateApplicationPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    docUrl: "",
    field: "",
    docType: "",
    deadline: "",
    maxParticipants: "",
    description: "",
  });

  const [selectedDate, setSelectedDate] = useState(""); // 화면에서만 표시될 날짜
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldDropdownOpen, setFieldDropdownOpen] = useState(false);
  const [docTypeDropdownOpen, setDocTypeDropdownOpen] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFieldSelect = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      field: value, // UI상으로는 선택한 값 유지
    }));
    setFieldDropdownOpen(false);
  };

  const handleDocTypeSelect = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      docType: value, // UI상으로는 선택한 값 유지
    }));
    setDocTypeDropdownOpen(false);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setFormData((prevData) => ({
      ...prevData,
      deadline: new Date(date).toISOString(), // ISO 형식으로 변환하여 저장
    }));
  };

  const validateForm = () => {
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
      return "모든 필드를 입력해주세요.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      setLoading(false);
      return;
    }

    const dataToSend = {
      title: formData.title,
      docUrl: formData.docUrl,
      field: fieldMapping[formData.field],
      docType: docTypeMapping[formData.docType],
      deadline: formData.deadline,
      maxParticipants: Number(formData.maxParticipants),
      description: formData.description,
    };

    try {
      await createChallengeApplication(dataToSend);
      alert("챌린지 신청이 성공적으로 완료되었습니다!");
      router.push("/me/application");
    } catch (error) {
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
            <div
              className={styles["input-wrapper"]}
              style={{ borderRadius: "12px" }}
            >
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
            <div
              className={styles["input-wrapper"]}
              style={{ borderRadius: "12px" }}
            >
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
            <div
              className={styles["input-wrapper"]}
              style={{ borderRadius: "4px" }}
            >
              <input
                type="text"
                name="field"
                placeholder="분야를 선택해주세요"
                className={styles["select-input"]}
                value={formData.field}
                readOnly
              />
              <img
                src={fieldDropdownOpen ? assets.icons.up : assets.icons.down}
                className={styles.icon}
                onClick={() => setFieldDropdownOpen(!fieldDropdownOpen)}
              />
              {fieldDropdownOpen && (
                <div className={styles.dropdownContainer}>
                  <FieldSelection onOptionChange={handleFieldSelect} />
                </div>
              )}
            </div>

            <label className={styles.label}>문서타입</label>
            <div
              className={styles["input-wrapper"]}
              style={{ borderRadius: "4px" }}
            >
              <input
                type="text"
                name="docType"
                placeholder="문서타입을 선택해주세요"
                className={styles["select-input"]}
                value={formData.docType}
                readOnly
              />
              <img
                src={docTypeDropdownOpen ? assets.icons.up : assets.icons.down}
                className={styles.icon}
                onClick={() => setDocTypeDropdownOpen(!docTypeDropdownOpen)}
              />
              {docTypeDropdownOpen && (
                <div className={styles.dropdownContainer}>
                  <DocTypeSelection onOptionChange={handleDocTypeSelect} />
                </div>
              )}
            </div>

            <label className={styles.label}>마감일</label>
            <div
              className={styles["input-wrapper"]}
              style={{ borderRadius: "12px" }}
            >
              <input
                type="text"
                name="deadline"
                placeholder="YYYY-MM-DD"
                className={styles.input}
                value={selectedDate}
                readOnly
              />
              <input
                type="date"
                className={styles.dateInput}
                onChange={handleDateChange}
              />
              <img
                src={assets.icons.calender}
                className={styles.icon}
                onClick={() =>
                  document.querySelector(`.${styles.dateInput}`).showPicker()
                }
              />
            </div>

            <label className={styles.label}>최대인원</label>
            <div
              className={styles["input-wrapper"]}
              style={{ borderRadius: "12px" }}
            >
              <input
                type="text"
                name="maxParticipants"
                placeholder="인원을 입력해주세요"
                className={styles.input}
                value={formData.maxParticipants}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    handleInputChange(e); // 숫자만 허용
                  }
                }}
              />
            </div>

            <label className={styles.label}>내용</label>
            <textarea
              name="description"
              placeholder="내용을 입력해주세요"
              className={styles.textarea}
              value={formData.description}
              onChange={handleInputChange}
              style={{ borderRadius: "6px" }}
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
};

export default CreateApplicationPage;

