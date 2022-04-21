import React, { useEffect, useState } from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { gridData } from "../../utils/Algorithms";
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
}

const ProcessGrid: AnyStyledComponent = styled.div`
  display: grid;
  margin: 4px;
  grid-template-columns: repeat(
    ${(props: IProcessGridProps) => props.maxGridTime},
    1fr
  );
  grid-gap: 10px;
  grid-template-rows: repeat(
    ${(props: IProcessGridProps) => props.numOfProcesses},
    1fr
  );

  > div {
    text-align: center;
    border: 1px blue solid;
  }
`;

const NumberGrid: AnyStyledComponent = styled.div`
  display: grid;
  margin: 4px;
  grid-template-columns: repeat(
    ${(props: IProcessGridProps) => props.maxGridTime},
    1fr
  );
  grid-gap: 10px;
  grid-template-rows: repeat(1, 1fr);

  > div {
    text-align: center;
    color: red;
    border: 1px red solid;
  }
`;

export default ({
  algorithmGridData,
  counter,
  currentTimer,
}: IVisualizerProps) => {
  const [algoTimedData, setAlgoTimedData]: any[] = useState([]);
  const processCount = algorithmGridData[0].processCount;

  let maxGridSize = 0;

  useEffect(() => {
    for (let i = 0; i < algorithmGridData.length; i++) {
      if (counter === algorithmGridData[i].startTime) {
        setAlgoTimedData((oldArray: any) => [
          ...oldArray,
          algorithmGridData[i],
        ]);
      }
    }

    if (counter === 10) {
      clearInterval(currentTimer);
    }

    // console.log(counter);
  }, [algorithmGridData, counter, currentTimer]);

  //add up all CPU time to get perfect grid size
  gridData.forEach((process) => {
    Object.entries(process).forEach(([key, value]) => {
      if (key === "totalCPUTime") {
        maxGridSize = maxGridSize + value;
      }
    });
  });
  // console.log(algoTimedData);
  return (
    <div>
      <NumberGrid maxGridTime={maxGridSize}>
        {[...Array(maxGridSize)].map((e, key) => (
          <div
            style={{ color: `${counter === key + 1 ? "blue" : "red"}` }}
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
              gridColumn: `${1 + algoTimedData[key].startTime} / ${
                algoTimedData[key].endTime + 1
              }`,
              gridRow: `${algoTimedData[key].line}`,
            }}
            key={key}
          >
            {algoTimedData[key].name}
          </div>
        ))}
      </ProcessGrid>
    </div>
  );
};
