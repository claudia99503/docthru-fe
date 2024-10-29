import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from '@/service/api/axios';
import { GithubIcon, LinkedinIcon, Mail } from 'lucide-react';
import Edit from '@/components/mypage/edit';
import Link from 'next/link';
import styles from '@/styles/pages/profile/DevelopersPage.module.css';

const developers = [
  {
    name: '김현우',
    role: 'Backend Developer',
    image: '/assets/team/KEN2.jfif',
    description:
      'React와 TypeScript를 사용하여 사용자 경험을 개선하는데 집중합니다.',
    github: 'https://github.com/Accreditus',
    linkedin: 'https://linkedin.com/in/honggildong',
    email: 'hong@example.com',
  },
  {
    name: '김민서',
    role: 'Frontend Developer',
    image: '/assets/team/MinSeoKim.jfif',
    description:
      '확장 가능한 서버 아키텍처 설계와 데이터베이스 최적화를 담당합니다.',
    github: 'https://github.com/claudia99503',
    email: 'kim@example.com',
  },
  {
    name: '임송이',
    role: 'Frontend Developer',
    image: '/assets/team/Im-amberIm.png',
    description:
      '확장 가능한 서버 아키텍처 설계와 데이터베이스 최적화를 담당합니다.',
    github: 'https://github.com/Im-amberIm',
    email: 'kim@example.com',
  },
  {
    name: '강범준',
    role: 'Backend Developer',
    image: '/assets/team/JasonKang.jfif',
    description:
      '확장 가능한 서버 아키텍처 설계와 데이터베이스 최적화를 담당합니다.',
    github: 'https://github.com/kangbeomjoon',
    email: 'kim@example.com',
  },
  {
    name: '김민수',
    role: 'Backend Developer',
    image: '/assets/team/Minsugar98.png',
    description:
      '확장 가능한 서버 아키텍처 설계와 데이터베이스 최적화를 담당합니다.',
    github: 'https://github.com/Minsugar98',
    email: 'kim@example.com',
  },
  {
    name: '김효인',
    role: 'Backend Developer',
    image: '/assets/team/Hin.png',
    description:
      '확장 가능한 서버 아키텍처 설계와 데이터베이스 최적화를 담당합니다.',
    github: 'https://github.com/mozzi34',
    email: 'kim@example.com',
  },
  {
    name: '이율리',
    role: 'Frontend Developer',
    image: '/assets/team/yoorli.png',
    description:
      '확장 가능한 서버 아키텍처 설계와 데이터베이스 최적화를 담당합니다.',
    github: 'https://github.com/yoorli',
    email: 'kim@example.com',
  },
  {
    name: '코드잇',
    role: '코딩 교육',
    image: '/assets/team/codeit.jfif',
    description: '"배움의 기쁨을 세상 모두에게" 코드잇입니다',
    github: 'https://www.codeit.kr/',
    email: 'kim@example.com',
  },
];

const DeveloperCard = ({ developer }) => (
  <div className={styles.card}>
    <div className={styles.profileSection}>
      <img
        src={developer.image}
        alt={developer.name}
        className={styles.profileImage}
      />
      <div className={styles.profileInfo}>
        <h3 className={styles.name}>{developer.name}</h3>
        <p className={styles.role}>{developer.role}</p>
      </div>
    </div>
    <p className={styles.description}>{developer.description}</p>
    <div className={styles.socialLinks}>
      <a
        href={developer.github}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.socialLink}
      >
        <GithubIcon size={20} />
      </a>
      <a href={`mailto:${developer.email}`} className={styles.socialLink}>
        <Mail size={20} />
      </a>
    </div>
  </div>
);

export default function DevelopersPage() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  const fetchProfileData = useCallback(async (currentUserId) => {
    if (!currentUserId) return;

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DEV_API_URL}/profiles/${currentUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfileData(response.data);
      setError(null);
    } catch (error) {
      console.error('Profile fetch error:', error);
      setError(
        error.response?.data?.message || '프로필을 불러오는데 실패했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(window.atob(payload));
        setUserId(decoded.userId);
        fetchProfileData(decoded.userId);
      } catch (error) {
        console.error('토큰 디코드 실패:', error);
        setError('토큰 디코드 실패');
        router.replace('/login');
      }
    } else {
      router.replace('/login');
    }
  }, [fetchProfileData, router]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>Error: {error}</p>
        <button
          onClick={() => fetchProfileData(userId)}
          className={styles.retryButton}
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {profileData && (
        <Edit
          userInfo={{
            ...profileData.user,
            userId: profileData.userId,
          }}
        />
      )}
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>TEAM 2</h1>
          <p className={styles.subtitle}>
            Meet the talented developers behind this project
          </p>
        </div>
        <div className={styles.grid}>
          {developers.map((developer, index) => (
            <DeveloperCard key={index} developer={developer} />
          ))}
        </div>
        <div className={styles.footer}>
          <p>
            코드잇 스프린트 FS 1기 중급 프로젝트{' '}
            <Link
              href="https://github.com/Docthru"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Docthru
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
