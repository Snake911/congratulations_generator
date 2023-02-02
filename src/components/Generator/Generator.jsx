import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Congratulation } from '../Congratulation/Congratulation';
import { Line } from '../Line/Line';
import { LineSkeleton } from '../Line/Skeleton';

import './Generator.css';

export const Generator = (props) => {
  const [string, setString] = useState(1);
  const [columns, setColumns] = useState([]);
  const [parts, setParts] = useState([]);
  const [congratulation, setCongratulation] = useState('');
  const [name, setName] = useState('');
  const [copy, setCopy] = useState(false);

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
    setCopy(false);
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
      setCopy(false);
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
    document.title = name;
  }, [name]);

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
      <div className="generatorContainer">
        <ul className='generatorParts'>
          {parts.length ?
            parts.map((part, index) => {
              return <Line part={part} index={index} changeParts={changeParts} key={part[0]} />
            })
            : <>
                <LineSkeleton />
                <LineSkeleton />
                <LineSkeleton />
                <LineSkeleton />
              </>
          }
        </ul>
        <button className="generatorAll" onClick={() => changeAllParts()}>Обновить все строки</button>
        <Congratulation congratulation={congratulation} copy={copy} setCopy={setCopy}/>        
      </div>
    </div>
  )
}
  
  