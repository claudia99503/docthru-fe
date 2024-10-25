import styles from './FeedbackContent.module.css';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getReplies } from '@/service/api/feedback';
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
        const response = await getReplies(feedback.id, {
          cursorId: pageParam,
          limit: 3,
        });
        return response;
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage?.meta?.hasNext) return undefined;
        return lastPage.meta.nextCursor;
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
