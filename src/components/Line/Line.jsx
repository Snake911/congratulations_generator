import './Line.css';

const animationLine = (e) => {
  e.target.classList.add('active');

  e.target.addEventListener('animationend', (e) => {
    e.target.classList.remove('active');
  });
}

export const Line = ({ part, changeParts, index }) => {   
  return (
        <li className='line'>
          <button className='lineRegenerator' onClick={(e) => {changeParts(index); animationLine(e)}} title={`Обновить строку ${index + 1}`}></button>
          <div>{part[0]} {part[1]}</div>          
        </li>
  );
}