import axios from './axios';

const PATH = '/users/me/challenges';

/** /challenges/ongoing GET - 진행중인 챌린지 조회 */
export async function getOngoingChallenge(params) {
  const res = await axios.get(`${PATH}/ongoing`, { params });
  return res.data;
};

/** /challenges/completed GET - 완료된 챌린지 조회 */
export async function getCompletedChallenge(accessToken, params) {
  const res = await axios.get(`${PATH}/completed`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params
  });
  return res.data;
};

// *****구분선***** //

// 내가 신청한 챌린지 목록 조회
export async function getMyApplications(params) {
  const res = await axios.get(`${PATH}`, { params });
  return res.data;
}

// 내가 신청한 특정 챌린지 상세 조회
export async function getMyApplicationById(applicationId) {
  const res = await axios.get(`${PATH}/${applicationId}`);
  return res.data;
}

// 내가 신청한 챌린지 취소
export async function cancelApplication(applicationId) {
  const res = await axios.put(`${PATH}/${applicationId}/cancel`);
  return res.data;
}
