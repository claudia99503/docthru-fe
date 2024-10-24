'use client';

import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '@/styles/pages/work/mutateWork.module.css';
import assets from '@/variables/images';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/common/Button';
import cn from '@/utils/clsx';
import Border from '@/components/common/Border';
import TextEditor from '@/components/work/TextEditor';
import { useRef } from 'react';

//challengeId 받아야됨...
export default function CreateWorkPage() {
  const textEditorRef = useRef(null); // 하위 컴포넌트 참조

  // 상위에서 임시 저장 버튼 클릭 시 호출되는 함수
  const handleSave = () => {
    if (textEditorRef.current) {
      textEditorRef.current.saveContent(); // 하위에서 제공되는 저장 함수 호출
    }
  };

  return (
    <>
      <Head>
        <title>작업 도전하기</title>
        <meta
          name="description"
          content="새로운 작업을 도전하고 생성하는 페이지입니다."
        />
      </Head>

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
          >
            <span>포기</span>
            <Image
              src={assets.icons.giveUp}
              width={24}
              height={24}
              alt="give-up challenge button"
            />
          </Button>
          <Button
            variant="white-border"
            onClick={handleSave}
            className={cn(styles.btn, styles.save)}
          >
            임시저장
          </Button>
          <Button variant="black" className={cn(styles.btn, styles.submit)}>
            제출하기
          </Button>
        </div>
      </div>

      <h1 className={styles.title}>도전하는 챌린지 제목</h1>

      <Border gap="24px" />

      <TextEditor ref={textEditorRef} />
    </>
  );
}
