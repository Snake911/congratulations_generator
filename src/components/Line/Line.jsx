import './Line.css';

const animationLine = (e) => {
  e.target.classList.add('active');

  e.target.addEventListener('animationend', (e) => {
    e.target.classList.remove('active');
  });
}

export const Line = ({ part, changeParts, index }) => {   
  return (
        <div className='line'>
          <button className='lineRegenerator' onClick={(e) => {changeParts(index); animationLine(e)}}></button>
          <li>{part[0]} {part[1]}</li>          
        </div>
  );
}