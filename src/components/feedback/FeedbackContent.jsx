import styles from './FeedbackContent.module.css';
import { useState } from 'react';
import { Profile } from '../common/Profile';
import { useMutateFeedback } from '@/service/mutations/feedback';
import UpdateFeedbackForm from './UpdatedFeedbackForm';
import KebabMenu from '../common/KebabMenu';
import cn from '@/utils/clsx';

export default function FeedbackContent({ feedback }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const { user } = feedback;

  const { mutate } = useMutateFeedback({});

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  const handleDelete = () => {
    mutate({ id: feedback.id, action: 'delete' });
  };

  const handleUpdateSubmit = (data) => {
    const content = data.content.trim('');
    const updateFeedback = { content };
    mutate(
      { id: feedback.id, action: 'edit', ...updateFeedback },
      {
        onSuccess: () => {
          console.log('successUpdateFeedback', updateFeedback);
          setIsEditMode(false);
        },
      }
    );
  };

  return !isEditMode ? (
    <li className={cn(styles.FeedbackContent)}>
      <div className={styles.top}>
        <Profile user={user} date={feedback.updatedAt} />
        <KebabMenu onEdit={handleEditClick} onDelete={handleDelete} />
      </div>
      <p className={styles.text}>{feedback.content}</p>
    </li>
  ) : (
    <li className={cn(styles.FeedbackContent, styles.edit)}>
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
