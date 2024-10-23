// service/api/notifications.js
import axios from './axios';

const PATH = '/notifications';

/** GET - 사용자의 모든 알림 조회 */
export async function fetchNotifications(userId, includeRead = false) {
  const res = await axios.get(`${PATH}/users/${userId}/notifications`, {
    params: { includeRead: includeRead.toString() },
  });
  return res.data;
}

/** PUT - 알림을 읽음으로 표시 */
export async function markAsRead(notificationId) {
  const res = await axios.put(`${PATH}/notifications/${notificationId}`);
  return res.data;
}

/** GET - 변경 알림 조회 */
export async function fetchChangeNotifications(userId) {
  const res = await axios.get(`${PATH}/users/${userId}/changes`);
  return res.data;
}

/** GET - 챌린지 상태 알림 조회 */
export async function fetchChallengeStatusNotifications(userId) {
  const res = await axios.get(`${PATH}/users/${userId}/challenge-status`);
  return res.data;
}

/** GET - 새 작업 알림 조회 */
export async function fetchNewWorkNotifications(userId) {
  const res = await axios.get(`${PATH}/users/${userId}/new-works`);
  return res.data;
}

/** GET - 새 피드백 알림 조회 */
export async function fetchNewFeedbackNotifications(userId) {
  const res = await axios.get(`${PATH}/users/${userId}/new-feedbacks`);
  return res.data;
}

/** GET - 마감 알림 조회 */
export async function fetchDeadlineNotifications(userId) {
  const res = await axios.get(`${PATH}/users/${userId}/deadlines`);
  return res.data;
}

/** GET - 관리자 액션 알림 조회 */
export async function fetchAdminActionNotifications(userId) {
  const res = await axios.get(`${PATH}/users/${userId}/admin-actions`);
  return res.data;
}
