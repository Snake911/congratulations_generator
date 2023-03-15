import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Congratulation } from '../Congratulation/Congratulation';
import { Line } from '../Line/Line';
import { LineSkeleton } from '../Line/Skeleton';

import './Generator.css';

export const Generator = (props) => {
  const [currentPart, setCurrentPart] = useState(1);
  const [columns, setColumns] = useState([]);
  const [parts, setParts] = useState([]);
  const [congratulation, setCongratulation] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [copy, setCopy] = useState(false);

  const { file } = useParams();
  const page = file || 'birth_f';

  const navigate = useNavigate();

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const newPart = (column) => {
    let newCurrentPart = currentPart;
    while(newCurrentPart === currentPart) {
      newCurrentPart = randomIntFromInterval(1, columns[column].length - 1);
    }
    setCurrentPart(newCurrentPart);
  }

  const changeParts = (column) => {
    const newParts = [...parts];
    newPart(column);
    newParts[column][1] = columns[column][currentPart];
    setParts(newParts);
    setCopy(false);
  }

  const changeAllParts = () => {
    columns.forEach((_, column) => {
      changeParts(column)
    });
  }

  useEffect(() => {
    window.ym(92654360, 'hit', window.location.href);
    fetch(`/settings/${page}.json`)
    .then(res => res.json())
    .then(res => {
      setColumns(res.strings);
      setName(res.name);
      setDescription(res.description);
    })
    .catch(err => {
      console.error(err);
      navigate("/404");
    });
  }, [navigate, page]);

  useEffect(() => {
    document.title = `Генератор поздравлений | ${name}`;
    document.querySelector('meta[name="description"]').setAttribute("content", description);
  }, [description, name]);

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
  
  