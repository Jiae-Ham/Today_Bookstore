# 도서관리 시스템

AI 표지 생성을 지원하는 도서관리 웹 애플리케이션입니다.

## 기술 스택

- React 19 + Vite
- react-router-dom
- json-server (로컬 REST API)

## 실행 방법

**1. 패키지 설치 (최초 1회)**
```
npm install
```

**2. 터미널 2개 열어서 각각 실행**

#경로설정
```
cd book-app
```

```
# 터미널 1 - json-server (데이터 서버)
npx json-server@0.17.4 --watch db.json --port 3000

# 터미널 2 - React 앱
npm run dev
```

**3. 브라우저에서 접속**
```
http://localhost:5173
```

## 주요 기능

- 도서 목록 조회
- 도서 상세 조회
- 도서 등록 / 수정 / 삭제
- AI 표지 자동 생성 (OpenAI API)

## 추가 기능

### 카테고리 기능
- 메인 목록에서 카테고리 필터링
- 도서 등록 시 카테고리 지정 가능
- 카테고리 종류
  - 동화/소설
  - 자기계발
  - 인문/교양
  - 과학/기술
  - 경제/비즈니스
 
### 리뷰 및 별점 기능
- 도서마다 별점 등록/조회 가능
- 도서마다 리뷰 작성/조회 가능

### 추천 기능
- 상세 페이지 하단에 같은 카테고리 도서 자동 추천
- 메인 페이지에 별점/조회수 기반 오늘의 추천 도서 제시



## API 엔드포인트

| 구분 | 서비스명 | API 이름 | Method | REST API |
|---|---|---|---|---|
| 도서 | 도서관리 | 도서 목록 조회 | GET | `/books` |
| 도서 | 도서관리 | 카테고리별 도서 조회 | GET | `/books?category={category}` |
| 도서 | 도서관리 | 별점순 도서 조회 | GET | `/books?_sort=likes&_order=desc` |
| 도서 | 도서관리 | 도서 상세 조회 | GET | `/books/:id` |
| 도서 | 도서관리 | 도서 등록 | POST | `/books` |
| 도서 | 도서관리 | 도서 수정 | PATCH | `/books/:id` |
| 도서 | 도서관리 | 도서 삭제 | DELETE | `/books/:id` |
| 도서 | 도서관리 | 좋아요 업데이트 | PATCH | `/books/:id` |
| 도서 | 도서관리 | 싫어요 업데이트 | PATCH | `/books/:id` |
| 리뷰 | 도서관리 | 도서 리뷰 목록 조회 | GET | `/reviews?bookId={id}` |
| 리뷰 | 리뷰 관리 | 리뷰 등록 | POST | `/reviews` |
| 리뷰 | 리뷰 관리 | 리뷰 삭제 | DELETE | `/reviews/:id` |
