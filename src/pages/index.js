import { useState } from "react";
import Head from "next/head";
import Container from "../components/Container";

export default function Home() {
  const [showContainer, setShowContainer] = useState(false);
  const [isOngoing, setIsOngoing] = useState(false);

  const handleButtonClick = () => {
    setShowContainer(true);
    setIsOngoing(false);
  };

  return (
    <>
      <Head>
        <title>챌린지 목록 페이지</title>
      </Head>
      <div>
        <h1>챌린지 목록 페이지 내용</h1>

        <button onClick={handleButtonClick}>Container 컴포넌트 보기</button>

        {showContainer && (
          <Container
            deadline="2024-12-31"
            participants={10} // 참가자 수
            maxParticipants={20} // 최대 참가자 수
            progress={isOngoing} // 진행 중 여부
          />
        )}
      </div>
    </>
  );
}

