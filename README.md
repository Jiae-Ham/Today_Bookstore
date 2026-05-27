# R&R

- 조장 / PM,기획 : 함지애
- 발표자 : 김현석
- UI,레이아웃 : 성예은, 손진원
- CRUD 연동 : 함지애
- OpenAI 연동 : 김만서, 장윤재
- 스타일링, QA : 박진용
- 발표 자료 /문서 : 공다연

# Ideas

1. 도서 카테고리를 지정하여 장르 별로 도서 목록 보기 - 박진용
2. 즐겨찾기 기능 및 카테고리 기능 - 함지애
3. 독자 반응 기반 표지( 좋아요 수, 클릭 수, 조회 수 기록) - 공다연
4. 좋아요 수로 정렬, 코멘트 등록 - 장윤재
5. 별점과 리뷰 남기기 - 김현석
6. 연관 도서 추천 - 김만서
- 최종 채택 의견
    - 별점
    - 리뷰
    - 카테고리 별 도서 분류
    - 추천 도서 제시

# To Do List

- [ ]  메인 목록에서 카테고리 필터링
- 세부 사항
    - 동화/소설, 자기 계발, 인문/교양, 과학/기술, 경제/비즈니스
- [ ]  도서 등록할 때 카테고리 지정해서 넣을 수 있도록
- 세부 사항
    - 
- [ ]  도서마다 좋아요 버튼(좋아요 정렬 기능은 선택사항)
- 세부 사항
    - 
- [ ]  도서마다 별점, 리뷰(별점 + 리뷰 수 조합)를 남길 수 있도록
- 세부 사항
    - 이메일-비밀번호를 필요로 하는 회원가입이 아닌 익명 닉네임/ 삭제용 비밀번호로만 이뤄진 간단한 사용자 인증(티스토리 댓글 형식)
    
    ![image.png](attachment:28e1c140-2ce2-4eaf-abfa-1b5d918da90f:image.png)
    
- [ ]  상세 페이지 하단에 같은 카테고리 도서를 자동으로 추천
- 세부 사항
    - **추천 알고리즘**: 넷플릭스 편집 방식과 유사한 형태로, 별점과 리뷰가 많은 책들을 상위에 배치하여 추천

# Data

![image.png](attachment:4d3af06b-50b1-46f6-b333-f7b93d85b307:image.png)

- db field
    
    { id, title, author, content, coverImageUrl, createdAt, updatedAt , rate_point, category} 
    
- KDC 10진 분류법 장르
    
    KDC 10진 분류법 장르
    
    000 총류 (백과사전, 사전, 도서관학, 컴퓨터/정보학 등)
    
    100 철학 (철학, 심리학, 윤리학 등)
    
    200 종교 (불교, 기독교 등 각종 종교)
    
    300 사회과학 (사회학, 통계학, 경제학, 법학, 교육학 등)
    
    400 자연과학 (수학, 물리학, 화학, 생물학 등)
    
    500 기술과학 (의학, 공학, 농학, 가정학 등 응용과학)
    
    600 예술 (건축, 조각, 음악, 미술, 체육 등)
    
    700 언어 (한국어, 영어 등 각종 어학)
    
    800 문학 (시, 소설, 수필 등)
    
- API 엔드 포인트
    
    
    | 구분 | 서비스명 | API 이름 | Method | Rest API |
    | --- | --- | --- | --- | --- |
    | 도서 | 도서관리 | 도서 목록 조회 | GET | /books |
    | 도서 | 도서관리 | 카테고리별 도서 조회 | GET | /books?category={category} |
    | 도서 | 도서관리 | 별점순 도서 조회 | GET | /books?_sort=likes&_order=desc |
    | 도서 | 도서관리 | 도서 상세 조회 | GET | /books/:id |
    | 도서 | 도서관리 | 도서 등록 | POST | /books |
    | 도서 | 도서관리 | 도서 수정 | PATCH | /books/:id |
    | 도서 | 도서관리 | 도서 삭제 | DELETE | /books/:id |
    | 도서 | 도서관리 | 좋아요 업데이트 | PATCH | /books/:id |
    | 도서 | 도서관리 | 싫어요 업데이트 | PATCH | /books/:id |
    | 리뷰 | 도서관리 | 도서 리뷰 목록 조회 | GET | /reviews?bookId={id} |
    | 리뷰 | 리뷰 관리 | 리뷰 등록 | POST | /reviews |
    | 리뷰 | 리뷰 관리 | 리뷰 삭제 | DELETE | /reviews/:id |
- API Key
- UI 공유 링크
    
    https://www.figma.com/design/AUYDy4MnsPUtpsWCEh4iRY/%EB%AF%B8%EB%8B%88%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-4%EC%B0%A8?node-id=0-1&t=axweK2wBFd1GGt7X-1
    
- 구글 공유 링크
    
    https://docs.google.com/document/d/1HPFhzzTc0TDQfalX9Tp39FLKFOkzeVqadcQjZH1yu6I/edit?usp=sharing
    
- 깃허브 공유 링크
    
    https://github.com/Jiae-Ham/AivleSchool_miniproj4
    

