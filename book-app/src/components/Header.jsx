import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1 onClick={() => navigate('/')}>📚 도서관리 시스템</h1>
      <button className="btn-new" onClick={() => navigate('/books/new')}>
        + 새 도서 등록
      </button>
    </header>
  );
}

export default Header;
