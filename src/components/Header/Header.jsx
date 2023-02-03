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
        <Link to="/" className='backLink'><img src="/images/arrow.svg" alt="На главную" width={50}/></Link> 
        : null
      }
      { window.location.pathname !== '/' ? 
        <Link to="/"><h1>Генератор поздравлений</h1></Link> 
        : <h1>Генератор поздравлений</h1>
      }
    </header>
  );
}