import { validateFormFields } from '../utils/validateFormFields';

describe('validateFormFields', () => {
  const validFormData = {
    title: '챌린지 제목',
    docUrl: 'https://example.com',
    field: 'WEB',
    docType: 'OFFICIAL',
    deadline: '2025-04-30T00:00:00.000Z',
    maxParticipants: '10',
    description: '챌린지 설명',
  };

  it('모든 필드가 채워졌을 때 null을 반환해야 한다', () => {
    const result = validateFormFields(validFormData);
    expect(result).toBe(null);
  });

  it('빈 값이 있을 경우 해당 필드명을 포함한 에러 메시지를 반환해야 한다', () => {
    const invalidFormData = {
      ...validFormData,
      title: '',
    };
    const result = validateFormFields(invalidFormData);
    expect(result).toBe('title 항목을 입력해주세요.');
  });

  it('두 개 이상의 필드가 비어 있어도 첫 번째 비어있는 필드 기준 메시지를 반환해야 한다', () => {
    const invalidFormData = {
      ...validFormData,
      title: '',
      description: '',
    };
    const result = validateFormFields(invalidFormData);
    expect(result).toBe('title 항목을 입력해주세요.');
  });
});

