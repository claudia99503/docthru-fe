import axios from './axios';

const PATH = '/feedbacks';

export async function updateFeedback(id, data) {
  const res = await axios.patch(`${PATH}/${id}`, data);
  return res.data;
}

export async function deleteFeedback(id) {
  const res = await axios.delete(`${PATH}/${id}`);
  return res.data;
}
