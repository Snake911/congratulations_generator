import './Congratulation.css';

export const Congratulation = ({ congratulation }) => {
  const copyText = (e) => {
    const type = "text/plain";
    const blob = new Blob([congratulation], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    navigator.clipboard.write(data)
    .then(() => {
      console.log(e.target.parentElement.classList.add('active'));
      setTimeout(() => {
        e.target.parentElement.classList.remove('active')
      }, 2000);
    }, (err) => {
      console.log(err)
    });   
  }
  return (
  <div className='congratulationContainer' title="Скопировать" onClick={(e) => copyText(e)}>
    <p>{congratulation}</p>
  </div>);
}