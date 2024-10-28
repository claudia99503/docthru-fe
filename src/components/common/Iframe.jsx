import React from 'react';
import styles from './Iframe.module.css';
import assets from '@/variables/images';
import cn from '@/utils/clsx';
import Image from 'next/image';

const Iframe = ({ docUrl, width = '100%', height = '100%' }) => {
  const handleOpenLink = () => {
    window.open(docUrl, '_blank');
  };

  return (
    <div className={cn(styles.previewContainer)} style={{ width, height }}>
      <iframe
        src={docUrl}
        className={styles.iframePreview}
        title="Document Preview"
        sandbox="allow-same-origin allow-scripts allow-popups"
      ></iframe>
      <button className={styles.previewButton} onClick={handleOpenLink}>
        링크 열기
        <Image
          src={assets.icons.diagonal}
          alt="링크 열기"
          width={12}
          height={12}
        />
      </button>
    </div>
  );
};

export default Iframe;
