// import React, { useState } from "react";

class Process {
  name: string;
  arrivalTime: number;
  totalCPUTime: number;
  remainingCPUTime: number;
  turnaroundTime: number;
 
  constructor(name: string, arrival: number, total: number) {
    this.name = name;
    this.arrivalTime = arrival;
    this.totalCPUTime = total;
    this.remainingCPUTime = total;
    this.turnaroundTime = 0;
  }
}
 
export const p1 = new Process('p1', 3, 5);
export const p2 = new Process('p2', 4,4);
export const p3 = new Process('p3', 1,3);

// export const FIFO = (...args: Process[]) => {
export const FIFO = (args: Process[] = [p1, p2, p3]) => {
  // complete is true when all processes are done
  let complete: boolean = false;
  let queue: Process[] = args;
  let running: boolean = false;
  let runningProcess!: Process;
  let timer: number = 0;

  // sort queue based on arrival time:
  //  - if 1 is returned, p2 is sorted before p1 (p2.arrival < p1.arrival)
  //  - if -1 is returned, p1 is sorted before p2 (p1.arrival < p2.arrival)
  queue.sort((p1, p2) => (p1.arrivalTime >= p2.arrivalTime) ? 1 : -1);
  console.log(queue);

  // run until all processes are finished running
  while(!complete) {
    // increment "timer"
    timer++;

    if(queue.length > 0) {
      // take next process in queue and place it in running if no process is running,
      // otherwise, wait until process is done
      if(running === false) {
        running = true;
        runningProcess = queue.shift()!;
        console.log('%s is running at time %d', runningProcess.name, timer);
      }

      // decrement remaining time of running process
      runningProcess.remainingCPUTime--;

      // do we need a new process?
      if(runningProcess.remainingCPUTime === 0) {
        running = false;
        runningProcess.turnaroundTime = timer - runningProcess.arrivalTime;
        console.log('%s is done running at time %d', runningProcess.name, timer);
      }
    }
    else {
      console.log('queue is empty, we\'re done!');
      complete = true;
    }
  }
}