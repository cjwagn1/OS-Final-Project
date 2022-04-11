import './App.css';
import { FIFO, SJF, SRT, RR } from './algorithms'

function App() {
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    const button: HTMLButtonElement = event.currentTarget;

    switch(button.textContent) {
      case 'FIFO': {
        FIFO();
        break;
      }
      case 'SJF': {
        SJF();
        break;
      }
      case 'SRT': {
        SRT();
        break;
      }
      case 'RR': {
        RR(1); // have to give it a time quantum
        break;
      }
    }
  };

  return (
    <div className="App">
      <button onClick={buttonHandler}>FIFO</button>
      <button onClick={buttonHandler}>SJF</button>
      <button onClick={buttonHandler}>SRT</button>
      <button onClick={buttonHandler}>RR</button>
    </div>
  );
}

export default App;
