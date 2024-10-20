import styles from './FeedbackContent.module.css';
import { useState } from 'react';
import { Profile } from '../common/Profile';
import { useMutateFeedback } from '@/service/mutations/feedback';
import UpdateFeedbackForm from './UpdatedFeedbackForm';
import KebabMenu from '../common/KebabMenu';

export default function FeedbackContent({ feedback }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [action, setAction] = useState('');

  const { user, workId } = feedback;

  const { mutate } = useMutateFeedback({
    id: feedback.id,
    workId,
    action,
  });

  const handleEditClick = () => {
    setIsEditMode(true);
    setAction('edit');
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setAction('');
  };

  const handleDelete = () => {
    setAction('delete');
    mutate();
  };
  const handleUpdateSubmit = (data) => {
    const updateFeedback = { content: data.content };
    mutate(updateFeedback, {
      onSuccess: () => {
        console.log('successUpdateFeedback', updateFeedback);
        setIsEditMode(false);
        setAction('');
      },
    });
  };

  return !isEditMode ? (
    <li className={styles.FeedbackContent}>
      <div className={styles.top}>
        <Profile user={user} date={feedback.updatedAt} />
        <KebabMenu onEdit={handleEditClick} onDelete={handleDelete} />
      </div>
      <p className={styles.text}>{feedback.content}</p>
    </li>
  ) : (
    <li className={styles.FeedbackContent}>
      <div className={styles.top}>
        <Profile user={user} date={feedback.updatedAt} />
        <UpdateFeedbackForm
          onSubmit={handleUpdateSubmit}
          initialData={feedback}
          onClick={handleCancelClick}
        />
      </div>
    </li>
  );
}
