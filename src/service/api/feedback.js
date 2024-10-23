import axios from './axios';

const WORK_PATH = '/works';
const FEEDBACK_PATH = '/feedbacks';
const REPLY_PATH = '/replies';

export async function getFeedbacks(workId, params = {}) {
  const res = await axios.get(`${WORK_PATH}/${workId}/feedbacks`, {
    params: {
      cursorId: params.cursorId || null,
      repliesCursorId: params.repliesCursorId || null,
      limit: params.limit || 3,
    },
  });
  return res.data;
}

export async function updateFeedback(id, data) {
  const res = await axios.patch(`${FEEDBACK_PATH}/${id}`, data);
  return res.data;
}

export async function deleteFeedback(id) {
  const res = await axios.delete(`${FEEDBACK_PATH}/${id}`);
  return res.data;
}

export async function createReply(feedbackId, data) {
  const res = await axios.post(`${FEEDBACK_PATH}/${feedbackId}/replies`, data);
  return res.data;
}

export async function updateReply(replyId, data) {
  const res = await axios.patch(`${REPLY_PATH}/${replyId}`, data);
  return res.data;
}

export async function deleteReply(replyId) {
  const res = await axios.delete(`${REPLY_PATH}/${replyId}`);
  return res.data;
}
