import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const THEMES = [
  { name: 'purple',  label: '퍼플',   primary: '#667eea', secondary: '#764ba2', bg: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
  { name: 'vintage', label: '빈티지', primary: '#44A194', secondary: '#537D96', bg: 'linear-gradient(135deg, #F4F0E4 0%, #DCEAE8 100%)' },
  { name: 'peach',   label: '피치',   primary: '#FF9A86', secondary: '#EC8F8D', bg: 'linear-gradient(135deg, #FFF0BE 0%, #FFD6A6 100%)' },
  { name: 'sage',    label: '세이지', primary: '#96A78D', secondary: '#B6CEB4', bg: 'linear-gradient(135deg, #F0F0F0 0%, #D9E9CF 100%)' },
  { name: 'spring',  label: '스프링', primary: '#F39EB6', secondary: '#B8DB80', bg: 'linear-gradient(135deg, #F7F6D3 0%, #FFE4EF 100%)' },
];

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty('--primary-color', theme.primary);
  root.style.setProperty('--secondary-color', theme.secondary);
  root.style.setProperty('--bg-gradient', theme.bg);
}

function Header() {
  const navigate = useNavigate();
  const [activeTheme, setActiveTheme] = useState(
    () => localStorage.getItem('theme') || 'purple'
  );

  useEffect(() => {
    const saved = THEMES.find((t) => t.name === activeTheme) || THEMES[0];
    applyTheme(saved);
  }, [activeTheme]);

  const handleThemeClick = (theme) => {
    setActiveTheme(theme.name);
    localStorage.setItem('theme', theme.name);
    applyTheme(theme);
  };

  return (
    <header className="header">

      {/* 왼쪽: 로고 + 버튼 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <h1 onClick={() => navigate('/')} style={{ margin: 0 }}>
          📚 도서관리 시스템
        </h1>
        <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.08)', margin: '0 4px' }} />
        <button className="btn-new" onClick={() => navigate('/books')}>도서 목록</button>
        <button className="btn-new" onClick={() => navigate('/books/new')}>도서 등록</button>
      </div>

      {/* 오른쪽 끝: 테마 팔레트 */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 'auto' }}>
        {THEMES.map((theme) => (
          <button
            key={theme.name}
            onClick={() => handleThemeClick(theme)}
            title={theme.label}
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              border: activeTheme === theme.name ? '3px solid white' : '2px solid rgba(255,255,255,0.4)',
              boxShadow: activeTheme === theme.name
                ? `0 0 0 2px ${theme.primary}, 0 4px 8px rgba(0,0,0,0.2)`
                : '0 2px 4px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
          />
        ))}
      </div>

    </header>
  );
}

export default Header;