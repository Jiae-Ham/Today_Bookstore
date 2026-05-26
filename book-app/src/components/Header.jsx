import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <h1 onClick={() => navigate('/')} style={{ margin: 0 }}>
          📚 도서관리 시스템
        </h1>

        <div
          style={{
            width: '1px',
            height: '24px',
            background: 'rgba(0,0,0,0.08)',
            margin: '0 4px',
          }}
        />

        <button className="btn-new" onClick={() => navigate('/books')}>
          도서 목록
        </button>

        <button className="btn-new" onClick={() => navigate('/books/new')}>
          도서 등록
        </button>
      </div>
    </header>
  );
}

export default Header;