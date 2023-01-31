import './Congratulation.css';

export const Congratulation = ({ congratulation }) => {
  const copyText = (e) => {
    async function copy() {
      try {
        const type = "text/plain";
        const blob = new Blob([congratulation], { type });
        await navigator.clipboard.write([
          new ClipboardItem({ [type]: blob }),
        ]);
        e.target.parentElement.classList.add('active')
        setTimeout(() => {
            e.target.parentElement.classList.remove('active')
          }, 2000);
      } catch (err) {
        console.error(err);
      }
    }
    copy();
  }
  return (
  <div className='congratulationContainer' title="Скопировать" onClick={(e) => copyText(e)}>
    <p>{congratulation}</p>
  </div>);
}