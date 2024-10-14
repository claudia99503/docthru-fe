import styles from './DocTypeChip.module.css';
import { quantico } from '@/variables/fonts';

export const FIELD = {
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

export function ChipField({ field }) {
  const color = FIELD.color[field];

  return (
    <div
      className={`${styles.ChipField} ${quantico.className}`}
      style={{ '--bg-color': color }}
    >
      <span className={styles.text}>{FIELD.name[field]}</span>
    </div>
  );
}

export function ChipType({ type }) {
  const docType = type === 'OFFICIAL' ? '공식 문서' : '블로그';
  return (
    <div className={`${styles.ChipType}`}>
      <span className={styles.text}>{docType}</span>
    </div>
  );
}

export default function DocTypeChip({ field, docType }) {
  return (
    <div className={`${styles.DocTypeChip}`}>
      <ChipField field={field} />
      <ChipType type={docType} />
    </div>
  );
}
