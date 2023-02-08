import { Link } from 'react-router-dom';
import './ErrorPage.css';

export const ErrorPage = () => {
  return (
  <div className='ErrorPage'>
    <h2>Ошибка 404</h2>
    <p>Ой, а такой страницы не существует :(</p>
    <Link to="/">Вернемся на главную страницу?</Link>
  </div>
  );
}