export const challengeList = {
  "meta": {
    "currentPage": 1,
    "totalCount": 10,
    "totalPages": 2
  },
  "list": [
    {
      "id": 1,
      "title": "NEXTJS 튜토리얼 번역 챌린지",
      "field": "NEXTJS",
      "docType": "OFFICIAL",
      "description": "NEXTJS 관련 튜토리얼 번역 작업.",
      "docUrl": "https://www.example.com/NEXTJS-WEB",
      "deadline": "2024-02-31T23:59:59.000Z",
      "progress": true,
      "participants": 3,
      "maxParticipants": 5
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
      "participants": 5,
      "maxParticipants": 5
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
      "participants": 2,
      "maxParticipants": 7
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
      "participants": 5,
      "maxParticipants": 6
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
      "participants": 1,
      "maxParticipants": 8
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
      "participants": 3,
      "maxParticipants": 10
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
      "participants": 4,
      "maxParticipants": 6
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
      "participants": 1,
      "maxParticipants": 5
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
      "participants": 2,
      "maxParticipants": 7
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
      "participants": 6,
      "maxParticipants": 10
    }
  ]
}

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
    "participants": 3,
    "maxParticipants": 5,
    "applications": [
      {"user": {
        "id": 1,
        "userId": 1,
        "nickname": "사용자1",
        "grade": "NORMAL",
        "appliedAt": "2024-10-15T04:23:18.578Z"
       }
      }],
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
    "participants": 0,
    "maxParticipants": 10,
    "applications": [
      {"user": {
          "id": 2,
          "userId": 2,
          "nickname": "사용자2",
          "grade": "EXPERT",
          "appliedAt": "2024-10-16T05:30:10.123Z"
        }
      },],
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
    "participants": 2,
    "maxParticipants": 7,
    "applications": [
      {"user": {
        "id": 3,
        "userId": 3,
        "nickname": "사용자3",
        "grade": "NORMAL",
        "appliedAt": "2024-10-17T06:10:25.456Z"
       }
      }],
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
    "participants": 5,
    "maxParticipants": 6,
    "applications": [
      {"user": {
        "id": 4,
        "userId": 4,
        "nickname": "사용자4",
        "grade": "NORMAL",
        "appliedAt": "2024-10-18T07:22:14.789Z"
       }
      }],
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
    "participants": 1,
    "maxParticipants": 8,
    "applications": [
      {"user": {
        "id": 5,
        "userId": 5,
        "nickname": "사용자5",
        "grade": "ADVANCED",
        "appliedAt": "2024-10-19T08:35:12.012Z"
       }
      }],
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
    "participants": 3,
    "maxParticipants": 10,
    "applications": [
      {"user": {
        "id": 6,
        "userId": 6,
        "nickname": "사용자6",
        "grade": "NORMAL",
        "appliedAt": "2024-10-20T09:44:50.345Z"
       }
      }],
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
    "participants": 4,
    "maxParticipants": 6,
    "applications": [
      {"user": {
        "id": 7,
        "userId": 7,
        "nickname": "사용자7",
        "grade": "EXPERT",
        "appliedAt": "2024-10-21T10:22:34.654Z"
       }
      }],
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
    "participants": 1,
    "maxParticipants": 5,
    "applications": [
      {"user": {
        "id": 8,
        "userId": 8,
        "nickname": "사용자8",
        "grade": "NORMAL",
        "appliedAt": "2024-10-22T11:11:56.123Z"
       }
      }],
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
    "participants": 2,
    "maxParticipants": 7,
    "applications": [
      {"user": {
        "id": 9,
        "userId": 9,
        "nickname": "사용자9",
        "grade": "ADVANCED",
        "appliedAt": "2024-10-23T12:22:33.456Z"
       }
      }],
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
    "participants": 6,
    "maxParticipants": 10,
    "applications": [
      {"user": {
        "id": 10,
        "userId": 10,
        "nickname": "사용자10",
        "grade": "EXPERT",
        "appliedAt": "2024-10-24T13:33:44.789Z"
       }
      }],
  }
]

export const challengeOngoing = {
  "list": [
    {
      "id": 1,
      "title": "NEXTJS 튜토리얼 번역 챌린지",
      "field": "NEXTJS",
      "progress": true,
      "participants": 3,
      "maxParticipants": 5,
      "deadline": "2024-12-31T23:59:59.000Z"
    },
    {
      "id": 2,
      "title": "API 문서 번역 챌린지",
      "field": "API",
      "progress": false,
      "participants": 0,
      "maxParticipants": 10,
      "deadline": "2024-11-30T23:59:59.000Z"
    },
    {
      "id": 3,
      "title": "CAREER 라이브러리 소개",
      "field": "CAREER",
      "progress": false,
      "participants": 2,
      "maxParticipants": 7,
      "deadline": "2024-10-15T23:59:59.000Z"
    },
    {
      "id": 4,
      "title": "MODERNJS 가이드 번역",
      "field": "MODERNJS",
      "progress": true,
      "participants": 5,
      "maxParticipants": 6,
      "deadline": "2024-10-20T23:59:59.000Z"
    },
    {
      "id": 5,
      "title": "WEB 문서 번역",
      "field": "WEB",
      "progress": false,
      "participants": 1,
      "maxParticipants": 8,
      "deadline": "2024-11-15T23:59:59.000Z"
    },
    {
      "id": 6,
      "title": "WEB 블로그 포스트 번역",
      "field": "WEB",
      "progress": false,
      "participants": 3,
      "maxParticipants": 10,
      "deadline": "2024-10-25T23:59:59.000Z"
    },
    {
      "id": 7,
      "title": "NEXTJS API 문서 번역",
      "field": "NEXTJS",
      "progress": true,
      "participants": 4,
      "maxParticipants": 6,
      "deadline": "2024-11-01T23:59:59.000Z"
    },
    {
      "id": 8,
      "title": "API 블로그 글 번역",
      "field": "API",
      "progress": false,
      "participants": 1,
      "maxParticipants": 5,
      "deadline": "2024-12-01T23:59:59.000Z"
    },
    {
      "id": 9,
      "title": "CAREER 튜토리얼 번역",
      "field": "CAREER",
      "progress": false,
      "participants": 2,
      "maxParticipants": 7,
      "deadline": "2024-12-15T23:59:59.000Z"
    },
    {
      "id": 10,
      "title": "MODERNJS 기술 문서 번역",
      "field": "MODERNJS",
      "progress": true,
      "participants": 6,
      "maxParticipants": 10,
      "deadline": "2024-10-30T23:59:59.000Z"
    }
  ],
  "meta": {
    "currentPage": 1,
    "totalCount": 10,
    "totalPages": 1
  }
}

export const participantsList = {
  "meta": {
    "totalPages": 2,
    "totalCount": 10,
    "currentPage": 1
  },
  "bestList": [ // 챌린지 마감됐을 시
    {
      "id": 13,
      "userId": 9,
      "nickname": "유저9",
      "grade": "NORMAL",
      "challengeId": 1,
      "content": "챌린지 참여에 대해 매우 만족합니다.",
      "lastModifiedAt": "2024-10-17T02:25:02.678Z",
      "likeCount": 15,
      "isLiked": true
    }
  ],
  "list": [
    {
      "id": 1,
      "userId": 1,
      "nickname": "테스트1",
      "grade": "EXPERT",
      "challengeId": 1,
      "content": "NEXTJS 공식 문서에서 기본적인 개념과 페이지 구조에 대한 내용을 번역했습니다.",
      "lastModifiedAt": "2024-10-17T02:42:44.580Z",
      "likeCount": 5,
      "isLiked": false
    },
    {
      "id": 2,
      "userId": 2,
      "nickname": "테스트2",
      "grade": "ADVANCED",
      "challengeId": 2,
      "content": "API 문서에서 엔드포인트와 요청 방법을 번역했습니다.",
      "lastModifiedAt": "2024-10-18T03:25:12.789Z",
      "likeCount": 3,
      "isLiked": false
    },
    {
      "id": 3,
      "userId": 3,
      "nickname": "테스트3",
      "grade": "NORMAL",
      "challengeId": 3,
      "content": "CAREER 라이브러리 소개 자료의 주요 내용을 번역했습니다.",
      "lastModifiedAt": "2024-10-19T04:35:44.678Z",
      "likeCount": 7,
      "isLiked": true
    },
    {
      "id": 4,
      "userId": 4,
      "nickname": "테스트4",
      "grade": "EXPERT",
      "challengeId": 4,
      "content": "MODERNJS 가이드 문서를 번역했습니다. 코드 예시를 추가하여 설명을 보완했습니다.",
      "lastModifiedAt": "2024-10-20T05:44:33.789Z",
      "likeCount": 10,
      "isLiked": true
    },
    {
      "id": 5,
      "userId": 5,
      "nickname": "테스트5",
      "grade": "ADVANCED",
      "challengeId": 5,
      "content": "WEB 관련 문서에서 HTML5와 CSS3의 최신 기술을 번역했습니다.",
      "lastModifiedAt": "2024-10-21T06:55:12.345Z",
      "likeCount": 2,
      "isLiked": false
    },
    {
      "id": 6,
      "userId": 6,
      "nickname": "테스트6",
      "grade": "NORMAL",
      "challengeId": 6,
      "content": "블로그 포스트에서 최신 Kotlin 관련 내용을 번역했습니다.",
      "lastModifiedAt": "2024-10-22T07:05:23.456Z",
      "likeCount": 8,
      "isLiked": true
    },
    {
      "id": 7,
      "userId": 7,
      "nickname": "테스트7",
      "grade": "EXPERT",
      "challengeId": 7,
      "content": "NEXTJS API 문서에서 CRUD 작업 관련 부분을 번역했습니다.",
      "lastModifiedAt": "2024-10-23T08:10:44.567Z",
      "likeCount": 12,
      "isLiked": true
    },
    {
      "id": 8,
      "userId": 8,
      "nickname": "테스트8",
      "grade": "ADVANCED",
      "challengeId": 8,
      "content": "API 블로그 글에서 RESTful API의 설계 원칙을 번역했습니다.",
      "lastModifiedAt": "2024-10-24T09:22:33.678Z",
      "likeCount": 9,
      "isLiked": true
    },
    {
      "id": 9,
      "userId": 9,
      "nickname": "테스트9",
      "grade": "NORMAL",
      "challengeId": 9,
      "content": "CAREER 관련 튜토리얼 번역에 참여했습니다.",
      "lastModifiedAt": "2024-10-25T10:35:12.789Z",
      "likeCount": 1,
      "isLiked": false
    },
    {
      "id": 10,
      "userId": 10,
      "nickname": "테스트10",
      "grade": "EXPERT",
      "challengeId": 10,
      "content": "MODERNJS 기술 문서에서 최신 자바스크립트 기능에 대해 번역했습니다.",
      "lastModifiedAt": "2024-10-26T11:44:23.456Z",
      "likeCount": 4,
      "isLiked": false
    }
  ]
}
