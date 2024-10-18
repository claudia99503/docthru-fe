export const workKey = {
  all: ['work'],
  details: () => [...workKey.all, 'detail'],
  detail: (workId) => [...workKey.details(), workId],
  feedbacks: (workId) => [...workKey.detail(workId), 'feedbacks'],
};
