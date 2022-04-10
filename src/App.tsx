import './App.css';
import { FIFO } from './algorithms'

function App() {
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // const button: HTMLButtonElement = event.currentTarget;
    FIFO();
  };

  return (
    <div className="App">
      <button onClick={buttonHandler}>FIFO</button>
      <button>SJF</button>
      <button>SRT</button>
      <button>RR</button>
    </div>
  );
}

export default App;
