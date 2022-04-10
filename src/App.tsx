import './App.css';
import { FIFO, SJF } from './algorithms'

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
    }
  };

  return (
    <div className="App">
      <button onClick={buttonHandler}>FIFO</button>
      <button onClick={buttonHandler}>SJF</button>
      <button>SRT</button>
      <button>RR</button>
    </div>
  );
}

export default App;
