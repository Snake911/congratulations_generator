import { useEffect, useState } from 'react';

import { Congratulation } from '../Congratulation/Congratulation';
import { Line } from '../Line/Line';

export const Generator = () => {
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
    <>
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
  
  