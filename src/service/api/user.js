import axios from './axios';

const PATH = '/users/me/challenges';

/** /challenges/ongoing GET - 진행중인 챌린지 조회 */
export async function getOngoingChallenge() {
  const res = await axios.get(`${PATH}/ongoing`,);
  return res.data;
};

/** /challenges/completed GET - 완료된 챌린지 조회 */
export async function getCompletedChallenge() {
  const res = await axios.get(`${PATH}/completed`);
  return res.data;
};
