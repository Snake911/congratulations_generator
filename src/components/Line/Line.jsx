export const Line = ({ part, changeParts, index }) => { 
  
  return (
        <>
          <li>{part[0]} {part[1]}</li>
          <button onClick={() => changeParts(index)}>поменять</button>
        </>
  );
}