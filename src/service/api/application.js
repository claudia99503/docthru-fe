import axios from './axios';

const PATH = '/applications';

// 관리자용 신청 목록 조회
export async function getAdminApplications(params) {
  const res = await axios.get(`${PATH}`, { params });
  return res.data;
}

// 관리자용 신청 상세 조회
export async function getAdminApplicationById(applicationId) {
  const res = await axios.get(`${PATH}/${applicationId}`);
  return res.data;
}

// 신청 상태 업데이트 (승인, 거절, 삭제)
export async function updateApplication(applicationId, data) {
  const res = await axios.put(`${PATH}/${applicationId}`, data);
  return res.data;
}

// 신청 수정 (어드민 전용)
export async function updateApplicationDetails(applicationId, data) {
  const res = await axios.patch(`${PATH}/${applicationId}`, data);
  return res.data;
}
