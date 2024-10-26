import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Border from '@/components/common/Border';
import TextEditor from '@/components/work/TextEditor';
import styles from './WorkForm.module.css';
import cn from '@/utils/clsx';
import assets from '@/variables/images';

export default function WorkForm({
  title,
  content,
  setContent,
  submitAction,
  giveUpAction,
}) {
  const textEditorRef = useRef(null);

  const handleSave = () => {
    if (textEditorRef.current) {
      textEditorRef.current.saveContent();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitAction();
  };

  return (
    <>
      <div className={styles.top}>
        <Link href="/">
          <Image
            className={styles.logo}
            src={assets.images.logo}
            alt="logo"
            width={120}
            height={27}
            priority
          />
        </Link>

        <div className={styles.buttons}>
          <Button
            variant="cancel"
            className={cn(styles.btn, styles.cancel)}
            width="60"
            onClick={giveUpAction}
          >
            <span>포기</span>
          </Button>
          <Button
            variant="white-border"
            onClick={handleSave}
            className={cn(styles.btn, styles.save)}
          >
            임시저장
          </Button>
          <Button
            variant="black"
            className={cn(styles.btn, styles.submit)}
            onClick={handleSubmit}
          >
            제출하기
          </Button>
        </div>
      </div>

      <h1 className={styles.title}>{title}</h1>

      <Border gap="24px" />

      <TextEditor
        ref={textEditorRef}
        content={content}
        setContent={setContent}
      />
    </>
  );
}
