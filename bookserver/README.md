# 오늘의 서재 (BackEnd)

- 개발 기간: 2026.06.08 ~ 2026.06.12

---

```markdown
### 🛠 Tech Stack

**Backend**
<img src="https://img.shields.io/badge/Java 17-007396?style=flat-square&logo=OpenJDK&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring Boot 4.0.6-6DB33F?style=flat-square&logo=Spring Boot&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring Security-6DB33F?style=flat-square&logo=Spring Security&logoColor=white"/>

**Database & Infra**
<img src="https://img.shields.io/badge/H2 Database-000000?style=flat-square"/>
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=Supabase&logoColor=white"/>

**Tools**
<img src="https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=Postman&logoColor=white"/>
<img src="https://img.shields.io/badge/Gradle-02303A?style=flat-square&logo=Gradle&logoColor=white"/>
```

- **Dependencies:**
    - Spring Web, Spring Security
    - Spring Data JPA
    - Validation
    - Lombok, Spring Boot DevTools

---

## 서비스 구조

- Package by Feature 구조 형식을 사용(도메인 단위의 구조)

```markdown
📦 src/main/java/com/aivle/bookserver
┣ 📂 book        # 도서 관련 비즈니스 로직 (Controller, Service, Repository, DTO)
┣ 📂 review      # 리뷰 관련 비즈니스 로직
┣ 📂 rating      # 도서 별점 계산을 위한 공통 로직
┣ 📂 config      # CORS 정책 및 DB 초기화 등 전역 설정
┗ 📂 exception   # ControllerAdvice를 활용한 전역 예외 처리 및 커스텀 예외
```

```html
<details>
<summary><b>📂 디렉터리 구조 펼쳐보기</b></summary>
<div markdown="1">

bookserver/
├── src/main/
│   ├── resources/
│   │   └── application.yaml                  # 환경 변수 및 전역 설정
│   └── java/com/aivle/bookserver/
│       ├── BookserverApplication             # 엔트리 포인트
│       │
│       ├── book/                             # [도메인] 도서
│       │   ├── Book                          # 엔티티
│       │   ├── BookController                # API 엔드포인트
│       │   ├── BookService                   # 비즈니스 로직
│       │   ├── BookRepository                # DB 접근 (JPA)
│       │   └── BookUpdateRequest             # Request DTO
│       │
│       ├── review/                           # [도메인] 리뷰
│       │   ├── Review                        
│       │   ├── ReviewController              
│       │   ├── ReviewService                 
│       │   ├── ReviewRepository              
│       │   ├── ReviewCreateRequest           
│       │   └── ReviewDeleteRequest           
│       │
│       ├── rating/                           # [도메인] 별점
│       │   └── RatingService                 # 별점 계산 로직
│       │
│       ├── config/                           # 전역 설정
│       │   ├── WebConfig                     # CORS 정책 설정
│       │   └── DataInitializer               # 더미 데이터 생성 (Test)
│       │
│       └── exception/                        # 예외 처리
│           ├── GlobalExceptionHandler        # 전역 에러 핸들링
│           ├── ErrorResponse                 # 에러 반환 포맷 (DTO)
│           ├── BookNotFoundException         # Custom Exception
│           └── ReviewNotFoundException       # Custom Exception
│
├── build.gradle                              # 의존성 관리
└── .env                                      # 보안 키 관리 (Git 제외)

</div>
</details>
```