import axios from './axios';

const PATH = '/work';

export async function getWork(id) {
  const res = await axios.get(`${PATH}/${id}`);
  return res.data;
}

export async function createWork(data) {
  const res = await axios.post(PATH, data);
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

export async function getWorkFeedbacks(id) {
  const res = await axios.delete(`${PATH}/${id}/feedbacks`);
  return res.data;
}
