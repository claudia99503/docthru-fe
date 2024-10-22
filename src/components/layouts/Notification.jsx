import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
import Image from 'next/image';
import icBellAlert from '/assets/icons/ic_bell_alert.svg';
import icBellEmpty from '/assets/icons/ic_bell_empty.svg';
import styles from './Notification.module.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `/api/notifications/users/${user.id}/notifications`
      );
      setNotifications(response.data);
    } catch (error) {
      console.error('알림을 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(
        `/api/notifications/notifications/${notificationId}/read`
      );
      fetchNotifications(); // 알림 목록 갱신
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

  return (
    <div className={styles.notificationContainer}>
      <button
        onClick={toggleNotifications}
        className={styles.notificationButton}
      >
        <Image
          src={hasUnreadNotifications ? icBellAlert : icBellEmpty}
          alt="알림"
          width={24}
          height={24}
        />
      </button>
      {showNotifications && (
        <div className={styles.notificationList}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`${styles.notificationItem} ${
                  notification.isRead ? styles.read : styles.unread
                }`}
              >
                <p>{notification.content}</p>
                <p>{new Date(notification.createdAt).toLocaleString()}</p>
                {!notification.isRead && (
                  <button onClick={() => markAsRead(notification.id)}>
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
