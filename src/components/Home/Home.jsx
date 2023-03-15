import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    document.title = 'Генератор поздравлений';
    document.querySelector('meta[name="description"]').setAttribute("content", "Различные генераторы поздравлений");
    window.ym(92654360, 'hit', window.location.href);
    fetch(`/settings/data.json`)
    .then(res => res.json())
    .then(res => {
      setData(res);
    })
    .catch(err => console.error(err));
  }, []);
  
  return (<ul className='menu'>
    {
      data.map(item => {
        return (
        <li key={item.id}>
          <Link to={`/generator/${item.code}`}>
            <img src={item.icon} alt={item.icon_alt} width={150} height={150} />
            <p>{item.name}</p>
          </Link>
        </li>
        );
      })
    }
  </ul>);
}