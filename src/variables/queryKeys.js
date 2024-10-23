export const workKey = {
  all: ['work'],
  details: () => [...workKey.all, 'detail'],
  detail: (workId) => [...workKey.details(), workId],
  feedbacks: (workId) => [...workKey.detail(workId), 'feedbacks'],
};

export const replyKey = {
  all: ['replies'],
  lists: () => [...replyKey.all, 'list'],
  list: (filters) => [...replyKey.lists(), { filters }],
  replies: (feedbackId) => [...replyKey.all, feedbackId],
};
