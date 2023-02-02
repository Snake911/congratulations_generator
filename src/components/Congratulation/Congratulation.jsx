import './Congratulation.css';

export const Congratulation = ({ congratulation, copy, setCopy }) => {
  const copyText = (e) => {
    async function copy() {
      try {
        const type = "text/plain";
        const blob = new Blob([congratulation], { type });
        await navigator.clipboard.write([
          new ClipboardItem({ [type]: blob }),
        ]);
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 2000);
      } catch (err) {
        console.error(err);
      }
    }
    copy();
  }
  const classes = `congratulationContainer${copy ? ' active' : ''}`;
  return (
  <div className={classes} onClick={copyText}>
    <p>{congratulation}</p>
  </div>);
}