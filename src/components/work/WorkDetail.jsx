import styles from './WorkDetail.module.css';
import DocTypeChip from '@/components/common/DocTypeChip';
import { Profile } from '@/components/common/Profile';
import LikeButton from '@/components/common/LikeButton';
import KebabMenu from '@/components/common/KebabMenu';
import { formatDate } from '@/utils/utilFunction';
import { useDeleteWork, useMutateLikes } from '@/service/mutations/work';
import { useDeleteModal } from '@/hooks/useModal';

export default function WorkDetail({ data }) {
  if (!data) {
    return <div>데이터 없음</div>;
  }
  const { isLike: isLiked, workId, challenge, isEditable, ...rest } = data;

  const { onModalOpen, Modal } = useDeleteModal();
  const { mutate: LikeMutate } = useMutateLikes(workId, isLiked);
  const { mutate: deleteWork } = useDeleteWork();

  const handleEdit = (workId) => {
    router.push(`/work/${workId}/edit`);
  };

  const handleDelete = (workId) => {
    if (workId) {
      deleteWork(workId);
    }
  };

  const clickDelete = () => {
    onModalOpen({
      msg: '삭제하시겠습니까?',
      action: (workId) => handleDelete(workId),
    });
  };

  const toggleLikeButton = () => {
    if (workId) {
      LikeMutate({ id: workId, isLiked });
    }
  };

  return (
    <>
      <section className={styles.WorkDetail}>
        <div className={styles.heading}>
          <h1 className={styles.title}>{data.challenge.title}</h1>
          {isEditable && (
            <KebabMenu
              onEdit={() => handleEdit(id)}
              onDelete={() => clickDelete(workId)}
            />
          )}
        </div>
        <DocTypeChip field={challenge.field} docType={challenge.docType} />
        <div className={styles.info}>
          <div className={styles['user-info']}>
            <Profile user={rest} type="simple" />
            <LikeButton
              data={data}
              isButton={true}
              onClick={toggleLikeButton}
            />
          </div>
          <time className={styles.time}>{formatDate(data.createdAt)}</time>
        </div>
        <p className={styles.content}>{data.content}</p>
      </section>
      <Modal />
    </>
  );
}
