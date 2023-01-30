import './Line.css';

export const Line = ({ part, changeParts, index }) => {   
  return (
        <div className='line'>
          <button className='lineRegenerator' onClick={() => changeParts(index)}></button>
          <li>{part[0]} {part[1]}</li>          
        </div>
  );
}