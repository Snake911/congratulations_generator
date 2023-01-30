import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import './Header.css';

export const Header = () => {
  useEffect(
    () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useLocation().pathname])
  return (
    <header>
      { window.location.pathname !== '/' ? 
        <Link to="/" className='backLink'><img src="/images/arrow.svg" alt="На главную" /></Link> 
        : null
      }
      <h1>Генератор поздравления</h1>
    </header>
  );
}