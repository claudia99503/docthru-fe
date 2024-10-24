// service/api/notifications.js
import axios from './axios';
const PATH = '/notifications';
/** GET - 사용자의 모든 알림 조회 */
export async function fetchNotifications(userId, includeRead = false) {
  try {
    const res = await axios.get(`${PATH}/users/${userId}/notifications`, {
      params: { includeRead: includeRead.toString() },
    });
    return res.data;
  } catch (error) {
    console.error('알림 조회 중 오류 발생:', error);
    throw error;
  }
}
/** PUT - 알림을 읽음으로 표시 */
export async function markAsRead(notificationId) {
  try {
    const res = await axios.put(
      `${PATH}/users/${notificationId}/notifications`
    );
    return res.data;
  } catch (error) {
    console.error('알림 읽음 처리 중 오류 발생:', error);
    throw error;
  }
}
