import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/pages/application/EditApplicationPage.module.css";
import { getChallenge, updateChallenge } from "@/service/api/challenge";
import Loader from "@/components/common/Loader";
import FieldSelection from "@/components/application/FieldSelection";
import DocTypeSelection from "@/components/application/DocTypeSelection";
import assets from "@/variables/images";
import { useAlertModal } from "@/hooks/useModal";
import Image from "next/image";

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

const EditApplicationPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    title: "",
    docUrl: "",
    field: "",
    docType: "",
    deadline: "",
    maxParticipants: "",
    description: "",
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [fieldDropdownOpen, setFieldDropdownOpen] = useState(false);
  const [docTypeDropdownOpen, setDocTypeDropdownOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { Modal, onModalOpen } = useAlertModal();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getChallenge(id)
      .then((data) => {
        setFormData((prev) => ({
          ...prev,
          title: data.title || "",
          docUrl: data.docUrl || "",
          field: data.field || "",
          docType: data.docType || "",
          deadline: data.deadline ? new Date(data.deadline).toISOString() : "",
          maxParticipants: data.maxParticipants || "",
          description: data.description || "",
        }));

        if (data.deadline) {
          const formattedDate = new Date(data.deadline).toISOString().split("T")[0];
          setSelectedDate(formattedDate);
        }
      })
      .catch(() => setError("데이터를 불러오는 중 오류가 발생했습니다."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleInputChange = ({ target: { name, value } }) => {
    if (formData[name] !== value) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFieldSelect = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      field: value,
    }));
    setFieldDropdownOpen(false);
  };

  const handleDocTypeSelect = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      docType: value,
    }));
    setDocTypeDropdownOpen(false);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setFormData((prevData) => ({
      ...prevData,
      deadline: new Date(date).toISOString(),
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

    const errorMsg = validateForm();
    if (errorMsg) return onModalOpen({ msg: errorMsg });

    setLoading(true);

    const dataToSend = {
      ...formData,
      field: fieldMapping[formData.field] || formData.field,
      docType: docTypeMapping[formData.docType] || formData.docType,
      deadline: new Date(formData.deadline).toISOString(),
      maxParticipants: Number(formData.maxParticipants),
    };

    try {
      await updateChallenge(id, dataToSend);
      onModalOpen({
        msg: "챌린지 수정이 성공적으로 완료되었습니다",
        action: () => router.push(`/admin/application/${id}`),
      });
    } catch {
      onModalOpen({ msg: "챌린지 수정 중 오류가 발생했습니다" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>챌린지 수정하기</title>
        <meta
          name="description"
          content="사용자가 챌린지를 수정하는 페이지입니다."
        />
      </Head>
      <div className={styles.EditApplicationPage}>
        <h1 className={styles["application-title"]}>챌린지 수정하기</h1>
        {loading && <Loader msg="챌린지를 수정 중입니다" />}
        {!loading && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>제목</label>
            <div className={styles["input-wrapper"]} style={{ borderRadius: "12px" }}>
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
            <div className={styles["input-wrapper"]} style={{ borderRadius: "12px" }}>
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
            <div className={styles["input-wrapper"]} style={{ borderRadius: "4px" }}>
              <input
                type="text"
                name="field"
                placeholder="분야를 선택해주세요"
                className={styles["select-input"]}
                value={formData.field}
                readOnly
              />
              <Image
                src={fieldDropdownOpen ? assets.icons.up : assets.icons.down}
                alt="Dropdown Icon"
                className={styles.icon}
                width={16}
                height={9}
                onClick={() => setFieldDropdownOpen(!fieldDropdownOpen)}
              />
              {fieldDropdownOpen && (
                <div className={styles.dropdownContainer}>
                  <FieldSelection onOptionChange={handleFieldSelect} />
                </div>
              )}
            </div>

            <label className={styles.label}>문서 타입</label>
            <div className={styles["input-wrapper"]} style={{ borderRadius: "4px" }}>
              <input
                type="text"
                name="docType"
                placeholder="문서타입을 선택해주세요"
                className={styles["select-input"]}
                value={formData.docType}
                readOnly
              />
              <Image
                src={docTypeDropdownOpen ? assets.icons.up : assets.icons.down}
                alt="Dropdown Icon"
                className={styles.icon}
                width={16}
                height={9}
                onClick={() => setDocTypeDropdownOpen(!docTypeDropdownOpen)}
              />
              {docTypeDropdownOpen && (
                <div className={styles.dropdownContainer}>
                  <DocTypeSelection onOptionChange={handleDocTypeSelect} />
                </div>
              )}
            </div>

            <label className={styles.label}>마감일</label>
            <div className={styles["input-wrapper"]} style={{ borderRadius: "12px" }}>
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
              <Image
                src={assets.icons.calender}
                alt="Calendar Icon"
                className={styles.icon}
                width={28}
                height={28}
                onClick={() =>
                  document.querySelector(`.${styles.dateInput}`).showPicker()
                }
              />
            </div>

            <label className={styles.label}>최대 인원</label>
            <div className={styles["input-wrapper"]} style={{ borderRadius: "12px" }}>
              <input
                type="text"
                name="maxParticipants"
                placeholder="인원을 입력해주세요"
                className={styles.input}
                value={formData.maxParticipants}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    handleInputChange(e);
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
              style={{ borderRadius: "12px" }}
            ></textarea>

            <button
              className={styles["submit-button"]}
              type="submit"
              style={{ borderRadius: "8px" }}
            >
              수정하기
            </button>
          </form>
        )}
        {error && <p className={styles.error}>{error}</p>}
        <Modal />
      </div>
    </>
  );
};

export default EditApplicationPage;

