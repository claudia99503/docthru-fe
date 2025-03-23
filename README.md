<div align=center>
	<span id="top">
	<h1>Docthru 프론트엔드 레포지토리</h1><br>

![image](https://github.com/user-attachments/assets/b7c9c7e6-64f2-46c7-a2a8-3864e6406a56)



<b>[Docthru 바로가기](https://docthru.vercel.app/)</b> <br>

<br> 
</div>

<details>
<summary>목차</summary>
  
1. [서비스 소개](#app)
2. [프론트엔드 팀 소개](#team)
3. [기술 및 개발 환경](#dev)
4. [개발 일정](#schedule)
5. [역할](#roles)
6. [구현 기능](#feature)
7. [컨벤션](#convention)
8. [프로젝트 구조](#tree)
9. [협업 문화](#culture)

</details>
<br>

## <span id="app">📝 1. 서비스 소개</span>

<b>'Docthru'</b>는 개발자들을 위한 번역 챌린지 플랫폼입니다. 많은 개발 자료가 영어로 작성되어 있어, 영어에 익숙하지 않은 한국 개발자들이 기술 습득에 어려움을 겪고 있습니다. Docthru는 이러한 문제를 해결하기 위해 개발 관련 영어 문서를 번역하는 챌린지를 제공하며, 번역 작업을 협업하여 진행할 수 있는 기능을 갖추고 있습니다. 사용자들은 번역 에디터에서 문서를 번역하고, 다른 사용자와 피드백을 주고받으며 번역 실력을 향상시킬 수 있습니다. 또한, 피드백을 교환함으로써 기술 습득의 장벽을 낮추는 것을 목표로 합니다.

- **챌린지 탐색 및 검색**: 진행 중인 번역 챌린지를 제목이나 필터 옵션으로 검색하여 쉽게 찾을 수 있습니다.
- **번역 챌린지 참여**: 사용자는 원하는 챌린지에 참여해 번역 작업을 수행하고, 다른 참여자와 피드백을 주고받을 수 있습니다.
- **번역 작성 및 제출**: 에디터를 통해 번역을 작성하고 임시 저장이나 최종 제출이 가능합니다. 진행 중인 작업물은 언제든 포기할 수 있습니다.
- **신규 챌린지 신청 및 관리**: 유저는 번역하고 싶은 문서가 있을 경우 신규 챌린지를 신청할 수 있으며, 어드민만이 이를 승인, 거절 또는 삭제할 수 있습니다. <br> 유저는 어드민의 승인 전까지 신청을 취소할 수 있으며, 어드민이 거절 또는 삭제할 경우 사유가 함께 전달되어 확인할 수 있습니다.
- **유저 등급 시스템**: 유저는 챌린지 참여 횟수와 추천 횟수에 따라 등급이 부여됩니다. 
  - **일반**: 기본 등급으로, 모든 유저가 처음에 부여받는 등급입니다.
  - **전문가**: 챌린지 참여 5회 이상 및 추천 5회 이상을 달성하거나, 참여 10회 이상 또는 추천 10회 이상을 달성하면 부여됩니다.
- **알림 기능**: 챌린지 상태 변경, 새로운 작업물 추가, 피드백 작성 등 주요 변경 사항에 대한 알림을 제공합니다. 알림은 신청하거나 참여 중인 챌린지에 변동 사항이 있을 때 유저에게 전달됩니다.

### 시연 영상
![docthru](https://github.com/user-attachments/assets/603fd691-7ddd-4957-91cd-d594c2e7d10a)

<br><br>

## <span id="team"> 🧑🏻‍💻👩🏻‍💻 2. 프론트엔드 팀 소개</span>

### 팀원

| 김민서                                                                          | 임송이                                                                          | 이율리                                                                    |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| <img src="https://avatars.githubusercontent.com/u/101076926?v=4" width="200px"/> | <img src="https://avatars.githubusercontent.com/u/126642292?v=4" width="200px"/> | <img src="https://avatars.githubusercontent.com/u/57631151?v=4" width="200px"/> |
| [claudia99503](https://github.com/claudia99503)                                 | [Im-amberIm](https://github.com/Im-amberIm)                                      | [yoorli](https://github.com/yoorli)                                  |

<br>


## <span id="dev">🛠️ 3. 기술 및 개발 환경</span>

### Frontend

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

### Backend
- <a href="https://github.com/Docthru/docthru-be"><b>Docthru 백엔드 레포지토리</b></a><br>
- <a href="https://docthru-be.vercel.app/api-docs/"><b>Swagger API 명세서</b></a> </p>

### Design

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

### 협업방식

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">

### 배포

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

<br><br>

## <span id="schedule">📅 4. 개발 일정 [**2024-10-08 ~ 2024-10-31**]</span>

### 1. 기획 완료

- [x] 요구사항 분석 및 수집
- [x] 기술 스택 검토 및 선정
- [x] Git 브랜치 전략 수립
- [x] PR 규칙 등 팀 컨벤션 확립 [**2024-10-08 ~ 2024-10-09**]

### 2. 컴포넌트 개발

- [x] 각 단위별 담당자 지정 [**2024-10-10**]
- [x] 컴포넌트 개발 [**2024-10-11 ~ 2024-10-13**]

### 3. 페이지 개발

- [x] 페이지 레이아웃 및 구조 설계 [**2024-10-10**]
- [x] 페이지 개발 [**2024-10-14 ~ 2024-10-25**]
- [x] 페이지 스타일링 및 반응형 디자인 적용 [**2024-10-14 ~ 2024-10-25**]

### 4. 백엔드 API 연동

- [x] API 테스트 [**2024-10-21 ~ 2024-10-24**]
- [x] 페이지에 API 연동 [**2024-10-24 ~ 2024-10-28**]

### 5. 릴리스 준비

- [x] 최종 점검 및 테스트
- [x] **최종 발표** [**2024-10-31**]

<br>

#### <p align="right"><a href="#top">TOP👆🏻</a></p>

<br>

## <span id="roles">📝 5. 역할</span>

✨ **[신규 챌린지 신청 페이지](https://github.com/Docthru/docthru-fe/blob/main/src/pages/application/index.jsx)** 

<table>
  <tr>
    <th style="width: 650px; height: 100px;">데스크탑 & 태블릿 버전</th>
    <th style="width: 350px; height: 100px;">모바일 버전</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/b3a0e61b-cb27-4792-b0d5-de1235ff1e11" alt="데스크탑 & 태블릿 버전 이미지"></td>
    <td><img src="https://github.com/user-attachments/assets/ecb1e2ea-2bb1-462e-92cf-f876f3c806cd" alt="모바일 버전 이미지"></td>
  </tr>
</table>

- 유저가 번역하고 싶은 문서를 챌린지로 신청할 수 있는 페이지입니다.
- **챌린지 정보 입력** : 유저는 챌린지 제목, 목표, 문서타입, 마감일, 최대 참여 인원 등의 정보를 입력하여 신청할 수 있습니다.

<br>

✨ **[신청한 챌린지 목록 페이지](https://github.com/Docthru/docthru-fe/blob/main/src/pages/me/application/index.jsx)** 

<table>
  <tr>
    <th style="width: 650px; height: 100px;">데스크탑 & 태블릿 버전</th>
    <th style="width: 350px; height: 100px;">모바일 버전</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/da04d562-9c73-4589-99b8-607e5ec15fc6" alt="데스크탑 & 태블릿 버전 이미지"></td>
    <td><img src="https://github.com/user-attachments/assets/a02a02d6-b2cd-46b2-a053-8ad8288e38aa" alt="모바일 버전 이미지"></td>
  </tr>
</table>

- 유저가 신청한 챌린지의 목록과 각 챌린지의 승인 여부를 확인할 수 있는 페이지입니다.
- **승인 여부 확인 및 신청 취소** : 유저는 신청한 챌린지의 승인 또는 거절 / 삭제 상태를 확인할 수 있습니다.

<br>

✨ **[신청한 챌린지 상세 페이지](https://github.com/Docthru/docthru-fe/blob/main/src/pages/me/application/%5Bid%5D.jsx)** 

- **승인 대기 중 상태** => 승인 대기 중인 신청은 언제든지 취소할 수 있습니다. 승인 대기 중 상태를 제외하고는 신청 취소 버튼이 페이지에 나타나지 않습니다.

<table>
  <tr>
    <th style="width: 650px; height: 100px;">데스크탑 & 태블릿 버전</th>
    <th style="width: 350px; height: 100px;">모바일 버전</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/766dcc6d-6d77-4533-b579-f2ce533cf18a" alt="데스크탑 & 태블릿 버전 이미지"></td>
    <td><img src="https://github.com/user-attachments/assets/616ba25a-6154-4839-af00-89d00bb66072" alt="모바일 버전 이미지"></td>
  </tr>
</table>

<br>

- **승인 상태**

<table>
  <tr>
    <th style="width: 650px; height: 100px;">데스크탑 & 태블릿 버전</th>
    <th style="width: 350px; height: 100px;">모바일 버전</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/2c4844f4-423d-41c6-8142-2a01cdb8b2fd" alt="데스크탑 & 태블릿 버전 이미지"></td>
    <td><img src="https://github.com/user-attachments/assets/9181a110-47d8-424b-acfe-f44e5f2abf63" alt="모바일 버전 이미지"></td>
  </tr>
</table>

<br>

- **거절 상태** => 어드민의 **거절 사유**가 표시됩니다.

<table>
  <tr>
    <th style="width: 650px; height: 100px;">데스크탑 & 태블릿 버전</th>
    <th style="width: 350px; height: 100px;">모바일 버전</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/4139122e-6c7a-480e-9475-3bce5c013ee7" alt="데스크탑 & 태블릿 버전 이미지"></td>
    <td><img src="https://github.com/user-attachments/assets/e73dc4a5-d3bd-492d-b5f5-9812ad8a669c" alt="모바일 버전 이미지"></td>
  </tr>
</table>

<br>

- **삭제 상태** => 어드민의 **삭제 사유**가 표시됩니다.

<table>
  <tr>
    <th style="width: 650px; height: 100px;">데스크탑 & 태블릿 버전</th>
    <th style="width: 350px; height: 100px;">모바일 버전</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/50017ad6-0a97-418a-b7b3-23308ae9d3ed" alt="데스크탑 & 태블릿 버전 이미지"></td>
    <td><img src="https://github.com/user-attachments/assets/a78a805a-1162-4de4-a640-746b6601a28b" alt="모바일 버전 이미지"></td>
  </tr>
</table>

- 유저가 신청한 특정 챌린지의 세부 정보를 조회하고 신청 상태 (어드민 유저가 승인 또는 거절 / 삭제) 를 확인할 수 있는 페이지입니다.
  - **승인 대기 중** 상태 : 승인 대기 중인 신청은 언제든지 취소할 수 있습니다. 승인 대기 중 상태를 제외하고는 신청 취소 버튼이 페이지에 나타나지 않습니다.
  - **승인** 상태 : 승인된 신청에 대해서는 최다 추천 번역 리스트가 제공됩니다.
  - **거절** 또는 **삭제** : 어드민이 입력한 거절 및 삭제 사유도 함께 확인할 수 있습니다.
- **원문 미리보기** : 유저가 신규 챌린지 신청 페이지에서 입력한 원문 문서 주소에 대한 미리보기 기능이 제공됩니다.
 - 원문 보기 버튼이 제공되며, 클릭 시 새 창에서 원문 문서를 확인할 수 있습니다.
- **신청 취소**: 승인 대기 상태일 때만 신청 취소가 가능합니다.

<br>

✨ **[어드민 전용 챌린지 신청관리 관리 페이지](https://github.com/Docthru/docthru-fe/blob/main/src/pages/admin/application/index.jsx)** 

<table>
  <tr>
    <th style="width: 650px; height: 100px;">데스크탑 & 태블릿 버전</th>
    <th style="width: 350px; height: 100px;">모바일 버전</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/6e343bb8-6c34-47eb-8f32-1e2f48a19d6f" alt="데스크탑 & 태블릿 버전 이미지"></td>
    <td><img src="https://github.com/user-attachments/assets/55554e5b-0cf0-46b7-811c-7fa7b2971cf3" alt="모바일 버전 이미지"></td>
  </tr>
</table>

- 어드민이 유저가 신청한 신규 챌린지 목록을 관리할 수 있는 페이지입니다.
- 검색 및 필터링: 신청 목록을 검색하고 필터링하여 필요한 챌린지를 쉽게 찾을 수 있으며, 페이지네이션 기능이 포함되어 있습니다.

<br>

✨ **[어드민 전용 신청관리 상세 페이지](https://github.com/Docthru/docthru-fe/blob/main/src/pages/admin/application/%5Bid%5D.jsx)** 

- **승인 대기 중 상태** => 어드민은 승인 대기 중인 챌린지를 **승인**, **거절**, **수정** 또는 **삭제**할 수 있습니다.

<table>
  <tr>
    <th style="width: 650px; height: 100px;">데스크탑 & 태블릿 버전</th>
    <th style="width: 350px; height: 100px;">모바일 버전</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/36d42a35-7ca1-4522-aa15-701f82994ddf" alt="데스크탑 & 태블릿 버전 이미지"></td>
    <td><img src="https://github.com/user-attachments/assets/503cfa85-71fb-46a2-ba35-0941cfd1f6ab" alt="모바일 버전 이미지"></td>
  </tr>
</table>

<br>

- **수정 버튼 클릭 시** => 해당 챌린지의 **수정 페이지**로 이동합니다. <br>

✨ **[챌린지 수정 페이지](https://github.com/Docthru/docthru-fe/blob/main/src/pages/admin/edit/%5Bid%5D.jsx)** 

<table>
  <tr>
    <th style="width: 650px; height: 100px;">데스크탑 & 태블릿 버전</th>
    <th style="width: 350px; height: 100px;">모바일 버전</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/f9eb3408-3678-4cfd-a00e-dd8131ced129" alt="데스크탑 & 태블릿 버전 이미지"></td>
    <td><img src="https://github.com/user-attachments/assets/a280934a-8fe0-47a3-8a57-15955218832a" alt="모바일 버전 이미지"></td>
  </tr>
</table>

- 신청한 챌린지의 내용을 수정할 수 있는 페이지입니다.
- **챌린지 정보 입력** : 유저가 이전에 입력한 내용이 미리 채워진 상태로 로드되며, 필요 시 어드민이 수정하여 저장할 수 있습니다.

<br>

- **삭제 버튼을 클릭하고 삭제 사유를 입력한 후 전송 버튼을 클릭** => 유저의 챌린지 상세 페이지에 어드민의 **삭제 사유**가 표시됩니다.
  
<table>
  <tr>
    <th style="width: 650px; height: 100px;">데스크탑 & 태블릿 버전</th>
    <th style="width: 350px; height: 100px;">모바일 버전</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/a116130f-bf47-4b64-900c-091e7661d3ec" alt="데스크탑 & 태블릿 버전 이미지"></td>
    <td><img src="https://github.com/user-attachments/assets/4d9b4c64-ca10-485a-9c78-515f2fa65a75" alt="모바일 버전 이미지"></td>
  </tr>
</table>

<br>

- **거절 버튼을 클릭하고 거절 사유를 입력한 후 전송 버튼을 클릭** => 유저의 챌린지 상세 페이지에 어드민의 **거절 사유**가 표시됩니다.
  
<table>
  <tr>
    <th style="width: 650px; height: 100px;">데스크탑 & 태블릿 버전</th>
    <th style="width: 350px; height: 100px;">모바일 버전</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/5a48cfc9-7c2a-4fa9-aaff-c03b354d2771" alt="데스크탑 & 태블릿 버전 이미지"></td>
    <td><img src="https://github.com/user-attachments/assets/192cee37-b36e-415a-8a30-8efd9dacef8f" alt="모바일 버전 이미지"></td>
  </tr>
</table>

<br>


- 어드민이 유저가 신청한 신규 챌린지를 관리할 수 있는 페이지입니다.
- **원문 미리보기** : 유저가 신규 챌린지 신청 페이지에서 입력한 원문 문서 주소에 대한 미리보기 기능이 제공됩니다.
 - 원문 보기 버튼이 제공되며, 클릭 시 새 창에서 원문 문서를 확인할 수 있습니다.
- **챌린지 관리** : 어드민은 승인 대기 중인 챌린지를 **승인**, **거절** 또는 **삭제**할 수 있습니다. <br> **승인**할 경우 별도의 사유 입력 없이 승인이 가능하며, **삭제**나 **거절** 시에는 유저가 확인할 수 있도록 사유를 입력해야 합니다. <br> 또한, **수정** 을 클릭하면 해당 챌린지를 수정할 수 있습니다.
- 검색 및 필터링: 신청 목록을 검색하고 필터링하여 필요한 챌린지를 쉽게 찾을 수 있으며, 페이지네이션 기능이 포함되어 있습니다.

<br>

#### <p align="right"><a href="#top">TOP👆🏻</a></p>

<br>

## <span id="feature">✨ 6. 구현 기능</span>

### 유저
- 🔗 [신규 챌린지 신청 페이지](https://github.com/Docthru/docthru-fe/blob/main/src/pages/application/index.jsx)
- 🔗 [신청한 챌린지 목록 페이지](https://github.com/Docthru/docthru-fe/blob/main/src/pages/me/application/index.jsx)
- 🔗 [신청한 챌린지 상세 페이지](https://github.com/Docthru/docthru-fe/blob/main/src/pages/me/application/%5Bid%5D.jsx)


### 어드민 전용 페이지
- 🔗 [챌린지 신청관리 관리 페이지](https://github.com/Docthru/docthru-fe/blob/main/src/pages/admin/application/index.jsx)
- 🔗 [신청관리 상세 페이지](https://github.com/Docthru/docthru-fe/blob/main/src/pages/admin/application/%5Bid%5D.jsx)
- 🔗 [챌린지 수정 페이지](https://github.com/Docthru/docthru-fe/blob/main/src/pages/admin/edit/%5Bid%5D.jsx)

<br>

#### <p align="right"><a href="#top">TOP👆🏻</a></p>

<br>


## <span id="convention">🖌️ 7. 컨벤션</span>

### Git 컨벤션

| Emoji | Code                          | 기능     | Description              |
| ----- | ----------------------------- | -------- | ------------------------ |
| ✨    | `:sparkles:`                  | Feat     | 새 기능                  |
| ♻️    | `:recycle:`                   | Refactor | 코드 리팩토링            |
| 📦    | `:wrench:`                    | Chore    | 리소스 수정/삭제         |
| 🐛    | `:bug:`                       | Fix      | 버그 수정                |
| 📝    | `:memo:`                      | Docs     | 문서 추가/수정           |
| 🎨    | `:art:`                       | Style    | UI/스타일 파일 추가/수정 |
| 🎉    | `:tada:`                      | Init     | 프로젝트 시작 / Init     |
| ✅    | `:white_check_mark:`          | Test     | 테스트 추가/수정         |
| ⏪    | `:rewind:`                    | Rewind   | 변경 사항 되돌리기       |
| 🔀    | `:twisted_rightwards_arrows:` | Merge    | 브랜치 합병              |
| 🗃     | `:card_file_box:`             | DB       | 데이터베이스 관련 수정   |
| 💡    | `:bulb:`                      | Comment  | 주석 추가/수정           |
| 🚀    | `:rocket:`                    | Deploy   | 배포                     |

<br>

### Code 컨벤션

- **변수/함수**
  - Camel 표기법 사용 (상수는 대문자)
- **컴포넌트/파일명**
  - Pascal 표기법 사용
- **이미지 파일**
  - Snake 표기법 사용 - `(형태)(의미)(순서)_(상태)` / 예: `btn_login_001_off.png`
- **ClassName** - Kebab 표기법 사용

<br>

#### <p align="right"><a href="#top">TOP👆🏻</a></p>

<br>

## <span id="tree">🌱 8. 프로젝트 구조</span>

- **public/**: 애플리케이션의 정적 자산을 포함하는 디렉터리.
    - **assets/**: 이미지 파일을 포함하는 디렉터리.
        - **icons/**: 아이콘 SVG 파일 저장.
        - **images/**: 일반 이미지 SVG 파일 저장.
    - **favicon/favicon.png**: 웹사이트의 파비콘 파일.
    - **icons_sprite.svg**: 아이콘 스프라이트 파일.
    - **images_sprite.svg**: 이미지 스프라이트 파일.
- **src/**: 애플리케이션의 핵심 소스 코드와 관련 리소스.
    - **components/**: 각 기능을 담당하는 컴포넌트 모음.
        - **application/**: 챌린지 신청 관리 페이지 컴포넌트.
        - **challenge/**: 챌린지 목록 및 상세 페이지 컴포넌트.
        - **feedback/**: 작업물 상세 페이지의 피드백 및 댓글 컴포넌트.
        - **mypage/**: 사용자 프로필 및 정보 수정 인터페이스.
        - **user/**: 인증 관련 컴포넌트 (로그인, 회원가입 등).
        - **work/**: 작업물 생성, 수정, 상세 페이지 컴포넌트.
        - **modals/**: 모달 UI 컴포넌트.
        - **layouts/**: 공통 레이아웃, 네비게이션 및 접근 제어 로직.
        - **commons/**: 재사용 가능한 공통 UI 컴포넌트.
    - **context/**: 전역 상태 관리를 위한 Context API 정의 (예: 사용자 정보).
    - **hooks/**: 재사용 가능한 상태 및 로직을 관리하는 커스텀 훅 모음.
        - **useAuth**: 사용자 상태 관리 및 인증 로직을 위한 훅.
        - **useModal**: 모달 동작, 리다이렉션 및 상태 관리를 위한 훅.
    - **pages/**: 페이지별 컴포넌트와 라우팅, 데이터 페칭 로직 정의.
    - **service/**: 서비스 로직과 API 호출을 위한 모듈.
        - **api/**: axios 설정 및 API 호출 함수 모음.
        - **mutations/**: react-query의 mutation 훅 모음.
        - **queries/**: react-query의 useQuery 훅 모음.
    - **styles/**: 공통 색상, 폰트, 전역 스타일 정의.
        - **pages/**: 페이지별 스타일 시트 (개별 컴포넌트는 해당 컴포넌트와 동일한 디렉터리에 CSS 파일을 포함).
        - **global.css**: 전역 스타일 정의 파일.
        - **reset.css**: 기본 스타일 초기화 파일.
    - **utils/**: 다양한 유틸리티 함수와 공통 기능을 관리하는 모듈.
        - **canUseDom.js**: 클라이언트 사이드 여부를 확인하는 Boolean 변수.
        - **clsx.js**: 클래스 이름 관리 설정.
        - **generateImgSrc.js**: `public/assets/`의 이미지 경로를 `assets` 객체로 변환하는 스크립트.
        - **generateSprite.js**: `public/assets/` 내 SVG 파일로 스프라이트 파일 생성.
        - **utilFunction.js**: 전역에서 재사용할 유틸리티 함수 모음.
    - **variables/**: 자주 사용되는 상수와 변수를 관리하는 디렉터리.
        - **fonts.js**: Next.js 폰트 설정.
        - **formValidation.js**: react-hook-form 유효성 검사 상수.
        - **images.js**: Image 태그에 사용될 이미지 경로 모음.
        - **queryKeys.js**: react-query 쿼리 키 관리.
        - **variables.js**: 페이지와 라우트 관련 상수 모음.
- **jsconfig.json**: 경로 설정 및 프로젝트 구성 파일.
- **next.config.mjs**: Next.js 설정 파일.
- **package.json**: 프로젝트 의존성 및 스크립트 관리.

```
📦src
 ┣ 📂components
 ┃ ┣ 📂application
 ┃ ┃ ┣ 📜AdminModal.jsx
 ┃ ┃ ┣ 📜AdminModal.module.css
 ┃ ┃ ┣ 📜ApplicationDropdown.jsx
 ┃ ┃ ┣ 📜ApplicationDropdown.module.css
 ┃ ┃ ┣ 📜ChallengeStatusBadge.jsx
 ┃ ┃ ┣ 📜ChallengeStatusBadge.module.css
 ┃ ┃ ┣ 📜ChallengeTable.jsx
 ┃ ┃ ┣ 📜ChallengeTable.module.css
 ┃ ┃ ┣ 📜DocTypeSelection.jsx
 ┃ ┃ ┣ 📜DocTypeSelection.module.css
 ┃ ┃ ┣ 📜FieldSelection.jsx
 ┃ ┃ ┣ 📜FieldSelection.module.css
 ┃ ┃ ┣ 📜Pagination.jsx
 ┃ ┃ ┣ 📜Pagination.module.css
 ┃ ┃ ┣ 📜ReasonBox.jsx
 ┃ ┃ ┗ 📜ReasonBox.module.css
 ┃ ┣ 📂challenge
 ┃ ┃ ┣ 📜AllCardSection.jsx
 ┃ ┃ ┣ 📜AllCardSection.module.css
 ┃ ┃ ┣ 📜BestRecWork.jsx
 ┃ ┃ ┣ 📜BestRecWork.module.css
 ┃ ┃ ┣ 📜Card.jsx
 ┃ ┃ ┣ 📜Card.module.css
 ┃ ┃ ┣ 📜ChallengeDetailInfo.jsx
 ┃ ┃ ┣ 📜ChallengeDetailInfo.module.css
 ┃ ┃ ┣ 📜ChallengeDropdown.jsx
 ┃ ┃ ┣ 📜ChallengeDropdown.module.css
 ┃ ┃ ┣ 📜ChallengeSearchBar.jsx
 ┃ ┃ ┣ 📜ChallengeSearchBar.module.css
 ┃ ┃ ┣ 📜Container.jsx
 ┃ ┃ ┣ 📜Container.module.css
 ┃ ┃ ┣ 📜InfoContainer.jsx
 ┃ ┃ ┣ 📜InfoContainer.module.css
 ┃ ┃ ┣ 📜ParticipationStatus.jsx
 ┃ ┃ ┣ 📜ParticipationStatus.module.css
 ┃ ┃ ┣ 📜SearchBarWithDropdown.jsx
 ┃ ┃ ┣ 📜SearchBarWithDropdown.module.css
 ┃ ┃ ┣ 📜SeveralBestRecCards.jsx
 ┃ ┃ ┗ 📜SeveralBestRecCards.module.css
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂form
 ┃ ┃ ┃ ┣ 📜Input.jsx
 ┃ ┃ ┃ ┣ 📜PasswordInput.jsx
 ┃ ┃ ┃ ┣ 📜TextArea.jsx
 ┃ ┃ ┃ ┗ 📜inputFields.module.css
 ┃ ┃ ┣ 📜Border.jsx
 ┃ ┃ ┣ 📜Border.module.css
 ┃ ┃ ┣ 📜Button.jsx
 ┃ ┃ ┣ 📜Button.module.css
 ┃ ┃ ┣ 📜CancelMenu.jsx
 ┃ ┃ ┣ 📜CancelMenu.module.css
 ┃ ┃ ┣ 📜ChallengeSearchBarLarge.jsx
 ┃ ┃ ┣ 📜ChallengeSearchBarLarge.module.css
 ┃ ┃ ┣ 📜DocTypeChip.jsx
 ┃ ┃ ┣ 📜DocTypeChip.module.css
 ┃ ┃ ┣ 📜Iframe.jsx
 ┃ ┃ ┣ 📜KebabMenu.jsx
 ┃ ┃ ┣ 📜KebabMenu.module.css
 ┃ ┃ ┣ 📜LikeButton.jsx
 ┃ ┃ ┣ 📜LikeButton.module.css
 ┃ ┃ ┣ 📜Loader.jsx
 ┃ ┃ ┣ 📜Loader.module.css
 ┃ ┃ ┣ 📜Message.jsx
 ┃ ┃ ┣ 📜Message.module.css
 ┃ ┃ ┣ 📜Profile.jsx
 ┃ ┃ ┣ 📜Profile.module.css
 ┃ ┃ ┗ 📜Svg.jsx
 ┃ ┣ 📂feedback
 ┃ ┃ ┣ 📜EmptyFeedbacks.jsx
 ┃ ┃ ┣ 📜EmptyFeedbacks.module.css
 ┃ ┃ ┣ 📜FeedbackContent.jsx
 ┃ ┃ ┣ 📜FeedbackContent.module.css
 ┃ ┃ ┣ 📜FeedbackForm.jsx
 ┃ ┃ ┣ 📜FeedbackForm.module.css
 ┃ ┃ ┣ 📜FeedbackList.jsx
 ┃ ┃ ┣ 📜FeedbackList.module.css
 ┃ ┃ ┣ 📜RepliesList.jsx
 ┃ ┃ ┣ 📜Reply.jsx
 ┃ ┃ ┣ 📜UpdateFeedbackForm.module.css
 ┃ ┃ ┗ 📜UpdatedFeedbackForm.jsx
 ┃ ┣ 📂layouts
 ┃ ┃ ┣ 📜Headers.jsx
 ┃ ┃ ┣ 📜Headers.module.css
 ┃ ┃ ┣ 📜Layout.jsx
 ┃ ┃ ┣ 📜Layout.module.css
 ┃ ┃ ┣ 📜Nav.jsx
 ┃ ┃ ┣ 📜Nav.module.css
 ┃ ┃ ┣ 📜ProfileDropDown.jsx
 ┃ ┃ ┣ 📜ProfileDropDown.module.css
 ┃ ┃ ┣ 📜TabNavigation.jsx
 ┃ ┃ ┗ 📜TabNavigation.module.css
 ┃ ┣ 📂modals
 ┃ ┃ ┣ 📜AlertModal.jsx
 ┃ ┃ ┣ 📜AlertModal.module.css
 ┃ ┃ ┣ 📜Toast.jsx
 ┃ ┃ ┣ 📜Toast.module.css
 ┃ ┃ ┣ 📜TwoBtnModal.jsx
 ┃ ┃ ┗ 📜TwoBtnModal.module.css
 ┃ ┣ 📂user
 ┃ ┃ ┣ 📜LoginForm.jsx
 ┃ ┃ ┣ 📜SignUpForm.jsx
 ┃ ┃ ┗ 📜userForms.module.css
 ┃ ┗ 📂work
 ┃ ┃ ┣ 📜TextEditor.jsx
 ┃ ┃ ┣ 📜TextEditor.module.css
 ┃ ┃ ┣ 📜WorkDetail.jsx
 ┃ ┃ ┗ 📜WorkDetail.module.css
 ┣ 📂context
 ┃ ┗ 📜AuthProvider.js
 ┣ 📂hooks
 ┃ ┣ 📜useAuth.js
 ┃ ┗ 📜useModal.js
 ┣ 📂pages
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📂application
 ┃ ┃ ┃ ┣ 📜[id].jsx
 ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┣ 📂work
 ┃ ┃ ┃ ┣ 📜[id].jsx
 ┃ ┃ ┃ ┗ 📜edit.jsx
 ┃ ┃ ┣ 📜[id].jsx
 ┃ ┃ ┣ 📜edit.jsx
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┣ 📂application
 ┃ ┃ ┣ 📜[id].jsx
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜login.jsx
 ┃ ┃ ┗ 📜sign-up.jsx
 ┃ ┣ 📂me
 ┃ ┃ ┣ 📂application
 ┃ ┃ ┃ ┣ 📜[id].jsx
 ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┣ 📂done
 ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┗ 📜index.jsx
 ┃ ┣ 📂work
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┣ 📜edit.jsx
 ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┗ 📂new
 ┃ ┃ ┃ ┗ 📜[id].jsx
 ┃ ┣ 📜[id].jsx
 ┃ ┣ 📜_app.js
 ┃ ┣ 📜_document.js
 ┃ ┗ 📜index.js
 ┣ 📂service
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜application.js
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┣ 📜axios.js
 ┃ ┃ ┣ 📜challenge.js
 ┃ ┃ ┣ 📜feedback.js
 ┃ ┃ ┣ 📜user.js
 ┃ ┃ ┗ 📜work.js
 ┃ ┣ 📂mutations
 ┃ ┃ ┣ 📜application.js
 ┃ ┃ ┣ 📜feedback.js
 ┃ ┃ ┣ 📜user.js
 ┃ ┃ ┗ 📜work.js
 ┃ ┗ 📂queries
 ┃ ┃ ┣ 📜application.js
 ┃ ┃ ┣ 📜challenge.js
 ┃ ┃ ┣ 📜user.js
 ┃ ┃ ┗ 📜work.js
 ┣ 📂styles
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂application
 ┃ ┃ ┃ ┣ 📜AdminApplicationDetailPage.module.css
 ┃ ┃ ┃ ┣ 📜AdminApplicationPage.module.css
 ┃ ┃ ┃ ┣ 📜CreateApplicationPage.module.css
 ┃ ┃ ┃ ┣ 📜EditApplicationPage.module.css
 ┃ ┃ ┃ ┣ 📜MyApplicationDetailPage.module.css
 ┃ ┃ ┃ ┗ 📜MyApplicationPage.module.css
 ┃ ┃ ┣ 📂work
 ┃ ┃ ┃ ┣ 📜mutateWork.module.css
 ┃ ┃ ┃ ┗ 📜workDetail.module.css
 ┃ ┃ ┣ 📜Home.module.css
 ┃ ┃ ┗ 📜auth.module.css
 ┃ ┣ 📜globals.css
 ┃ ┗ 📜reset.css
 ┣ 📂utils
 ┃ ┣ 📜canUseDom.jsx
 ┃ ┣ 📜clsx.js
 ┃ ┣ 📜generateImgSrc.js
 ┃ ┣ 📜generateSprite.js
 ┃ ┣ 📜generateSprite_v2.js
 ┃ ┗ 📜utilFunction.js
 ┗ 📂variables
 ┃ ┣ 📜fonts.js
 ┃ ┣ 📜formValidation.js
 ┃ ┣ 📜images.js
 ┃ ┣ 📜queryKeys.js
 ┃ ┗ 📜variables.js
```
<br>

#### <p align="right"><a href="#top">TOP👆🏻</a></p>

<br>

## <span id="culture">💪🏻 9. 협업 문화</span>

- 일시: 평일 오전 9시 ~ 오후 7시, 주말
- 내용: PR 내용 발표 및 코드 리뷰, 진행 상황 점검, 추가 이후 계획 논의

<br>

#### <p align="right"><a href="#top">TOP👆🏻</a></p>

<br>


