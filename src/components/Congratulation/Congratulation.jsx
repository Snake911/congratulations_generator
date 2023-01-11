export const Congratulation = ({ congratulation }) => {
  const copyText = () => {
    const type = "text/plain";
    const blob = new Blob([congratulation], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    navigator.clipboard.write(data)
    .then(() => {
      console.log('success');
    }, (err) => {
      console.log(err)
    });   
  }
  return <h2 title="Скопировать" onClick={copyText}>{congratulation}</h2>
}