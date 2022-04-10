import React, { useState } from "react";

class Process {
  arrivalTime: number;
  totalCPUTime: number;
  remainingCPUTime: number;
  turnaroundTime: number;
 
  constructor(arrival: number, total: number) {
    this.arrivalTime = arrival;
    this.totalCPUTime = total;
    this.remainingCPUTime = total;
    this.turnaroundTime = 0;
  }
}
 
export const p1 = new Process(3, 5);
export const p2 = new Process(4,4);
export const p3 = new Process(1,3);

// export const FIFO = (...args: Process[]) => {
export const FIFO = (args: Process[] = [p1, p2, p3]) => {
  // complete is true when all processes are done
  let complete: boolean = false;
  let queue: Process[] = args;
  let running: Process;

  // sort queue based on arrival time:
  //  - if 1 is returned, p2 is sorted before p1 (p2.arrival < p1.arrival)
  //  - if -1 is returned, p1 is sorted before p2 (p1.arrival < p2.arrival)
  queue.sort((p1, p2) => (p1.arrivalTime >= p2.arrivalTime) ? 1 : -1);
  console.log(queue);

  // run until all processes are finished running
  while(!complete) {
    // check if any processes are still running
    complete = true;
    for(let i = 0; i < args.length; i++) {
      if(args[i].arrivalTime != 0) {
        complete = false;
      }
    }

    // if any processes are not complete, then proceed
    if(!complete) {
      complete = true;
    }
  }
}