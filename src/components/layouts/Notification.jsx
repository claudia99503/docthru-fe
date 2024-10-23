import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import Image from 'next/image';
import assets from '../../variables/images';
import styles from './Notification.module.css';
import { fetchNotifications, markAsRead } from '../../service/api/notification';
import Loader from '../common/Loader';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가
  const { user } = useAuth();

  const getNotifications = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetchNotifications(user.id, true);

      if (response.length === 0) {
        // 알림이 없을 때는 에러가 아니라 알림이 없음을 처리
        setNotifications([]);
        setError(null);
      } else {
        setNotifications(response);
        setError(null);
      }
    } catch (error) {
      setError('알림을 가져오는 중 문제가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [user]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId);
      getNotifications(); // 알림 목록 갱신
    } catch (error) {
      console.error('알림 읽음 처리 중 오류가 발생했습니다:', error);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const hasUnreadNotifications = notifications.some(
    (notification) => !notification.isRead
  );

  const formatNotification = (notification) => {
    switch (notification.type) {
      case 'change':
        return `${notification.itemName}이(가) ${notification.action}되었습니다. (${notification.type})`;
      case 'challengeStatus':
        return `챌린지 "${notification.challengeName}"의 상태가 ${notification.status}로 변경되었습니다.`;
      case 'newWork':
        return `챌린지 "${notification.challengeName}"에 새로운 작업물이 추가되었습니다.`;
      case 'newFeedback':
        return `챌린지 "${notification.challengeName}"의 작업물 "${notification.workName}"에 새로운 피드백이 추가되었습니다.`;
      case 'deadline':
        return `챌린지 "${notification.challengeName}"가 마감되었습니다.`;
      case 'adminAction':
        if (notification.itemType === 'challenge') {
          return `관리자가 챌린지 "${notification.challengeName}"을(를) ${notification.action}했습니다. 사유: ${notification.reason}`;
        } else if (notification.itemType === 'feedback') {
          return `관리자가 피드백을 ${notification.action}했습니다. 챌린지: "${notification.challengeName}", 작업물: "${notification.workName}"`;
        }
        return `관리자가 ${notification.itemName}을(를) ${notification.action}했습니다. 사유: ${notification.reason}`;
      default:
        return notification.message;
    }
  };

  return (
    <div className={styles.notificationContainer}>
      <button
        onClick={toggleNotifications}
        className={styles.notificationButton}
      >
        <Image
          src={
            hasUnreadNotifications
              ? assets.icons.bellAlert
              : assets.icons.bellEmpty
          }
          alt="알림"
          width={24}
          height={24}
        />
      </button>
      {showNotifications && (
        <div className={styles.notificationList}>
          {loading ? ( // 로딩 중일 때 Loader 컴포넌트 표시
            <Loader msg="알림을 불러오는 중" />
          ) : error ? ( // 에러가 있으면 에러 메시지 표시
            <p>{error}</p>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`${styles.notificationItem} ${
                  notification.isRead ? styles.read : styles.unread
                }`}
              >
                <p>{formatNotification(notification)}</p>
                <p className={styles.notificationDate}>
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
                {!notification.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className={styles.readButton}
                  >
                    읽음 처리
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>새로운 알림이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
