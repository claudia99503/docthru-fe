import { useState } from 'react';
import Head from 'next/head';
import Container from '../components/Container';
import DocTypeChip from '@/components/ui/DocTypeChip';

export default function Home() {
  return (
    <>
      <Head>
        <title>챌린지 목록 페이지</title>
      </Head>
      <div>
        <h1>챌린지 목록 페이지 내용</h1>
      </div>
      <DocTypeChip status="NEXTJS" />
    </>
  );
}
