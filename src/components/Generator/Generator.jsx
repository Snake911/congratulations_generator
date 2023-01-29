import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Congratulation } from '../Congratulation/Congratulation';
import { Line } from '../Line/Line';

export const Generator = (props) => {
  const [string, setString] = useState(1);
  const [columns, setColumns] = useState([]);
  const [parts, setParts] = useState([]);
  const [congratulation, setCongratulation] = useState('');

  const { file } = useParams();


  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const changeParts = (column) => {
    const newParts = [...parts];
    let newString = string;
    while(newString === string) {
      newString = randomIntFromInterval(1, columns[column].length - 1);
    }
    setString(newString)
    newParts[column][1] = columns[column][string];
    setParts(newParts);
  }

  const changeAllParts = () => {
    columns.forEach((_, column) => {
      const newParts = [...parts];
      let newString = string;
      while(newString === string) {
        newString = randomIntFromInterval(1, columns[column].length - 1);
      }
      setString(newString)
      newParts[column][1] = columns[column][string];
      setParts(newParts);
    });
  }

  useEffect(() => {
    fetch(`/${file || 'birth_f'}.json`)
    .then(res => res.json())
    .then(res => {
      setColumns(res);
    })
    .catch(err => console.error(err));
  }, [file]);

  useEffect(() => {
      const result = [];
      columns.map(column => result.push([column[0], column[string]]))
      setParts(result);
  }, [columns, string]);

  useEffect(() => {
    const str = parts.map((part) => `${part[0]} ${part[1]}`).join(' ');
    setCongratulation(str);
  }, [parts]);

  return (
    <>
      <Link to="/">На главную</Link>
      <button onClick={() => changeAllParts()}>Сгенирировать поздравление</button>
      <ul>
        {
          parts.map((part, index) => {
            return <Line part={part} index={index} changeParts={changeParts} key={part[0]} />
          })
        }
      </ul>
      <Congratulation congratulation={congratulation}/>
    </>
  )
}
  
  