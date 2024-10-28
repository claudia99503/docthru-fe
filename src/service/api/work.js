import axios from './axios';

const PATH = '/works';

export async function getWork(id) {
  const res = await axios.get(`${PATH}/${id}`);
  return res.data;
}

export async function createWork(id, data) {
  const res = await axios.post(`${PATH}/${id}`, data);
  return res.data;
}

export async function updateWork(id, data) {
  const res = await axios.patch(`${PATH}/${id}`, data);
  return res.data;
}

export async function deleteWork(id) {
  const res = await axios.delete(`${PATH}/${id}`);
  return res.data;
}

export async function getWorkFeedbacks(
  id,
  { cursorId = null, limit = 3 } = {}
) {
  const res = await axios.get(`${PATH}/${id}/feedbacks`, {
    params: { cursorId, limit },
  });
  return res.data;
}

export async function createWorkFeedback(id, data) {
  const res = await axios.post(`${PATH}/${id}/feedbacks`, data);
  return res.data;
}

export async function createWorkLike(id) {
  const res = await axios.post(`${PATH}/${id}/likes`);
  return res.data;
}

export async function deleteWorkUnlike(id) {
  const res = await axios.delete(`${PATH}/${id}/likes`);
  return res.data;
}

// *****구분선***** //
/** /:id GET - 챌린지 상세 조회 */
export async function getWorkList(id, params) {
  const res = await axios.get(`${PATH}/list/${id}`, { params });
  return res.data;
}
