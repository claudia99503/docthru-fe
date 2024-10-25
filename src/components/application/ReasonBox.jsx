import React from 'react';
import styles from './ReasonBox.module.css';
import assets from '../../variables/images';

const ReasonBox = ({ type, message, nickname, updatedAt }) => {
    const date = new Date(updatedAt);
    const hours = date.getHours();
    const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${hours >= 12 ? '오후' : '오전'} ${hours % 12 || 12}시 ${date.getMinutes()}분`;

    return (
        <div className={styles.ReasonBox}>
            <div className={styles['reason-header']}>
                <span className={styles['reason-title']}>
                    {type === 'reject' ? '신청 거절 사유' : '신청 삭제 사유'}
                </span>
            </div>

            <div className={styles['reason-content']}>
                <p className={styles['reason-text']}>{message}</p>
            </div>

            <div className={styles['reason-footer']}>
                <span className={styles['user-info']}>{nickname}</span>
                <img src={assets.icons.line} alt="구분선" className={styles['line-icon']} />
                <span className={styles.timestamp}>{formattedDate}</span>
            </div>
        </div>
    );
};

export default ReasonBox;

