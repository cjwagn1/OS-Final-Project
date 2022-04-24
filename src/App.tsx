import React, { useEffect, useRef, useState } from "react";
import { FIFO, SJF, SRT, RR } from "./utils/Algorithms";
import styled, { AnyStyledComponent } from "styled-components";
import Visualizer from "./components/common/Visualizer";

// import gridData from "./utils/initialGridData.json";

const OSApp: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
`;
const VisualizerGroup: AnyStyledComponent = styled.div`
  display: flex;
  justify-content: center;
`;
const AlgorithmButtons: AnyStyledComponent = styled.div`
  display: flex;
  justify-content: center;
`;
const delay = 1;
function App() {
  const [algoData, setAlgoData]: any[] = useState([]);
  const [counter, setCounter] = useState(0);
  const timer: any = useRef(null);

  useEffect(() => {
    // useRef value stored in .current property
    timer.current = setInterval(() => setCounter((v) => v + 1), delay * 1000);
    console.log(algoData);
    // clear on component unmount

    return () => {
      clearInterval(timer.current);
      setCounter(0);
    };
  }, [algoData]);

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;

    switch (button.textContent) {
      case "FIFO": {
        setAlgoData(FIFO());
        setCounter(0);

        break;
      }
      case "SJF": {
        setAlgoData(SJF());
        setCounter(0);
        break;
      }
      case "SRT": {
        setAlgoData(SRT());
        setCounter(0);
        break;
      }
      case "RR": {
        // have to give it a time quantum
        setAlgoData(RR(1));
        setCounter(0);
        break;
      }
    }
  };

  return (
    <OSApp>
      <AlgorithmButtons>
        <button onClick={buttonHandler}>FIFO</button>
        <button onClick={buttonHandler}>SJF</button>
        <button onClick={buttonHandler}>SRT</button>
        <button onClick={buttonHandler}>RR</button>
      </AlgorithmButtons>
      <VisualizerGroup>
        {algoData.length !== 0 ? (
          <Visualizer
            counter={counter}
            currentTimer={timer.current}
            algorithmGridData={algoData}
          />
        ) : (
          <div>Click an algorithm to start!</div>
        )}
      </VisualizerGroup>
    </OSApp>
  );
}

export default App;
