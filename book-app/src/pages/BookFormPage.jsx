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
  },
  {
    id: 2,
    title: '우주의 끝에서',
    author: '이영희',
    content: '광활한 우주를 배경으로 펼쳐지는 SF 소설. 인간과 AI의 공존을 탐구한다.',
    coverImageUrl: '',
  },
  {
    id: 3,
    title: '봄날의 레시피',
    author: '김민수',
    content: '요리와 함께하는 따뜻한 일상 에세이. 계절마다 달라지는 식탁의 이야기.',
    coverImageUrl: '',
  },
];

function BookFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const existing = isEdit
    ? MOCK_BOOKS.find((b) => b.id === Number(id))
    : null;

  const [title, setTitle] = useState(existing?.title || '');
  const [author, setAuthor] = useState(existing?.author || '');
  const [content, setContent] = useState(existing?.content || '');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    setError('');

    if (isEdit) {
      // TODO: PATCH /books/:id (2일차 연동 예정)
      alert('수정 기능은 2일차에 연동합니다.');
    } else {
      // TODO: POST /books (2일차 연동 예정)
      alert('등록 기능은 2일차에 연동합니다.');
    }

    navigate('/');
  };

  return (
    <div className="book-form">
      <h2>{isEdit ? '도서 수정' : '새 도서 등록'}</h2>

      <div className="form-group">
        <label>제목 *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="도서 제목을 입력하세요"
        />
      </div>

      <div className="form-group">
        <label>저자</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="저자명"
        />
      </div>

      <div className="form-group">
        <label>내용</label>
        <textarea
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="도서 내용 또는 줄거리를 입력하세요"
        />
      </div>

      {error && (
        <p style={{ color: '#e74c3c', marginBottom: 16, fontSize: '0.9rem' }}>
          {error}
        </p>
      )}

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          취소
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          {isEdit ? '저장' : '등록'}
        </button>
      </div>
    </div>
  );
}

export default BookFormPage;
