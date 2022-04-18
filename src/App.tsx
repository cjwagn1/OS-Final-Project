import React from "react";
import { FIFO, SJF, SRT, RR } from "./utils/Algorithms";
import styled, { AnyStyledComponent } from "styled-components";
import Visualizer from "./components/common/Visualizer";

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
function App() {
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;

    switch (button.textContent) {
      case "FIFO": {
        FIFO();
        break;
      }
      case "SJF": {
        SJF();
        break;
      }
      case "SRT": {
        SRT();
        break;
      }
      case "RR": {
        RR(1); // have to give it a time quantum
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
        <Visualizer />
      </VisualizerGroup>
    </OSApp>
  );
}

export default App;
