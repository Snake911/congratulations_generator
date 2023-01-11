import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [columns, setColumns] = useState([]);
  const [parts, setParts] = useState([]);
  const [congratulation, setCongratulation] = useState('');

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const changeParts = (column) => {
    const newParts = [...parts];
    newParts[column][1] = columns[column][randomIntFromInterval(1, columns[column].length - 1)];
    setParts(newParts);
  }

  useEffect(() => {
    fetch('/birth_f.json')
    .then(res => res.json())
    .then(res => {
      setColumns(res);
    })
    .catch(err => console.error(err));
  }, []);

  useEffect(() => {
      const result = [];
      columns.map(column => result.push([column[0], column[randomIntFromInterval(1, column.length - 1)]]))
      setParts(result);
  }, [columns]);

  useEffect(() => {
    const str = parts.map((part) => `${part[0]} ${part[1]}`).join(' ');
    setCongratulation(str);
  }, [parts]);
  return (
    <div className="App">
      <ul>
        {parts.map((part, index) => <li key={part[0]}>{part[0]} {part[1]} <button onClick={() => changeParts(index)}>поменять</button></li>)}
      </ul>
      <h2>{congratulation}</h2>
    </div>
  );
}

export default App;
