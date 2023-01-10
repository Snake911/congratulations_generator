import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [parts, setParts] = useState([]);
  const [congratulation, setCongratulation] = useState('');

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  useEffect(() => {
    fetch('/birth_f.json')
    .then(res => res.json())
    .then(res => {
      const result = [];
      for (const key in res) {
        if (Object.hasOwnProperty.call(res, key)) {
          result.push([[key], res[key][randomIntFromInterval(0, res[key].length - 1)]]);          
        }
      }
      setParts(result);
    })
    .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const str = parts.map((part) => `${part[0]} ${part[1]}`).join(' ');
    setCongratulation(str);
  }, [parts]);
  return (
    <div className="App">
      <ul>
        {parts.map((part) => <li>{part[0]} {part[1]}</li>)}
      </ul>
      <h2>{congratulation}</h2>
    </div>
  );
}

export default App;
