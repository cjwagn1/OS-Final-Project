import React from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { motion } from "framer-motion";

const Example: AnyStyledComponent = styled.div``;

export default () => {
  return (
    <div>
      <motion.div animate={{ scale: 2 }} transition={{ duration: 0.5 }}>
        Animation
      </motion.div>
    </div>
  );
};
