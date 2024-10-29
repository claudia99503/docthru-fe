export const workKey = {
  all: ['works'],
  lists: () => [...workKey.all, 'list'],
  list: (challengeId, params = {}) => [...workKey.lists(),challengeId, { ...params }],
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

export const challengeKey = {
  all: ['challenges'],
  lists: () => [...challengeKey.all, 'list'],
  list: (params = {}) => [...challengeKey.lists(), { ...params }],
  details: () => [...challengeKey.all, 'detail'],
  detail: (challengeId) => [...challengeKey.details(), challengeId],
};
