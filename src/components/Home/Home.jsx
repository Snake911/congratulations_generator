import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  document.title = 'Генератор поздравлений';
  return (<ul className='menu'>
    <li>
      <Link to="/generator/birth_f">
        <img src="./images/cake.svg" alt="" />
        <p>День рождения девушки</p>
      </Link>
    </li>
    <li>
      <Link to="/generator/new_year">
        <img src="./images/tree.svg" alt="" />
        <p>Новый год</p>
      </Link>
      </li>
  </ul>);
}