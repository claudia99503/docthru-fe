import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Border from '@/components/common/Border';
import TextEditor from '@/components/work/TextEditor';
import styles from './WorkForm.module.css';
import cn from '@/utils/clsx';
import assets from '@/variables/images';
import Loader from '../common/Loader';
import Svg from '../common/Svg';

export default function WorkForm({
  id,
  title,
  content,
  setContent,
  submitAction,
  giveUpAction,
  isAdmin,
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

  if (!id) return <Loader />;

  return (
    <section className={styles.WorkForm}>
      <div className={styles.top}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.buttons}>
          {!isAdmin && (
            <Button
              variant="cancel"
              className={cn(styles.btn, styles.cancel)}
              width="60"
              onClick={giveUpAction}
            >
              포기
              <Image
                src={assets.icons.giveUp}
                width={24}
                height={24}
                alt="icon"
              />
            </Button>
          )}
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

      <Border gap="16px" />

      <TextEditor
        id={id}
        ref={textEditorRef}
        content={content}
        setContent={setContent}
      />
    </section>
  );
}
