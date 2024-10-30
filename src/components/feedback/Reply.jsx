import React, { useState } from 'react';
import { Profile } from '../common/Profile';
import UpdateFeedbackForm from './UpdatedFeedbackForm';
import KebabMenu from '../common/KebabMenu';
import { useDeleteModal } from '@/hooks/useModal';
import styles from './FeedbackContent.module.css';
import cn from '@/utils/clsx';
import Loader from '../common/Loader';

function Reply({ reply, onDelete, onUpdate, isPending }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { onModalOpen, Modal } = useDeleteModal();

  const handleEdit = () => setIsEditMode(true);
  const handleCancel = () => setIsEditMode(false);

  const handleUpdate = (data) => {
    onUpdate(reply.id, data);
    setIsEditMode(false);
  };

  const handleDelete = async () => {
    await onModalOpen({
      msg: '답글을 삭제하시겠어요?',
      action: () => {
        onDelete(reply.id);
      },
    });
  };
  if (isPending) return <Loader />;
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
        <ul className={cn(styles.FeedbackContent, styles.edit)}>
          <div className={styles.top}>
            <Profile user={reply.user} date={reply.updatedAt} />
            <UpdateFeedbackForm
              onSubmit={handleUpdate}
              initialData={reply}
              onClick={handleCancel}
              className={styles.buttons}
            />
          </div>
        </ul>
      )}
    </div>
  );
}

export default Reply;
