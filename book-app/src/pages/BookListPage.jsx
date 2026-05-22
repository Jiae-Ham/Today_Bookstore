import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../api/books';

const CATEGORIES = ['전체', '000 총류', '100 철학', '200 종교', '300 사회과학', '400 자연과학', '500 기술과학', '600 예술', '700 언어', '800 문학'];

function BookListPage() {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await getBooks();
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다.');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const filtered = selectedCategory === '전체'
    ? books
    : books.filter((b) => b.category === selectedCategory);

  if (loading) return <p className="empty">불러오는 중...</p>;
  if (error)   return <p className="empty" style={{ color: '#e74c3c' }}>{error}</p>;

  return (
    <div>
      <h2 className="page-title">도서 목록</h2>

      {/* 카테고리 필터 */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: 30,
              border: '1px solid rgba(255,255,255,0.8)',
              cursor: 'pointer',
              background: selectedCategory === cat ? 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' : 'rgba(255,255,255,0.6)',
              color: selectedCategory === cat ? 'white' : 'var(--text-main)',
              fontWeight: selectedCategory === cat ? 600 : 500,
              boxShadow: selectedCategory === cat ? '0 4px 10px rgba(102, 126, 234, 0.4)' : '0 2px 5px rgba(0,0,0,0.05)',
              transition: 'all 0.2s',
              backdropFilter: 'blur(10px)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty">해당 카테고리의 도서가 없습니다.</p>
      ) : (
        <div className="book-grid">
          {filtered.map((book) => (
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
                <p style={{ fontSize: '0.8rem', color: '#f5a623' }}>
                  {'⭐'.repeat(Math.round(book.avg_rating))} {book.avg_rating > 0 ? book.avg_rating.toFixed(1) : ''}
                </p>
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
