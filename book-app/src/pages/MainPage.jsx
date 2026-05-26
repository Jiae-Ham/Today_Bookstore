import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../api/books';

function MainPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await getBooks();

        if (!res.ok) {
          throw new Error('도서 데이터를 불러오지 못했습니다.');
        }

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

  // 추천 도서
  const recommendedBook = books[0];

  // 🔥 화제작 Best3
  const trendingBooks = [...books]
    .sort((a, b) => {
      const scoreA =
        (a.avg_rating || 0) * 2 +
        (a.reviewCount || 0);

      const scoreB =
        (b.avg_rating || 0) * 2 +
        (b.reviewCount || 0);

      return scoreB - scoreA;
    })
    .slice(0, 3);

  // 🆕 신규 업데이트
  const recentBooks = [...books]
    .sort(
      (a, b) =>
        new Date(b.updatedAt) -
        new Date(a.updatedAt)
    )
    .slice(0, 5);

  if (loading) {
    return (
      <p className="empty">
        불러오는 중...
      </p>
    );
  }

  if (error) {
    return (
      <p
        className="empty"
        style={{ color: '#e74c3c' }}
      >
        {error}
      </p>
    );
  }

  return (
    <div>
      <h2 className="page-title">
        5월의 추천 도서
      </h2>

      {/* 추천 도서 */}
      {recommendedBook ? (
        <section
          className="book-detail"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 32,
            marginBottom: 42,
            cursor: 'pointer',
          }}
          onClick={() =>
            navigate(
              `/books/${recommendedBook.id}`
            )
          }
        >
          <div
            className="book-detail-cover"
            style={{ margin: 0 }}
          >
            {recommendedBook.coverImageUrl ? (
              <img
                src={
                  recommendedBook.coverImageUrl
                }
                alt={
                  recommendedBook.title
                }
              />
            ) : (
              '📖'
            )}
          </div>

          <div
            style={{
              textAlign: 'left',
              flex: 1,
            }}
          >
            <h2>
              {recommendedBook.title}
            </h2>

            <p className="author">
              {recommendedBook.author ||
                '저자 정보 없음'}
            </p>

            <p
              style={{
                color: '#f5a623',
                marginBottom: 12,
              }}
            >
              {'⭐'.repeat(
                Math.round(
                  recommendedBook.avg_rating ||
                    0
                )
              )}{' '}
              {recommendedBook.avg_rating >
              0
                ? recommendedBook.avg_rating.toFixed(
                    1
                  )
                : '0.0'}
            </p>

            <p className="content">
              {recommendedBook.content ||
                '도서 설명이 없습니다.'}
            </p>
          </div>
        </section>
      ) : (
        <p className="empty">
          등록된 도서가 없습니다.
        </p>
      )}

      {/* 화제작 */}
      <h3
        style={{
          marginBottom: 18,
          textAlign: 'center',
        }}
      >
        🔥 화제작 Best 3
      </h3>

      <div
        className="book-grid"
        style={{
          gridTemplateColumns:
            'repeat(3, 1fr)',
          marginBottom: 36,
        }}
      >
        {trendingBooks.map((book) => (
          <div
            key={book.id}
            className="book-card"
            onClick={() =>
              navigate(`/books/${book.id}`)
            }
          >
            <div
              className="book-card-cover"
              style={{
                paddingTop: 18,
                background:
                  'rgba(255,255,255,0.35)',
              }}
            >
              {book.coverImageUrl ? (
                <img
                  src={
                    book.coverImageUrl
                  }
                  alt={book.title}
                  style={{
                    width: '70%',
                    height: '90%',
                    objectFit: 'contain',
                    borderRadius: 12,
                    boxShadow:
                      '0 6px 18px rgba(0,0,0,0.08)',
                  }}
                />
              ) : (
                '📖'
              )}
            </div>

            <div className="book-card-body">
              <h3>{book.title}</h3>

              <p>{book.author}</p>

              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#f5a623',
                }}
              >
                ⭐{' '}
                {book.avg_rating > 0
                  ? book.avg_rating.toFixed(
                      1
                    )
                  : '0.0'}
                {' · '}
                리뷰{' '}
                {book.reviewCount || 0}
                개
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 신규 업데이트 */}
      <h3
        style={{
          marginBottom: 18,
          textAlign: 'center',
        }}
      >
        🆕 신규 업데이트
      </h3>

      <div
        className="book-grid"
        style={{
          gridTemplateColumns:
            'repeat(5, 1fr)',
        }}
      >
        {recentBooks.map((book) => (
          <div
            key={book.id}
            className="book-card"
            onClick={() =>
              navigate(`/books/${book.id}`)
            }
          >
            <div
              className="book-card-cover"
              style={{
                height: 150,
                paddingTop: 14,
                background:
                  'rgba(255,255,255,0.35)',
              }}
            >
              {book.coverImageUrl ? (
                <img
                  src={
                    book.coverImageUrl
                  }
                  alt={book.title}
                  style={{
                    width: '70%',
                    height: '90%',
                    objectFit: 'contain',
                    borderRadius: 12,
                    boxShadow:
                      '0 6px 18px rgba(0,0,0,0.08)',
                  }}
                />
              ) : (
                '📖'
              )}
            </div>

            <div className="book-card-body">
              <h3
                style={{
                  fontSize: '0.9rem',
                }}
              >
                {book.title}
              </h3>

              <p
                style={{
                  fontSize: '0.8rem',
                }}
              >
                {book.author}
              </p>

              <p
                style={{
                  fontSize: '0.7rem',
                  color: '#bbb',
                  marginTop: 4,
                }}
              >
                {book.updatedAt
                  ? new Date(
                      book.updatedAt
                    ).toLocaleDateString(
                      'ko-KR'
                    )
                  : '날짜 없음'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;