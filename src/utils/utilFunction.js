export function formatLikes(likeCount) {
  const numOfLikes = likeCount ? parseInt(likeCount) : 0;

  if (numOfLikes >= 9999) {
    return `9999+`;
  }
  return numOfLikes;
}
