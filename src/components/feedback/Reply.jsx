import React, { useState } from 'react';
import { Profile } from '../common/Profile';
import { useMutateFeedback } from '@/service/mutations/feedback';
import UpdateFeedbackForm from './UpdatedFeedbackForm';
import KebabMenu from '../common/KebabMenu';
import { useDeleteModal } from '@/hooks/useModal';
import styles from './FeedbackContent.module.css';

function Reply({ reply, onDelete, onUpdate }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { onModalOpen, Modal } = useDeleteModal();
  const { mutate } = useMutateFeedback();

  const handleEdit = () => setIsEditMode(true);
  const handleCancel = () => setIsEditMode(false);

  const handleDelete = () => {
    onModalOpen({
      msg: '답글을 삭제하시겠어요?',
      action: () => {
        onDelete(reply.id);
      },
    });
  };

  const handleUpdate = (data) => {
    onUpdate(reply.id, data);
    setIsEditMode(false);
  };

  return (
    <div className={styles.reply}>
      {!isEditMode ? (
        <>
          <div className={styles.replyTop}>
            <Profile user={reply.user} date={reply.updatedAt} />
            {reply.isEditable && (
              <KebabMenu onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </div>
          <p className={styles.replyText}>{reply.content}</p>
          <Modal />
        </>
      ) : (
        <UpdateFeedbackForm
          onSubmit={handleUpdate}
          initialData={reply}
          onClick={handleCancel}
          className={styles.replyEdit}
        />
      )}
    </div>
  );
}

export default Reply;
