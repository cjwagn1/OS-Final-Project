import React from "react";
import styled, { AnyStyledComponent } from "styled-components";
import gridData from "../../utils/initialGridData.json";
import { motion } from "framer-motion";

interface IProcessGridProps {
  numOfProcesses: number;
  maxGridTime: number;
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

export default () => {
  const processCount = Object.keys(gridData.processes).length;
  let maxGridSize = 0;

  //add up all CPU time to get perfect grid size
  gridData.processes.forEach((process) => {
    Object.entries(process).forEach(([key, value]) => {
      if (key === "totalCPUTime") {
        maxGridSize = maxGridSize + value;
      }
    });
  });

  return (
    <div>
      <NumberGrid maxGridTime={maxGridSize}>
        {[...Array(maxGridSize)].map((e, key) => (
          <div key={key}>{key + 1}</div>
        ))}
      </NumberGrid>
      <ProcessGrid numOfProcesses={processCount} maxGridTime={maxGridSize}>
        {[...Array(processCount)].map((e, key) => (
          <div
            style={{
              gridColumn: `${1 + gridData.processes[key].arrivalTime} / ${
                gridData.processes[key].totalCPUTime
              }`,
              gridRow: `${key + 1}`,
            }}
            key={key}
          >
            p{key}
          </div>
        ))}
      </ProcessGrid>
    </div>
  );
};
