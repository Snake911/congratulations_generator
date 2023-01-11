import { Link } from 'react-router-dom';

export const Home = () => {
  return (<div>
    <Link to="/generator/birth_f/">День рождение девушки</Link>
    <Link to="/generator/new_year/">Новый год</Link>
  </div>);
}