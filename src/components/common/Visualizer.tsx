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
  grid-template-columns: repeat(
    ${(props: IProcessGridProps) => props.maxGridTime},
    1fr
  );
  gap: 10px;
  grid-template-rows: repeat(
    ${(props: IProcessGridProps) => props.numOfProcesses},
    1fr
  );
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
    <ProcessGrid numOfProcesses={processCount} maxGridTime={maxGridSize + 2}>
      <motion.div animate={{ scale: 2 }} transition={{ duration: 0.5 }}>
        Animation
      </motion.div>
    </ProcessGrid>
  );
};
