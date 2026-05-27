# 도서관리 시스템

AI 표지 생성을 지원하는 도서관리 웹 애플리케이션입니다.

## 기술 스택

| 구분 | 기술 |
|---|---|
| 프론트엔드 | React 19 + Vite |
| 라우팅 | react-router-dom |
| 로컬 API 서버 | json-server 0.17.4 |
| AI 이미지 생성 | OpenAI Images API (gpt-image-2) |

## 서비스 구조

```
book-app/
├── public/
├── src/
│   ├── api/
│   │   ├── config.js        # BASE_URL 설정
│   │   ├── books.js         # 도서 API
│   │   └── reviews.js       # 리뷰 API
│   ├── components/
│   │   └── Header.jsx       # 네비게이션 바 + 테마 설정
│   ├── pages/
│   │   ├── MainPage.jsx     # 메인 (추천/화제작/신규 도서)
│   │   ├── BookListPage.jsx # 도서 목록 + 카테고리 필터
│   │   ├── BookDetailPage.jsx  # 도서 상세 + 리뷰 + 연관 추천
│   │   └── BookFormPage.jsx # 도서 등록 / 수정 + AI 표지 생성
│   ├── App.jsx
│   └── App.css
├── db.json                  # json-server 데이터
└── package.json
```

## 실행 방법

**1. 패키지 설치 (최초 1회)**
```bash
cd book-app
npm install
```

**2. 터미널 2개를 열어 각각 실행**

```bash
# 터미널 1 - json-server (데이터 서버, 포트 3000)
npx json-server@0.17.4 --watch db.json --port 3000
```

```bash
# 터미널 2 - React 앱 (포트 5173)
npm run dev
```

**3. 브라우저에서 접속**
```
http://localhost:5173
```

## 주요 기능

### 도서 CRUD
- 도서 목록 조회 / 카테고리 필터링
- 도서 상세 조회
- 도서 등록 / 수정 / 삭제

### AI 표지 생성 (OpenAI)
도서 등록 및 수정 페이지에서 AI로 표지 이미지를 자동 생성할 수 있습니다.

1. 제목과 내용을 먼저 입력합니다.
2. 좌측 패널에 OpenAI API Key(`sk-...`)를 입력합니다.
3. 품질을 선택합니다. (`low` / `medium` / `high`)
4. **AI 표지 생성** 버튼을 클릭합니다.
5. 생성된 이미지를 확인한 뒤 **등록** 또는 **저장** 버튼을 누릅니다.

> 사용 모델: `gpt-image-2` / 출력 크기: `1024x1536`  
> API Key는 서버로 전송되지 않으며 브라우저에서만 사용됩니다.

### 카테고리 기능
- 도서 등록 시 KDC(한국십진분류법) 기반 카테고리 지정
- 목록 페이지에서 카테고리 필터링

| 카테고리 |
|---|
| 000 총류 |
| 100 철학 |
| 200 종교 |
| 300 사회과학 |
| 400 자연과학 |
| 500 기술과학 |
| 600 예술 |
| 700 언어 |
| 800 문학 |

### 리뷰 및 별점 기능
- 도서마다 별점(1~5) 등록 및 조회
- 닉네임 + 비밀번호 기반 리뷰 작성 / 삭제

### 추천 기능
- **메인 페이지**: 베이지안 평균 점수 1위 도서를 추천 도서로 표시
- **화제작 Best 3**: 베이지안 평균 점수 상위 3개 도서 표시
- **상세 페이지**: 같은 카테고리 도서 자동 추천

> 베이지안 평균 공식: `score = (C × m + avg_rating × n) / (C + n)`  
> `m` = 전체 평균 평점, `C` = 전체 평균 리뷰 수, `n` = 해당 도서 리뷰 수

### 테마
우측 상단 팔레트에서 5가지 색상 테마 변경 가능 (선택값 localStorage 저장)

## 주요 화면

### 메인 페이지
<img src="./book-app/screenshots/메인페이지.png" width="700" alt="메인 페이지">

### 도서 목록
<img src="./book-app/screenshots/도서목록페이지.png" width="700" alt="도서 목록">

### 도서 목록 (최신순)
<img src="./book-app/screenshots/도서목록페이지-최신순.png" width="700" alt="도서 목록 최신순">

### 도서 상세
<img src="./book-app/screenshots/도서상세페이지.png" width="700" alt="도서 상세">

### 도서 등록
<img src="./book-app/screenshots/도서등록페이지.png" width="700" alt="도서 등록">

### 도서 수정
<img src="./book-app/screenshots/도서수정페이지.png" width="700" alt="도서 수정">

## API 엔드포인트

### 도서 API (json-server)

| 기능 | Method | 엔드포인트 |
|---|---|---|
| 도서 전체 목록 조회 | GET | `/books` |
| 카테고리별 도서 조회 | GET | `/books?category={category}` |
| 도서 상세 조회 | GET | `/books/:id` |
| 도서 등록 | POST | `/books` |
| 도서 수정 | PATCH | `/books/:id` |
| 도서 삭제 | DELETE | `/books/:id` |

### 리뷰 API (json-server)

| 기능 | Method | 엔드포인트 |
|---|---|---|
| 도서별 리뷰 목록 조회 | GET | `/reviews?bookId={id}` |
| 리뷰 등록 | POST | `/reviews` |
| 리뷰 삭제 | DELETE | `/reviews/:id` |

### 외부 API

| 기능 | Method | 엔드포인트 |
|---|---|---|
| AI 표지 이미지 생성 | POST | `https://api.openai.com/v1/images/generations` |
