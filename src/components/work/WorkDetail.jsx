import styles from './WorkDetail.module.css';
import DocTypeChip from '@/components/common/DocTypeChip';
import { Profile } from '@/components/common/Profile';
import LikeButton from '@/components/common/LikeButton';
import KebabMenu from '@/components/common/KebabMenu';
import { formatDate } from '@/utils/utilFunction';

export default function WorkDetail({ data }) {
  if (!data) {
    return <div>데이터 없음</div>;
  }
  const id = data.id;
  const { challenge, isEditable, ...rest } = data;

  const handleEdit = (id) => {
    router.push('edit');
  };

  const handleDelete = () => {};

  return (
    <section className={styles.WorkDetail}>
      <div className={styles.heading}>
        <h1 className={styles.title}>{data.challenge.title}</h1>
        {isEditable && (
          <KebabMenu onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
      <DocTypeChip field={challenge.field} docType={challenge.docType} />
      <div className={styles.info}>
        <div className={styles['user-info']}>
          <Profile user={rest} type="simple" />
          <LikeButton data={data} isButton={true} />
        </div>
        <time className={styles.time}>{formatDate(data.createdAt)}</time>
      </div>
      <p className={styles.content}>{data.content}</p>
    </section>
  );
}
