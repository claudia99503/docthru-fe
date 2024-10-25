import styles from './FeedbackContent.module.css';
import React, { useState } from 'react';
import { Profile } from '../common/Profile';
import { useMutateFeedback } from '@/service/mutations/feedback';
import UpdateFeedbackForm from './UpdatedFeedbackForm';
import KebabMenu from '../common/KebabMenu';
import cn from '@/utils/clsx';
import { useDeleteModal } from '@/hooks/useModal';
import { ChevronDown, ChevronUp } from 'lucide-react';
import RepliesList from './RepliesList';
import Button from '../common/Button';

// 답글 작성 폼 컴포넌트
function ReplyForm({ onSubmit, onCancel }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit({ content: content.trim() });
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.replyForm}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="답글을 작성해주세요"
        className={styles.replyTextarea}
      />
      <div className={styles.replyButtons}>
        <button variant="cancel" onClick={onCancel} className={styles.cancel}>
          취소
        </button>
        <Button
          type="submit"
          borderRadius="8px"
          fontSize="14px"
          padding="4px 10px"
          variant="black"
        >
          답글 달기
        </Button>
      </div>
    </form>
  );
}

// 답글 토글 버튼 컴포넌트
function RepliesToggle({ isOpen, repliesCount, onClick }) {
  return (
    <button onClick={onClick} className={styles.toggleButton}>
      {isOpen ? (
        <>
          <ChevronUp size={16} />
          <span>답글 숨기기</span>
        </>
      ) : (
        <>
          <ChevronDown size={16} />
          <span>답글 보기</span>
        </>
      )}
    </button>
  );
}

export default function FeedbackContent({ feedback }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const { onModalOpen, Modal } = useDeleteModal();
  const { mutate } = useMutateFeedback({});

  const repliesCount = feedback.replies?.list?.length || 0;
  const hasMoreReplies = feedback.replies?.meta?.hasNext || false;

  const handleEditClick = () => setIsEditMode(true);
  const handleCancelClick = () => setIsEditMode(false);

  const handleDelete = () => {
    mutate({ id: feedback.id, action: 'delete' });
  };

  const handleUpdateSubmit = (data) => {
    const content = data.content.trim();
    mutate(
      { id: feedback.id, action: 'edit', content },
      {
        onSuccess: () => setIsEditMode(false),
      }
    );
  };

  const handleReplySubmit = (data) => {
    mutate(
      {
        id: feedback.id,
        workId: feedback.workId,
        action: 'reply',
        content: data.content,
      },
      {
        onSuccess: () => {
          setShowReplyForm(false);
          setIsRepliesOpen(true); // 답글 작성 후 자동으로 펼치기
        },
      }
    );
  };

  const handleReplyDelete = (replyId) => {
    mutate({ id: replyId, action: 'delete', isReply: true });
  };

  const handleReplyUpdate = (replyId, data) => {
    mutate({
      id: replyId,
      action: 'edit',
      isReply: true,
      content: data.content,
    });
  };

  return (
    <>
      {!isEditMode ? (
        <li className={cn(styles.FeedbackContent)}>
          <div className={styles.top}>
            <Profile user={feedback.user} date={feedback.updatedAt} />
            {feedback.isEditable && (
              <KebabMenu
                onEdit={handleEditClick}
                onDelete={() =>
                  onModalOpen({
                    msg: '피드백을 삭제하시겠어요?',
                    action: handleDelete,
                  })
                }
              />
            )}
          </div>
          <p className={styles.text}>{feedback.content}</p>

          <div className={styles.replyControls}>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className={styles.replyButton}
            >
              답글 달기
            </button>

            {repliesCount > 0 && (
              <RepliesToggle
                isOpen={isRepliesOpen}
                repliesCount={repliesCount}
                onClick={() => setIsRepliesOpen(!isRepliesOpen)}
                hasMore={hasMoreReplies}
              />
            )}
          </div>
          {isRepliesOpen && (
            <RepliesList
              workId={feedback.workId}
              feedback={feedback}
              onDelete={handleReplyDelete}
              onUpdate={handleReplyUpdate}
            />
          )}
          {showReplyForm && (
            <ReplyForm
              onSubmit={handleReplySubmit}
              onCancel={() => setShowReplyForm(false)}
            />
          )}
        </li>
      ) : (
        <li className={cn(styles.FeedbackContent, styles.edit)}>
          <div className={styles.top}>
            <Profile user={feedback.user} date={feedback.updatedAt} />
            <UpdateFeedbackForm
              onSubmit={handleUpdateSubmit}
              initialData={feedback}
              onClick={handleCancelClick}
              className={styles.buttons}
            />
          </div>
        </li>
      )}
      <Modal />
    </>
  );
}
