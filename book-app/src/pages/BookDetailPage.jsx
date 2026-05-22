import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Mock 데이터 (1일차 - json-server 연동 전)
const MOCK_BOOKS = [
  {
    id: 1,
    title: '별빛 아래의 서점',
    author: '홍길동',
    content: '작은 마을 서점의 1년을 담은 에세이. 책과 사람, 그리고 계절의 이야기.',
    coverImageUrl: '',
    createdAt: '2026-05-01T09:00:00.000Z',
    updatedAt: '2026-05-01T09:00:00.000Z',
  },
  {
    id: 2,
    title: '우주의 끝에서',
    author: '이영희',
    content: '광활한 우주를 배경으로 펼쳐지는 SF 소설. 인간과 AI의 공존을 탐구한다.',
    coverImageUrl: '',
    createdAt: '2026-05-10T11:00:00.000Z',
    updatedAt: '2026-05-10T11:00:00.000Z',
  },
  {
    id: 3,
    title: '봄날의 레시피',
    author: '김민수',
    content: '요리와 함께하는 따뜻한 일상 에세이. 계절마다 달라지는 식탁의 이야기.',
    coverImageUrl: '',
    createdAt: '2026-05-15T14:00:00.000Z',
    updatedAt: '2026-05-15T14:00:00.000Z',
  },
];

function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book] = useState(
    MOCK_BOOKS.find((b) => b.id === Number(id)) || null
  );

  if (!book) {
    return (
      <div className="empty">
        <p>도서를 찾을 수 없습니다.</p>
        <button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={() => navigate('/')}>
          목록으로
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`"${book.title}"을(를) 삭제하시겠습니까?`)) {
      // TODO: DELETE /books/:id (2일차 연동 예정)
      alert('삭제 기능은 2일차에 연동합니다.');
    }
  };

  return (
    <div className="book-detail">
      <div className="book-detail-cover">
        {book.coverImageUrl
          ? <img src={book.coverImageUrl} alt={book.title} />
          : '📖'
        }
      </div>

      <h2>{book.title}</h2>
      <p className="author">저자: {book.author}</p>
      <p className="content">{book.content}</p>
      <p className="dates">
        등록일: {new Date(book.createdAt).toLocaleString('ko-KR')}
        &nbsp;·&nbsp;
        수정일: {new Date(book.updatedAt).toLocaleString('ko-KR')}
      </p>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          목록으로
        </button>
        <button className="btn btn-primary" onClick={() => navigate(`/books/${book.id}/edit`)}>
          수정
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          삭제
        </button>
        <button className="btn btn-success" onClick={() => alert('AI 표지 생성은 3일차에 연동합니다.')}>
          AI 표지 생성
        </button>
      </div>
    </div>
  );
}

export default BookDetailPage;
