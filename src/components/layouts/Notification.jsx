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
      console.log('Received notifications:', response); // 디버깅용 로그

      if (response.length === 0) {
        // 알림이 없을 때는 에러가 아니라 알림이 없음을 처리
        setNotifications([]);
        setError(null);
      } else {
        setNotifications(response);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error); // 디버깅용 로그
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
    console.log('알림 데이터:', notification);
    return notification.content;
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
          ) : error ? (
            <p className={styles.errorMessage}>{error}</p>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`${styles.notificationItem} ${
                  notification.isRead ? styles.read : styles.unread
                }`}
              >
                <p className={styles.notificationMessage}>
                  {formatNotification(notification)}
                </p>
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
            <p className={styles.noNotifications}>새로운 알림이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
