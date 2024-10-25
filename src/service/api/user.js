import axios from "./axios";

const PATH = "/users/me/challenges";

/** /challenges/ongoing GET - 진행중인 챌린지 조회 */
export async function getOnGoingChallenge({
  keyword,
  page = '1',
  limit = '5', }) {
  const params = {
    ...(keyword && { keyword }),
    ...(page && { page }),
    ...(limit && { limit }),
  };

  const res = await axios.get(`${PATH}/ongoing`, { params });
  return res.data;
}

/** /challenges/completed GET - 완료된 챌린지 조회 */
export async function getCompletedChallenge({
  keyword,
  page = '1',
  limit = '5', }) {
  const params = {
    ...(keyword && { keyword }),
    ...(page && { page }),
    ...(limit && { limit }),
  };

  const res = await axios.get(`${PATH}/completed`, { params });
  return res.data;
}

// *****구분선***** //

// 내가 신청한 챌린지 조회
export const getChallengeApplications = async ({
  status, // 신청 상태: WAITING | ACCEPTED | REJECTED
  sortBy = "appliedAt", // 기본 정렬 기준: 신청 날짜 (appliedAt)
  sortOrder = "desc", // 최신 항목이 위로 오도록 내림차순 정렬 (desc)
  search = "",
  page = 1,
  limit = 10,
} = {}) => {
  try {
    const params = {
      status,
      sortBy,
      sortOrder,
      search,
      page,
      limit,
    };

    const response = await axios.get(`${PATH}/applications`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

