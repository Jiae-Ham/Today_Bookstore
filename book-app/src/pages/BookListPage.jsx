import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock 데이터 (1일차 - json-server 연동 전)
const MOCK_BOOKS = [
  {
    id: 1,
    title: '별빛 아래의 서점',
    author: '홍길동',
    content: '작은 마을 서점의 1년을 담은 에세이. 책과 사람, 그리고 계절의 이야기.',
    coverImageUrl: '',
    createdAt: '2026-05-01T09:00:00.000Z',
  },
  {
    id: 2,
    title: '우주의 끝에서',
    author: '이영희',
    content: '광활한 우주를 배경으로 펼쳐지는 SF 소설. 인간과 AI의 공존을 탐구한다.',
    coverImageUrl: '',
    createdAt: '2026-05-10T11:00:00.000Z',
  },
  {
    id: 3,
    title: '봄날의 레시피',
    author: '김민수',
    content: '요리와 함께하는 따뜻한 일상 에세이. 계절마다 달라지는 식탁의 이야기.',
    coverImageUrl: '',
    createdAt: '2026-05-15T14:00:00.000Z',
  },
];

function BookListPage() {
  const [books] = useState(MOCK_BOOKS);
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="page-title">도서 목록</h2>

      {books.length === 0 ? (
        <p className="empty">등록된 도서가 없습니다.</p>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <div
              key={book.id}
              className="book-card"
              onClick={() => navigate(`/books/${book.id}`)}
            >
              <div className="book-card-cover">
                {book.coverImageUrl
                  ? <img src={book.coverImageUrl} alt={book.title} />
                  : '📖'
                }
              </div>
              <div className="book-card-body">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p style={{ fontSize: '0.75rem', color: '#bbb', marginTop: 4 }}>
                  {new Date(book.createdAt).toLocaleDateString('ko-KR')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookListPage;
