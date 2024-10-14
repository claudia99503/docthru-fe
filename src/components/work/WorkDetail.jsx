import styles from './WorkDetail.module.css';
import DocTypeChip from '@/components/common/DocTypeChip';
import { Profile } from '@/components/common/Profile';
import LikeButton from '@/components/common/LikeButton';
import KebabMenu from '@/components/common/KebabMenu';

export default function WorkDetail() {
  return (
    <section>
      <div className={styles.WorkDetail}>
        <h1>{workData.challenge.title}</h1>
        <KebabMenu />
      </div>
      <DocTypeChip field={challenge.field} docType={challenge.docType} />
      <Profile user={user} type="simple" />
      <LikeButton data={workData} />
    </section>
  );
}
