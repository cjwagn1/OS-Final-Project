import React, { useEffect, useState } from "react";
import styled, { AnyStyledComponent } from "styled-components";

// import ProcessItem from "../../utils/types";
// import { motion } from "framer-motion";

interface IProcessGridProps {
  numOfProcesses: number;
  maxGridTime: number;
}

interface IVisualizerProps {
  algorithmGridData: { [key: string]: any };
  counter: any;
  currentTimer: any;
  basicGridData: any;
}

const ProcessGrid: AnyStyledComponent = styled.div`
  display: grid;
  margin: 4px;
  grid-template-columns: repeat(
    ${(props: IProcessGridProps) => props.maxGridTime},
    1fr
  );
  grid-gap: ${(props: IProcessGridProps) => 1000 / props.maxGridTime}px;
  grid-template-rows: repeat(
    ${(props: IProcessGridProps) => props.numOfProcesses},
    1fr
  );

  > div {
    color: red;
    text-align: center;
  }
`;

const NumberGrid: AnyStyledComponent = styled.div`
  display: grid;
  margin: 4px;
  grid-template-columns: repeat(
    ${(props: IProcessGridProps) => props.maxGridTime},
    1fr
  );
  grid-gap: ${(props: IProcessGridProps) => 1000 / props.maxGridTime}px;
  grid-template-rows: repeat(1, 1fr);

  > div {
    text-align: center;
    color: red;
    font-weight: bold;
  }
`;

export default ({
  algorithmGridData,
  counter,
  currentTimer,
  basicGridData,
}: IVisualizerProps) => {
  const [algoTimedData, setAlgoTimedData]: any[] = useState([]);
  // const [queueData, setQueueData]: any[] = useState([]);
  // const [queueTimedData, setQueueTimedData]: any[] = useState([]);
  const processCount = algorithmGridData[0].processCount;

  let maxGridSize = 0;

  useEffect(() => {
    // const queueData: any = [];

    for (let i = 0; i < algorithmGridData.length; i++) {
      if (counter === algorithmGridData[i].startTime) {
        // if (algoTimedData.remainingCPUTime === 0) {
        //   algorithmGridData[i].color = "green";
        // }

        setAlgoTimedData((oldArray: any) => [
          ...oldArray,
          algorithmGridData[i],
        ]);
      }
    }

    if (counter === maxGridSize) {
      clearInterval(currentTimer);
    }

    // console.log(counter);
  }, [counter, currentTimer, maxGridSize]);

  useEffect(() => {
    // const queueData: any = [];

    setAlgoTimedData([]);

    // console.log(counter);
  }, [algorithmGridData, basicGridData]);

  //add up all CPU time to get perfect grid size
  basicGridData.forEach((process: any) => {
    Object.entries(process).forEach(([key, value]: any) => {
      if (key === "totalCPUTime") {
        maxGridSize = maxGridSize + value;
      }
    });
  });

  maxGridSize = maxGridSize + 1;
  return (
    <div>
      <NumberGrid maxGridTime={maxGridSize}>
        {[...Array(maxGridSize)].map((e, key) => (
          <div
            style={{
              border: `2px ${counter > key + 1 ? "#1B998B" : ""} solid`,
              borderRadius: `${counter > key + 1 ? "5" : ""}px`,
            }}
            key={key}
          >
            {key + 1}
          </div>
        ))}
      </NumberGrid>

      <ProcessGrid numOfProcesses={processCount} maxGridTime={maxGridSize}>
        {[...Array(algoTimedData.length)].map((e, key) => (
          <div
            style={{
              gridColumn: `${algoTimedData[key].startTime} / ${algoTimedData[key].endTime}`,
              gridRow: `${algoTimedData[key].line}`,
              border: `1px ${algoTimedData[key].color} solid `,
            }}
            key={key}
          >
            {algoTimedData[key].name}
          </div>
        ))}
      </ProcessGrid>
      {/* 
      <NumberGrid maxGridTime={maxGridSize}>
        {[...Array(maxGridSize)].map((e, key) => (
          <div
            style={{
              border: `2px ${counter > key + 1 ? "#1B998B" : ""} solid`,
              borderRadius: `${counter > key + 1 ? "5" : ""}px`,
            }}
            key={key}
          >
            {key + 1}
          </div>
        ))}
      </NumberGrid> */}

      {/* <ProcessGrid numOfProcesses={processCount} maxGridTime={maxGridSize}>
        {[...Array(queueTimedData.length)].map((e, key) => (
          <div
            style={{
              gridColumn: `${queueTimedData[key].startTime} / ${queueTimedData[key].endTime}`,
              gridRow: `${queueTimedData[key].line}`,
            }}
            key={key}
          >
            {queueTimedData[key].name}
          </div>
        ))}
      </ProcessGrid> */}
    </div>
  );
};
