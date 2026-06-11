# 📚 오늘의 서재 (BackEnd)

**독자들의 진솔한 리뷰와 객관적인 평점을 기반으로 도서를 추천해 주는 웹 서비스입니다.**

- **개발 인원:** 팀 프로젝트 (총 8인 중 BackEnd 파트)
- **개발 기간:** 2026.06.08 ~ 2026.06.12

---

## 🛠 Tech Stack

**Backend**<br>
![Java 17](https://img.shields.io/badge/Java%2017-007396?style=flat-square&logo=openjdk&logoColor=white)
![Spring Boot 4.0.6](https://img.shields.io/badge/Spring%20Boot%204.0.6-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=flat-square&logo=springsecurity&logoColor=white)

**Database & Infra**<br>
![H2 Database](https://img.shields.io/badge/H2%20Database-000000?style=flat-square)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)

**Tools**<br>
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-02303A?style=flat-square&logo=gradle&logoColor=white)

**Dependencies**
- Spring Web / Spring Security / Spring Data JPA / Validation / Lombok
- 📌 *전체 의존성 및 상세 버전 정보는 `build.gradle` 파일에서 확인하실 수 있습니다.*

---

## ⚙️ 서비스 구조 (Architecture)

- **Package by Feature** 구조 형식을 사용하여 도메인 단위로 패키지를 분리 및 관리합니다.

```text
📦 src/main/java/com/aivle/bookserver
 ┣ 📂 book        # 도서 관련 비즈니스 로직 (Controller, Service, Repository, DTO)
 ┣ 📂 review      # 리뷰 관련 비즈니스 로직
 ┣ 📂 rating      # 도서 별점 계산을 위한 공통 로직
 ┣ 📂 config      # CORS 정책 및 DB 초기화 등 전역 설정
 ┗ 📂 exception   # ControllerAdvice를 활용한 전역 예외 처리 및 커스텀 예외
```

---

## 🗄 데이터베이스 설계 (ERD)

조회 성능을 극대화하기 위해 `BOOK` 테이블에 리뷰 관련 통계(평균 별점, 리뷰 수 등)를 포함하는 **반정규화**를 적용했습니다.

<img width="1402" height="1122" alt="ERD 이미지" src="https://github.com/user-attachments/assets/8b400112-ebf1-4632-921c-2b7269337944" />


---

## 🔌 API 명세서 (API Reference)

### 📌 서버 기본 환경
* **Base URL:** `http://localhost:8080` (Content-Type: `application/json`)
* **CORS 허용:** `http://localhost:5173` (Front-end)
* **Database:** * **Production:** Supabase (PostgreSQL)
  * **Local / Test:** H2 In-memory (`jdbc:h2:mem:bookdb`) / 콘솔 접근: `/h2-console`

<br>

### 📚 도서 API (Books)
| Method | Endpoint | 기능 | Request (Query/Body) | Response |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/books` | 도서 목록 조회 | `[Query]` category={분류} (선택) | 200 (Book List) |
| **GET** | `/books/{id}` | 도서 상세 조회 | - | 200 (Book) / 404 |
| **POST** | `/books` | 도서 등록 | `[Body]` title(필수), author, content, category, coverImageUrl | 201 (Created Book) |
| **PATCH** | `/books/{id}` | 도서 부분 수정 | `[Body]` 수정할 필드만 포함 (null 무시) | 200 (Updated Book) / 404 |
| **DELETE**| `/books/{id}` | 도서 삭제 | - | 204 (No Content) |
| **GET** | `/books/{id}/related`| 카테고리 추천 Top 3 | - | 200 (Book List) / 404 |

<br>

### 💬 리뷰 API (Reviews)
| Method | Endpoint | 기능 | Request (Query/Body) | Response |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/reviews` | 리뷰 목록 조회 | `[Query]` bookId={id} (필수) | 200 (Review List) |
| **POST** | `/reviews` | 리뷰 등록 | `[Body]` bookId, nickname, password, rating (모두 필수), content | 201 (Created Review) |
| **DELETE**| `/reviews/{id}` | 리뷰 삭제 | `[Body]` password 필수 | 204 (No Content) / 404 |

> **💡 Note:** 리뷰 등록(POST) 및 삭제(DELETE) 요청 시, 서버 내부 로직에 의해 해당 도서의 총 평점과 리뷰 수가 자동으로 재계산되어 `BOOK` 테이블에 동기화됩니다.

---

## ⭐ 도서 평점 계산 로직 (Bayesian Rating System)

단순 평균 별점(`avg_rating`) 산출 시 발생할 수 있는 통계적 왜곡(예: 리뷰 1개인 5점 도서가 리뷰 100개인 4.8점 도서보다 상위에 노출되는 현상)을 방지하고, 보다 객관적인 추천을 제공하기 위해 **베이지안 평점** 방식을 도입했습니다.

### 공식 및 변수 설명

`rate_point = round((C * m + ratingSum) / (C + reviewCount), 1)`

* **C**: 최소 투표 수 (고정값 5)
* **m**: 평점이 존재하는 전체 도서의 평균 별점 (데이터가 없을 시 초기값 3.5 적용)
* **ratingSum**: 해당 도서가 받은 별점의 총합
* **reviewCount**: 해당 도서의 총 리뷰 수

이 수식을 통해 리뷰 개수가 적을 때는 전체 도서의 평균(m)에 가깝게 보정되며, 리뷰가 누적될수록 해당 도서의 실제 평균 별점에 수렴하게 됩니다.

---

## 🚀 실행 가이드 (Getting Started)

1. **저장소 클론**
   ```bash
   git clone [https://github.com/Jiae-Ham/AivleSchool_miniproj4.git](https://github.com/Jiae-Ham/AivleSchool_miniproj4.git)
   cd AivleSchool_miniproj4/bookserver
   ```
2. **환경 변수 설정**
   * 프로젝트 최상단 디렉터리에 `.env` 파일을 생성하거나 `application.yaml`을 수정하여 Supabase 연결 정보를 설정합니다.
   * 로컬 테스트만 진행할 경우 환경을 `local`로 맞추어 H2 DB를 사용할 수 있습니다.
3. **빌드 및 실행**
   ```bash
   ./gradlew build
   ./gradlew bootRun
   ```
