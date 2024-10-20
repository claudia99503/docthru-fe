import { useGeWorkFeedbacks } from '@/service/queries/work';
import styles from './FeedbackList.module.css';

export default function FeedbackList(workId) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGeWorkFeedbacks(workId);

  if (status === 'loading') return <Loader />;
  if (status === 'error') {
    const errMsg = error?.message;
    return <Message type="error" msg={errMsg} />;
  }

  if (!data) return <div> feedback data가 없음</div>;

  const pages = data?.pages || [];

  const isEmpty = pages[0].list.length === 0;

  return isEmpty ? (
    <EmptyFeedbacks />
  ) : (
    <>
      <ul className={styles.FeedbackList}>
        {pages.map((page) => {
          return page.list.map((feedback) => {
            return <FeedbackContent feedback={feedback} />;
          });
        })}
      </ul>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        더 불러오기
        {isFetchingNextPage ? (
          <Loader msg="더 불러오는중" />
        ) : hasNextPage ? (
          <Loader msg="새 댓글 불러오는 중" />
        ) : (
          <Message msg="더 불러올 댓글이 없습니다" />
        )}
      </button>
    </>
  );
}
