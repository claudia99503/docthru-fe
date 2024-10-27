import { useEffect, useState } from 'react';
import Svg from '../common/Svg';
import styles from './SourceViewer.module.css';
import Iframe from '../common/Iframe';
import Image from 'next/image';
import assets from '@/variables/images';
import cn from '@/utils/clsx';

export default function SourceViewer({ docUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openPanel = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  const closePanel = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isClosing]);

  return (
    <section className={styles.SourceViewer}>
      {!isOpen && (
        <button
          type="button"
          onClick={openPanel}
          className={styles.viewerButton}
        >
          <Image
            src={assets.icons.list}
            width={24}
            height={24}
            alt="list icon"
          />
          <span className={styles.text}>원문</span>
        </button>
      )}

      {isOpen && (
        <section
          className={cn(styles.SidePanel, {
            [styles.open]: isOpen && !isClosing,
            [styles.close]: isClosing,
          })}
        >
          <button
            className={styles['close-btn']}
            onClick={closePanel}
            type="button"
          >
            <Svg name="outCircle" width="32" />
          </button>
          <Iframe docUrl={docUrl} width="100%" height="100%" />
        </section>
      )}
    </section>
  );
}
