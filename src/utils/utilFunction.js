export function formatLikes(likeCount) {
  const numOfLikes = likeCount ? parseInt(likeCount) : 0;

  if (numOfLikes >= 9999) {
    return `9999+`;
  }
  return numOfLikes;
}

// 날짜를 'YY/MM/DD' 형식으로 변환하는 함수
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(2); // 연도 마지막 두 자리
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월 (1부터 시작)
  const day = date.getDate().toString().padStart(2, '0'); // 일
  return `${year}/${month}/${day}`;
};
