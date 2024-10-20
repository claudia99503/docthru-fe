import { useGeWorkFeedbacks } from '@/service/queries/work';
import styles from './FeedbackList.module.css';
import EmptyFeedbacks from './EmptyFeedbacks';

export default function FeedbackList(workId) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGeWorkFeedbacks(workId);

  if (status === 'loading') return <Loader />;

  const pages = data?.pages || [];
  const isEmpty = pages[0]?.list.length === 0 || pages?.length === 0;

  return isEmpty ? (
    <EmptyFeedbacks />
  ) : (
    <>
      <ul className={styles.FeedbackList}>
        {pages.map((page) => {
          return page.list.map((feedback) => {
            return <FeedbackContent key={feedback.id} feedback={feedback} />;
          });
        })}
      </ul>
      {hasNextPage && !isFetchingNextPage && (
        <button onClick={fetchNextPage} className={styles.loadMoreButton}>
          더 불러오기
        </button>
      )}

      {isFetchingNextPage && <Loader msg="더 불러오는 중..." />}

      {!hasNextPage && !isFetchingNextPage && (
        <Message msg="더 불러올 댓글이 없습니다." />
      )}
    </>
  );
}
