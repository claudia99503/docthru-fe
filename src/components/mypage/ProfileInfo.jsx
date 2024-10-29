import { useState, useCallback, memo } from 'react';
import axios from 'axios';
import styles from './ProfileInfo.module.css';

const ProfileView = memo(({ profile, isOwner, onEdit, userName }) => {
  // 새 프로필인지 여부 확인
  const isNewProfile =
    !profile.position &&
    !profile.bio &&
    !profile.location &&
    profile.career === null &&
    (!profile.skills || profile.skills.length === 0) &&
    (!profile.preferredFields || profile.preferredFields.length === 0) &&
    !profile.githubUrl;

  // 다른 사용자의 빈 프로필일 경우
  if (!isOwner && isNewProfile) {
    return (
      <div className={styles['welcome-container']}>
        <h3 className={styles['empty-profile-title']}>아직 프로필이 없어요</h3>
        <p className={styles['empty-profile-text']}>
          {userName}님은 아직 프로필을 설정하지 않았어요.
        </p>
      </div>
    );
  }

  // 본인의 빈 프로필일 경우
  if (isOwner && isNewProfile) {
    return (
      <div className={styles['welcome-container']}>
        <h3 className={styles['welcome-title']}>환영합니다!</h3>
        <p className={styles['welcome-text']}>
          프로필을 설정하고 다른 개발자들과 소통해보세요.
        </p>
        <button onClick={onEdit} className={styles['welcome-button']}>
          프로필 설정하기
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.header}>
        <h3 className={styles.position}>
          {profile.position || '포지션을 설정해주세요'}
        </h3>
        {isOwner && (
          <button onClick={onEdit} className={styles['edit-button']}>
            {profile.position ? '수정' : '설정하기'}
          </button>
        )}
      </div>

      <div className={styles['info-line']}>
        <span>{profile.location || '지역 미설정'}</span>
        <span className={styles.dot}>•</span>
        <span>
          {profile.career !== undefined && profile.career !== null
            ? `경력 ${profile.career}년차`
            : '경력 미설정'}
        </span>
      </div>

      <div className={styles.section}>
        <h4 className={styles['section-title']}>자기소개</h4>
        <p className={styles.bio}>{profile.bio || '자기소개를 작성해주세요'}</p>
      </div>

      <div className={styles.section}>
        <h4 className={styles['section-title']}>기술 스택</h4>
        {profile.skills?.length > 0 ? (
          <div className={styles['tag-container']}>
            {profile.skills.map((skill) => (
              <span key={skill} className={styles['skill-tag']}>
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className={styles['empty-text']}>
            {isOwner
              ? '보유하고 계신 기술 스택을 추가해주세요'
              : '기술 스택 미설정'}
          </p>
        )}
      </div>

      <div className={styles.section}>
        <h4 className={styles['section-title']}>선호 분야</h4>
        {profile.preferredFields?.length > 0 ? (
          <div className={styles['tag-container']}>
            {profile.preferredFields.map((field) => (
              <span key={field} className={styles['field-tag']}>
                {field}
              </span>
            ))}
          </div>
        ) : (
          <p className={styles['empty-text']}>
            {isOwner
              ? '선호하시는 개발 분야를 추가해주세요'
              : '선호 분야 미설정'}
          </p>
        )}
      </div>

      <div className={styles.section}>
        <h4 className={styles['section-title']}>GitHub</h4>
        {profile.githubUrl ? (
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            {profile.githubUrl}
          </a>
        ) : (
          <p className={styles['empty-text']}>
            {isOwner
              ? 'GitHub 프로필 주소를 추가해주세요'
              : 'GitHub 프로필 미설정'}
          </p>
        )}
      </div>
    </div>
  );
});

// 프로필 편집 폼 컴포넌트
const ProfileForm = memo(({ editForm, onSubmit, onCancel, onChange }) => {
  const handleArrayInputChange = (field, value) => {
    if (!value.trim()) {
      onChange(field, []);
      return;
    }
    const items = value.split(',').map((item) => item.trim());
    onChange(field, items);
  };

  const handleCareerChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && parseInt(value) >= 0)) {
      onChange('career', value === '' ? null : parseInt(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...editForm,
      skills: editForm.skills || [],
      preferredFields: editForm.preferredFields || [],
    };
    onSubmit(e, formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles['form-group']}>
        <label className={styles.label}>자기소개</label>
        <textarea
          className={styles.textarea}
          value={editForm.bio || ''}
          onChange={(e) => onChange('bio', e.target.value || null)}
          placeholder="자신을 소개해주세요"
        />
      </div>

      <div className={styles['grid-two']}>
        <div className={styles['form-group']}>
          <label className={styles.label}>위치</label>
          <input
            type="text"
            className={styles.input}
            value={editForm.location || ''}
            onChange={(e) => onChange('location', e.target.value || null)}
            placeholder="서울, 경기 등"
          />
        </div>

        <div className={styles['form-group']}>
          <label className={styles.label}>경력 (년차)</label>
          <input
            type="number"
            className={styles.input}
            value={editForm.career ?? ''}
            onChange={handleCareerChange}
            min="0"
            placeholder="0"
          />
        </div>
      </div>

      <div className={styles['form-group']}>
        <label className={styles.label}>직무</label>
        <input
          type="text"
          className={styles.input}
          value={editForm.position || ''}
          onChange={(e) => onChange('position', e.target.value || null)}
          placeholder="프론트엔드 개발자, 백엔드 개발자 등"
        />
      </div>

      <div className={styles['form-group']}>
        <label className={styles.label}>기술 스택 (쉼표로 구분)</label>
        <input
          type="text"
          className={styles.input}
          value={editForm.skills?.join(', ') || ''}
          onChange={(e) => handleArrayInputChange('skills', e.target.value)}
          placeholder="JavaScript, React, Node.js"
        />
        <small className={styles['helper-text']}>
          쉼표(,)로 구분하여 입력해주세요
        </small>
      </div>

      <div className={styles['form-group']}>
        <label className={styles['label']}>선호 분야 (쉼표로 구분)</label>
        <input
          type="text"
          className={styles['input']}
          value={editForm.preferredFields?.join(', ') || ''}
          onChange={(e) =>
            handleArrayInputChange('preferredFields', e.target.value)
          }
          placeholder="웹 프론트엔드, 백엔드, DevOps"
        />
        <small className={styles['helper-text']}>
          쉼표(,)로 구분하여 입력해주세요
        </small>
      </div>

      <div className={styles['form-group']}>
        <label className={styles.label}>GitHub URL</label>
        <input
          type="url"
          className={styles.input}
          value={editForm.githubUrl || ''}
          onChange={(e) => onChange('githubUrl', e.target.value || null)}
          placeholder="https://github.com/username"
        />
      </div>

      <div className={styles['button-group']}>
        <button type="submit" className={styles['submit-button']}>
          저장
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={styles['cancel-button']}
        >
          취소
        </button>
      </div>
    </form>
  );
});

export default function ProfileInfo({
  profile: initialProfile,
  isOwner,
  onUpdate,
  userName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    ...initialProfile,
    skills: initialProfile?.skills || [],
    preferredFields: initialProfile?.preferredFields || [],
  });

  const handleInputChange = useCallback((field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/profiles/${initialProfile.userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditForm(response.data);
      setIsEditing(false);

      if (onUpdate) {
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancel = useCallback(() => {
    setEditForm(initialProfile);
    setIsEditing(false);
  }, [initialProfile]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  return (
    <div className={styles.container}>
      {isEditing ? (
        <ProfileForm
          editForm={editForm}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onChange={handleInputChange}
        />
      ) : (
        <ProfileView
          profile={initialProfile}
          isOwner={isOwner}
          onEdit={handleEdit}
          userName={userName}
        />
      )}
    </div>
  );
}
