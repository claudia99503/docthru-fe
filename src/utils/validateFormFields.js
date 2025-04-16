export const validateFormFields = (formData) => {
  const requiredFields = [
    "title",
    "docUrl",
    "field",
    "docType",
    "deadline",
    "maxParticipants",
    "description",
  ];

  for (const key of requiredFields) {
    if (!formData[key]) {
      return `${key} 항목을 입력해주세요.`;
    }
  }

  return null;
};

