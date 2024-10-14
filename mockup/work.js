export const work = {
  id: 1,
  description:
    'API 챌린지의 첫 번째 번역 작업입니다. 이 번역에서는 Express.js를 사용하여 사용자 엔티티에 대한 CRUD 작업을 처리하는 방법에 대해 설명하고 있습니다. 또한 오류 처리 및 검증을 포함했습니다.',
  lastModifiedAt: '2024-10-12T12:30:00Z',
  isSubmitted: true,
  submittedAt: '2024-10-10T12:45:00Z',
  likeCount: 5,
  challenge: {
    id: 1,
    title: 'API Challenge',
    field: 'API',
    docType: 'OFFICIAL',
  },
  user: {
    id: 1,
    nickName: 'Alice',
    role: 'USER',
  },
};

export const feedbacks = [
  {
    id: 1,
    user: {
      id: 2,
      nickName: 'Bob',
      role: 'USER',
      grade: 'EXPERT',
    },
    content:
      '번역이 매우 잘되었습니다! 특히 오류 처리에 대한 설명이 명확해서 좋았습니다. 다만, CRUD 작업에 대한 용어 사용이 좀 더 일관되면 좋을 것 같아요.',
    createdAt: '2024-10-11T09:00:00Z',
  },
  {
    id: 2,
    user: {
      id: 3,
      nickName: 'Charlie',
      role: 'USER',
      grade: 'NORMAL',
    },
    content:
      'API 설명 부분에서 좀 더 구체적인 예시를 추가해주시면 좋겠습니다. 그 외에는 훌륭한 번역이네요!',
    createdAt: '2024-10-12T10:15:00Z',
  },
  {
    id: 3,
    user: {
      id: 4,
      nickName: 'David',
      role: 'USER',
      grade: 'NORMAL',
    },
    content:
      '번역이 명확하고 이해하기 쉬웠습니다. 문장 구조가 약간 어색한 부분이 있으니 조금만 다듬으면 좋을 것 같습니다.',
    createdAt: '2024-10-13T08:45:00Z',
  },
  {
    id: 4,
    user: {
      id: 5,
      nickName: 'Eve',
      role: 'USER',
      grade: 'EXPERT',
    },
    content:
      '좋은 번역입니다! 하지만 몇 가지 기술 용어의 번역이 자연스럽지 않아서 다시 한번 검토해보면 좋을 것 같아요.',
    createdAt: '2024-10-13T11:20:00Z',
  },
  {
    id: 5,
    user: {
      id: 6,
      nickName: 'Frank',
      role: 'USER',
      grade: 'NORMAL',
    },
    content:
      '내용이 잘 전달되었습니다. 그러나 몇몇 부분에서 더 명확한 용어를 사용할 수 있을 것 같아요.',
    createdAt: '2024-10-14T09:30:00Z',
  },
  {
    id: 6,
    user: {
      id: 7,
      nickName: 'Grace',
      role: 'USER',
      grade: 'EXPERT',
    },
    content:
      '번역 품질이 좋습니다. 다만, 에러 처리 관련 문장들이 조금 더 간결해지면 좋을 것 같아요.',
    createdAt: '2024-10-14T10:45:00Z',
  },
  {
    id: 7,
    user: {
      id: 8,
      nickName: 'Henry',
      role: 'USER',
      grade: 'NORMAL',
    },
    content:
      '대체로 훌륭한 번역입니다. 특히 CRUD 작업 설명이 아주 이해하기 쉬웠어요.',
    createdAt: '2024-10-14T12:15:00Z',
  },
  {
    id: 8,
    user: {
      id: 9,
      nickName: 'Isabelle',
      role: 'USER',
      grade: 'EXPERT',
    },
    content:
      '기술 용어의 번역이 매우 정확합니다. 그러나 몇몇 문장이 너무 길어 가독성이 떨어질 수 있어요.',
    createdAt: '2024-10-14T13:00:00Z',
  },
  {
    id: 9,
    user: {
      id: 10,
      nickName: 'Jack',
      role: 'USER',
      grade: 'NORMAL',
    },
    content:
      '문법적으로 문제가 없는 번역이지만, 조금 더 자연스럽게 다듬을 수 있을 것 같아요.',
    createdAt: '2024-10-14T13:30:00Z',
  },
  {
    id: 10,
    user: {
      id: 11,
      nickName: 'Kara',
      role: 'USER',
      grade: 'EXPERT',
    },
    content:
      '전체적인 번역 흐름이 매우 좋습니다. 다만 세부적으로 번역이 더 깔끔하게 될 수 있는 부분들이 있어요.',
    createdAt: '2024-10-14T14:00:00Z',
  },
  {
    id: 11,
    user: {
      id: 12,
      nickName: 'Leo',
      role: 'USER',
      grade: 'NORMAL',
    },
    content:
      '기술적인 내용은 아주 정확하게 번역되었지만, 약간의 의미 전달 오류가 있어요. 다시 한번 검토해보면 좋을 것 같습니다.',
    createdAt: '2024-10-14T14:30:00Z',
  },
  {
    id: 12,
    user: {
      id: 13,
      nickName: 'Mia',
      role: 'USER',
      grade: 'EXPERT',
    },
    content: '번역 품질이 매우 높습니다. 특히 복잡한 문장의 번역이 훌륭합니다.',
    createdAt: '2024-10-14T15:00:00Z',
  },
];
