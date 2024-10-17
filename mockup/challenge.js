export const challengeList = [{
  "meta": {
    "currentPage": 1,
    "totalCount": 10,
    "totalPages": 1
  },
  "list": [
    {
      "id": 1,
      "title": "NEXTJS 튜토리얼 번역 챌린지",
      "field": "NEXTJS",
      "docType": "OFFICIAL",
      "description": "NEXTJS 관련 튜토리얼 번역 작업.",
      "docUrl": "https://www.example.com/NEXTJS-WEB",
      "deadline": "2024-12-31T23:59:59.000Z",
      "progress": true,
      "participates": 3,
      "maxParticipates": 5
    },
    {
      "id": 2,
      "title": "API 문서 번역 챌린지",
      "field": "API",
      "docType": "DOCUMENTATION",
      "description": "API 공식 문서를 번역합니다.",
      "docUrl": "https://www.example.com/js-doc",
      "deadline": "2024-11-30T23:59:59.000Z",
      "progress": false,
      "participates": 0,
      "maxParticipates": 10
    },
    {
      "id": 3,
      "title": "CAREER 라이브러리 소개",
      "field": "CAREER",
      "docType": "LIBRARY",
      "description": "CAREER 라이브러리 소개 자료 번역.",
      "docUrl": "https://www.example.com/python-library",
      "deadline": "2024-10-15T23:59:59.000Z",
      "progress": false,
      "participates": 2,
      "maxParticipates": 7
    },
    {
      "id": 4,
      "title": "MODERNJS 가이드 번역",
      "field": "MODERNJS",
      "docType": "OFFICIAL",
      "description": "MODERNJS 관련 가이드를 번역합니다.",
      "docUrl": "https://www.example.com/vue-guide",
      "deadline": "2024-10-20T23:59:59.000Z",
      "progress": true,
      "participates": 5,
      "maxParticipates": 6
    },
    {
      "id": 5,
      "title": "WEB 문서 번역",
      "field": "WEB",
      "docType": "DOCUMENTATION",
      "description": "WEB 공식 문서를 번역합니다.",
      "docUrl": "https://www.example.com/django-doc",
      "deadline": "2024-11-15T23:59:59.000Z",
      "progress": false,
      "participates": 1,
      "maxParticipates": 8
    },
    {
      "id": 6,
      "title": "WEB 블로그 포스트 번역",
      "field": "WEB",
      "docType": "BLOG",
      "description": "WEB 관련 블로그 글을 번역합니다.",
      "docUrl": "https://www.example.com/kotlin-blog",
      "deadline": "2024-10-25T23:59:59.000Z",
      "progress": false,
      "participates": 3,
      "maxParticipates": 10
    },
    {
      "id": 7,
      "title": "NEXTJS API 문서 번역",
      "field": "NEXTJS",
      "docType": "OFFICIAL",
      "description": "NEXTJS API 문서를 번역합니다.",
      "docUrl": "https://www.example.com/nodejs-api",
      "deadline": "2024-11-01T23:59:59.000Z",
      "progress": true,
      "participates": 4,
      "maxParticipates": 6
    },
    {
      "id": 8,
      "title": "API 블로그 글 번역",
      "field": "API",
      "docType": "BLOG",
      "description": "API 관련 블로그 글을 번역합니다.",
      "docUrl": "https://www.example.com/ruby-blog",
      "deadline": "2024-12-01T23:59:59.000Z",
      "progress": false,
      "participates": 1,
      "maxParticipates": 5
    },
    {
      "id": 9,
      "title": "CAREER 튜토리얼 번역",
      "field": "CAREER",
      "docType": "OFFICIAL",
      "description": "CAREER 관련 튜토리얼 번역 작업.",
      "docUrl": "https://www.example.com/flutter-WEB",
      "deadline": "2024-12-15T23:59:59.000Z",
      "progress": false,
      "participates": 2,
      "maxParticipates": 7
    },
    {
      "id": 10,
      "title": "MODERNJS 기술 문서 번역",
      "field": "MODERNJS",
      "docType": "DOCUMENTATION",
      "description": "MODERNJS 기술 문서를 번역합니다.",
      "docUrl": "https://www.example.com/css-doc",
      "deadline": "2024-10-30T23:59:59.000Z",
      "progress": true,
      "participates": 6,
      "maxParticipates": 10
    }
  ]
}]

export const challengeDetail = [
  {
    "id": 1,
    "title": "NEXTJS 튜토리얼 번역 챌린지",
    "field": "NEXTJS",
    "docType": "OFFICIAL",
    "description": "NEXTJS 관련 튜토리얼 번역 작업.",
    "docUrl": "https://www.example.com/NEXTJS-WEB",
    "deadline": "2024-12-31T23:59:59.000Z",
    "progress": true,
    "participates": 3,
    "maxParticipates": 5,
    "writer": [
      {
        "id": 1,
        "userId": 1,
        "nickname": "사용자1",
        "grade": "NORMAL",
        "appliedAt": "2024-10-15T04:23:18.578Z"
      }
    ]
  },
  {
    "id": 2,
    "title": "API 문서 번역 챌린지",
    "field": "API",
    "docType": "DOCUMENTATION",
    "description": "API 공식 문서를 번역합니다.",
    "docUrl": "https://www.example.com/js-doc",
    "deadline": "2024-11-30T23:59:59.000Z",
    "progress": false,
    "participates": 0,
    "maxParticipates": 10,
    "writer": [
      {
        "id": 2,
        "userId": 2,
        "nickname": "사용자2",
        "grade": "EXPERT",
        "appliedAt": "2024-10-16T05:30:10.123Z"
      }
    ]
  },
  {
    "id": 3,
    "title": "CAREER 라이브러리 소개 번역",
    "field": "CAREER",
    "docType": "LIBRARY",
    "description": "CAREER 라이브러리 소개 자료 번역.",
    "docUrl": "https://www.example.com/python-library",
    "deadline": "2024-10-15T23:59:59.000Z",
    "progress": false,
    "participates": 2,
    "maxParticipates": 7,
    "writer": [
      {
        "id": 3,
        "userId": 3,
        "nickname": "사용자3",
        "grade": "NORMAL",
        "appliedAt": "2024-10-17T06:10:25.456Z"
      }
    ]
  },
  {
    "id": 4,
    "title": "MODERNJS 가이드 번역",
    "field": "MODERNJS",
    "docType": "OFFICIAL",
    "description": "MODERNJS 관련 가이드를 번역합니다.",
    "docUrl": "https://www.example.com/vue-guide",
    "deadline": "2024-10-20T23:59:59.000Z",
    "progress": true,
    "participates": 5,
    "maxParticipates": 6,
    "writer": [
      {
        "id": 4,
        "userId": 4,
        "nickname": "사용자4",
        "grade": "NORMAL",
        "appliedAt": "2024-10-18T07:22:14.789Z"
      }
    ]
  },
  {
    "id": 5,
    "title": "WEB 문서 번역",
    "field": "WEB",
    "docType": "DOCUMENTATION",
    "description": "WEB 공식 문서를 번역합니다.",
    "docUrl": "https://www.example.com/django-doc",
    "deadline": "2024-11-15T23:59:59.000Z",
    "progress": false,
    "participates": 1,
    "maxParticipates": 8,
    "writer": [
      {
        "id": 5,
        "userId": 5,
        "nickname": "사용자5",
        "grade": "ADVANCED",
        "appliedAt": "2024-10-19T08:35:12.012Z"
      }
    ]
  },
  {
    "id": 6,
    "title": "WEB 블로그 포스트 번역",
    "field": "WEB",
    "docType": "BLOG",
    "description": "WEB 관련 블로그 글을 번역합니다.",
    "docUrl": "https://www.example.com/kotlin-blog",
    "deadline": "2024-10-25T23:59:59.000Z",
    "progress": false,
    "participates": 3,
    "maxParticipates": 10,
    "writer": [
      {
        "id": 6,
        "userId": 6,
        "nickname": "사용자6",
        "grade": "NORMAL",
        "appliedAt": "2024-10-20T09:44:50.345Z"
      }
    ]
  },
  {
    "id": 7,
    "title": "NEXTJS API 문서 번역",
    "field": "NEXTJS",
    "docType": "OFFICIAL",
    "description": "NEXTJS API 문서를 번역합니다.",
    "docUrl": "https://www.example.com/nodejs-api",
    "deadline": "2024-11-01T23:59:59.000Z",
    "progress": true,
    "participates": 4,
    "maxParticipates": 6,
    "writer": [
      {
        "id": 7,
        "userId": 7,
        "nickname": "사용자7",
        "grade": "EXPERT",
        "appliedAt": "2024-10-21T10:22:34.654Z"
      }
    ]
  },
  {
    "id": 8,
    "title": "API 블로그 글 번역",
    "field": "API",
    "docType": "BLOG",
    "description": "API 관련 블로그 글을 번역합니다.",
    "docUrl": "https://www.example.com/ruby-blog",
    "deadline": "2024-12-01T23:59:59.000Z",
    "progress": false,
    "participates": 1,
    "maxParticipates": 5,
    "writer": [
      {
        "id": 8,
        "userId": 8,
        "nickname": "사용자8",
        "grade": "NORMAL",
        "appliedAt": "2024-10-22T11:11:56.123Z"
      }
    ]
  },
  {
    "id": 9,
    "title": "CAREER 튜토리얼 번역",
    "field": "CAREER",
    "docType": "OFFICIAL",
    "description": "CAREER 관련 튜토리얼 번역 작업.",
    "docUrl": "https://www.example.com/flutter-WEB",
    "deadline": "2024-12-15T23:59:59.000Z",
    "progress": false,
    "participates": 2,
    "maxParticipates": 7,
    "writer": [
      {
        "id": 9,
        "userId": 9,
        "nickname": "사용자9",
        "grade": "ADVANCED",
        "appliedAt": "2024-10-23T12:22:33.456Z"
      }
    ]
  },
  {
    "id": 10,
    "title": "MODERNJS 기술 문서 번역",
    "field": "MODERNJS",
    "docType": "DOCUMENTATION",
    "description": "MODERNJS 기술 문서를 번역합니다.",
    "docUrl": "https://www.example.com/css-doc",
    "deadline": "2024-10-30T23:59:59.000Z",
    "progress": true,
    "participates": 6,
    "maxParticipates": 10,
    "writer": [
      {
        "id": 10,
        "userId": 10,
        "nickname": "사용자10",
        "grade": "EXPERT",
        "appliedAt": "2024-10-24T13:33:44.789Z"
      }
    ]
  }
]

export const challengeOngoing = {
  "list": [
    {
      "id": 1,
      "title": "NEXTJS 튜토리얼 번역 챌린지",
      "field": "NEXTJS",
      "progress": true,
      "participates": 3,
      "maxParticipates": 5,
      "deadline": "2024-12-31T23:59:59.000Z"
    },
    {
      "id": 2,
      "title": "API 문서 번역 챌린지",
      "field": "API",
      "progress": false,
      "participates": 0,
      "maxParticipates": 10,
      "deadline": "2024-11-30T23:59:59.000Z"
    },
    {
      "id": 3,
      "title": "CAREER 라이브러리 소개",
      "field": "CAREER",
      "progress": false,
      "participates": 2,
      "maxParticipates": 7,
      "deadline": "2024-10-15T23:59:59.000Z"
    },
    {
      "id": 4,
      "title": "MODERNJS 가이드 번역",
      "field": "MODERNJS",
      "progress": true,
      "participates": 5,
      "maxParticipates": 6,
      "deadline": "2024-10-20T23:59:59.000Z"
    },
    {
      "id": 5,
      "title": "WEB 문서 번역",
      "field": "WEB",
      "progress": false,
      "participates": 1,
      "maxParticipates": 8,
      "deadline": "2024-11-15T23:59:59.000Z"
    },
    {
      "id": 6,
      "title": "WEB 블로그 포스트 번역",
      "field": "WEB",
      "progress": false,
      "participates": 3,
      "maxParticipates": 10,
      "deadline": "2024-10-25T23:59:59.000Z"
    },
    {
      "id": 7,
      "title": "NEXTJS API 문서 번역",
      "field": "NEXTJS",
      "progress": true,
      "participates": 4,
      "maxParticipates": 6,
      "deadline": "2024-11-01T23:59:59.000Z"
    },
    {
      "id": 8,
      "title": "API 블로그 글 번역",
      "field": "API",
      "progress": false,
      "participates": 1,
      "maxParticipates": 5,
      "deadline": "2024-12-01T23:59:59.000Z"
    },
    {
      "id": 9,
      "title": "CAREER 튜토리얼 번역",
      "field": "CAREER",
      "progress": false,
      "participates": 2,
      "maxParticipates": 7,
      "deadline": "2024-12-15T23:59:59.000Z"
    },
    {
      "id": 10,
      "title": "MODERNJS 기술 문서 번역",
      "field": "MODERNJS",
      "progress": true,
      "participates": 6,
      "maxParticipates": 10,
      "deadline": "2024-10-30T23:59:59.000Z"
    }
  ],
  "meta": {
    "currentPage": 1,
    "totalCount": 10,
    "totalPages": 1
  }
}
