import styles from './DocTypeChip.module.css';
import { quantico } from '@/variables/fonts';

export const STATUS = {
  color: {
    NEXTJS: '#79E16A',
    API: '#FF905E',
    CAREER: '#Career',
    MODERNJS: '#F66E6B',
    WEB: '#F7EA5D',
  },
  name: {
    NEXTJS: 'Next.js',
    API: 'API',
    CAREER: 'Career',
    MODERNJS: 'Modern JS',
    WEB: 'Web',
  },
};

export default function DocTypeChip({ status }) {
  const color = STATUS.color[status];

  return (
    <div
      className={`${styles.DocTypeChip} ${quantico.className}`}
      style={{ '--bg-color': color }}
    >
      <span className={styles.text}>{STATUS.name[status]}</span>
    </div>
  );
}
