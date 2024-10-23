import styles from './FeedbackContent.module.css';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMutateFeedback } from '@/service/mutations/feedback';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeedbacks } from '@/service/api/feedback';
import { replyKey } from '@/variables/queryKeys';
import cn from '@/utils/clsx';
import Reply from './Reply';

export default function RepliesList({ workId, feedback, onDelete, onUpdate }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: replyKey.replies(feedback.id),
      queryFn: async ({ pageParam = null }) => {
        const response = await getFeedbacks(workId, {
          cursorId: null, // 피드백 cursor는 null로 유지
          repliesCursorId: pageParam, // replies cursor 전달
          limit: 3,
        });

        // 현재 피드백의 replies 반환
        const currentFeedback = response.list.find(
          (item) => item.id === feedback.id
        );
        return (
          currentFeedback?.replies || {
            list: [],
            meta: { hasNext: false, nextCursor: null },
          }
        );
      },
      getNextPageParam: (lastPage) => {
        return lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined;
      },
      initialData: {
        pages: [feedback.replies],
        pageParams: [null],
      },
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 모든 페이지의 replies를 하나의 배열로 합치기
  const allReplies = React.useMemo(() => {
    const repliesMap = new Map();
    data?.pages.forEach((page) => {
      page.list?.forEach((reply) => {
        repliesMap.set(reply.id, reply);
      });
    });
    return Array.from(repliesMap.values());
  }, [data?.pages]);

  if (!allReplies.length) {
    return <div className={styles.empty}>아직 답글이 없습니다.</div>;
  }

  return (
    <div className={cn(styles.repliesList, styles.slideDown)}>
      {allReplies.map((reply) => (
        <Reply
          key={reply.id}
          reply={reply}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
      {hasNextPage && (
        <div ref={ref} className={styles.loadingTrigger}>
          {isFetchingNextPage && (
            <div className={styles.loading}>로딩중...</div>
          )}
        </div>
      )}
    </div>
  );
}
