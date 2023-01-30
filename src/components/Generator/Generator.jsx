import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Congratulation } from '../Congratulation/Congratulation';
import { Line } from '../Line/Line';

import './Generator.css';

export const Generator = (props) => {
  const [string, setString] = useState(1);
  const [columns, setColumns] = useState([]);
  const [parts, setParts] = useState([]);
  const [congratulation, setCongratulation] = useState('');
  const [name, setName] = useState('');

  const { file } = useParams();
  const page = file || 'birth_f';

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
    fetch(`/settings/${page}.json`)
    .then(res => res.json())
    .then(res => {
      setColumns(res.strings);
      setName(res.name);
    })
    .catch(err => console.error(err));
  }, [page]);

  useEffect(() => {
      const result = [];
      columns.map((column, index) => result.push([column[0], column[randomIntFromInterval(1, columns[index].length - 1)]]))
      setParts(result);
  }, [columns]);

  useEffect(() => {
    const str = parts.map((part) => `${part[0]} ${part[1]}`).join(' ');
    setCongratulation(str);
  }, [parts]);

  const classes = `generator_page ${page}`

  return (
    <div className={classes}>
      <h2>{name}</h2>
      <button className="generatorAll" onClick={() => changeAllParts()}>Сгенирировать поздравление</button>
      <div className="generatorContainer">
        <ul className='generatorParts'>
          {
            parts.map((part, index) => {
              return <Line part={part} index={index} changeParts={changeParts} key={part[0]} />
            })
          }
        </ul>
        <Congratulation congratulation={congratulation}/>
      </div>
    </div>
  )
}
  
  