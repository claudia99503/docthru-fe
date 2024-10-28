import axios from './axios';

const PATH = '/challenges';

/** GET - 챌린지 목록 조회 */
export async function getChallengeList({
  field,
  docType,
  progress,
  keyword,
  page = '1',
  limit = '5',
}) {
  const params = {
    ...(field && { field: field.join(',') }),
    ...(docType && { docType }),
    ...(progress && { progress }),
    ...(keyword && { keyword }),
    ...(page && { page }),
    ...(limit && { limit }),
  };

  const res = await axios.get(`${PATH}`, { params });
  return res.data;
}

/** /:id GET - 챌린지 상세 조회 */
export async function getChallenge(id) {
  const res = await axios.get(`${PATH}/${id}`);
  return res.data;
}

/** /:id PATCH - 상세 챌린지 수정 - 어드민 */
export async function updateChallenge(id, data) {
  const res = await axios.patch(`${PATH}/${id}/`, data);
  return res.data;
}

/** /:id DELETE - 챌린지 취소 - 챌린지 신청한 유저 */
export async function deleteChallenges(id) {
  try {
    const res = await axios.delete(`/challenges/${id}/cancel`);
    return res.data;
  } catch (error) {
    // 에러 처리
    if (error.response) {
      throw new Error(error.response.data.message || '삭제 요청 실패');
    } else {
      throw new Error('서버와의 통신 중 오류 발생');
    }
  }
}

/** /:id/participation POST - 번역 챌린지 참여 */
export async function createChallenge(id) {
  const res = await axios.post(`${PATH}/${id}/participation`);
  return res.data;
}

/** :id/original GET - 챌린지 원문 조회 */
export async function getChallengeOriginal(id) {
  const res = await axios.get(`${PATH}/${id}/original`);
  return res.data;
}

/** POST - 챌린지 및 어플리케이션 생성 */
export async function createChallengeApplication(data) {
  const res = await axios.post(`${PATH}/application`, data);
  return res.data;
}

/** GET - 챌린지 전체 조회 (챌린지 신청 관리) - 어드민 전용 */
export async function getAllChallengeApplications({
  page = 1,
  limit = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  keyword = '',
  status = '',
} = {}) {
  try {
    const params = {
      page,
      limit,
      sortBy: status ? 'status' : sortBy, // status가 있을 경우 sortBy를 'status'로 설정
      sortOrder: status || sortOrder, // status가 있을 경우 sortOrder를 상태 값으로 설정
      ...(keyword && { keyword }), // 검색어가 있을 경우에만 추가
    };

    // API 호출
    const response = await axios.get(`${PATH}/application`, { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '챌린지 목록 조회 실패');
  }
}

/** PATCH - 어드민 챌린지 수정 (챌린지 상태 변경 포함) */
export async function updateChallengeAdmin({
  challengeId,
  title,
  field,
  docType,
  description,
  docUrl,
  deadline,
  progress,
  maxParticipants,
  status,
  message,
}) {
  try {
    const body = {
      ...(title && { title }),
      ...(field && { field }),
      ...(docType && { docType }),
      ...(description && { description }),
      ...(docUrl && { docUrl }),
      ...(deadline && { deadline }),
      ...(progress !== undefined && { progress }), // boolean 값 체크
      ...(maxParticipants && { maxParticipants }),
      ...(status && { status }),
      ...(message && { message }),
    };

    const response = await axios.patch(`${PATH}/${challengeId}`, body);
    return response.data; // 수정된 챌린지 정보 반환
  } catch (error) {
    throw new Error(error.response?.data?.message || '챌린지 수정 실패');
  }
}

// work 페이지에서 챌린지 참여 포기

export async function deleteChallengeParticipation(challengeId) {
  const res = await axios.delete(`${PATH}/${challengeId}/participations`);
  return res.data;
}