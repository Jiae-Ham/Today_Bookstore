# 오늘의 서재 (BackEnd)

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
- Spring Web, Spring Security
- Spring Data JPA
- Validation
- Lombok, Spring Boot DevTools

---

## ⚙️ 서비스 구조

- **Package by Feature** 구조 형식을 사용 (도메인 단위의 구조)

```text
📦 src/main/java/com/aivle/bookserver
 ┣ 📂 book        # 도서 관련 비즈니스 로직 (Controller, Service, Repository, DTO)
 ┣ 📂 review      # 리뷰 관련 비즈니스 로직
 ┣ 📂 rating      # 도서 별점 계산을 위한 공통 로직
 ┣ 📂 config      # CORS 정책 및 DB 초기화 등 전역 설정
 ┗ 📂 exception   # ControllerAdvice를 활용한 전역 예외 처리 및 커스텀 예외
