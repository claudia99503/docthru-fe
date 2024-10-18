import styles from './WorkDetail.module.css';
import DocTypeChip from '@/components/common/DocTypeChip';
import { Profile } from '@/components/common/Profile';
import LikeButton from '@/components/common/LikeButton';
import KebabMenu from '@/components/common/KebabMenu';

export default function WorkDetail({ data }) {
  if (!data) {
    return <div>데이터 없음</div>;
  }

  const { challenge, ...rest } = data;

  return (
    <section className={styles.WorkDetail}>
      <div className={styles.heading}>
        <h1 className={styles.title}>{data.challenge.title}</h1>
        <KebabMenu />
      </div>
      <DocTypeChip field={challenge.field} docType={challenge.docType} />
      <div className={styles['user-info']}>
        <Profile user={rest} type="simple" />
        <LikeButton data={data} isButton={true} />
      </div>
      <p className={styles.content}>{data.content}</p>
    </section>
  );
}
