import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  document.title = 'Генератор поздравлений';
  return (<ul className='menu'>
    <li><Link to="/generator/birth_f">День рождения девушки</Link></li>
    <li><Link to="/generator/new_year">Новый год</Link></li>
  </ul>);
}