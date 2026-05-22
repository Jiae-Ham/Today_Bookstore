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

## API 엔드포인트

| 메서드 | URL | 설명 |
|--------|-----|------|
| GET | /books | 도서 목록 |
| GET | /books/:id | 도서 상세 |
| POST | /books | 도서 등록 |
| PATCH | /books/:id | 도서 수정 |
| DELETE | /books/:id | 도서 삭제 |
