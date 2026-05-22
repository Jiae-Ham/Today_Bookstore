import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook, createBook, updateBook } from '../api/books';

const CATEGORIES = ['000 총류', '100 철학', '200 종교', '300 사회과학', '400 자연과학', '500 기술과학', '600 예술', '700 언어', '800 문학'];

function BookFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    async function fetchBook() {
      try {
        const res = await getBook(id);
        if (!res.ok) throw new Error('도서를 불러오지 못했습니다.');
        const data = await res.json();
        setTitle(data.title);
        setAuthor(data.author);
        setContent(data.content);
        setCategory(data.category || CATEGORIES[0]);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchBook();
  }, [id, isEdit]);

  const handleSubmit = async () => {
    if (!title.trim()) { setError('제목을 입력해주세요.'); return; }
    setError('');
    setLoading(true);

    try {
      const now = new Date().toISOString();

      if (isEdit) {
        const res = await updateBook(id, { title, author, content, category, updatedAt: now });
        if (!res.ok) throw new Error('수정에 실패했습니다.');
      } else {
        const res = await createBook({
          title, author, content, category,
          coverImageUrl: '',
          avg_rating: 0,
          rate_point: 0,
          createdAt: now,
          updatedAt: now,
        });
        if (!res.ok) throw new Error('등록에 실패했습니다.');
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-form">
      <h2>{isEdit ? '도서 수정' : '새 도서 등록'}</h2>

      <div className="form-group">
        <label>제목 *</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="도서 제목을 입력하세요" />
      </div>

      <div className="form-group">
        <label>저자</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="저자명" />
      </div>

      <div className="form-group">
        <label>카테고리</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}
          style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.95rem' }}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>내용</label>
        <textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} placeholder="도서 내용 또는 줄거리를 입력하세요" />
      </div>

      {error && <p style={{ color: '#e74c3c', marginBottom: 16, fontSize: '0.9rem' }}>{error}</p>}

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={() => navigate(-1)} disabled={loading}>취소</button>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? '처리 중...' : isEdit ? '저장' : '등록'}
        </button>
      </div>
    </div>
  );
}

export default BookFormPage;
