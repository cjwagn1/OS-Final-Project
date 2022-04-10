// import React, { useState } from "react";

import { exit } from "node:process";

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
  let queue: Process[] = []; // shallow copy of args
  let running: boolean = false;
  let runningProcess!: Process;
  let timer: number = 0;
  let avgTurnaroundTime: number = 0;
  const numOfProcesses: number = args.length;

  // copy args to queue
  args.forEach(process => queue.push(Object.assign({}, process)));

  // sort queue based on arrival time:
  //  - if 1 is returned, p2 is sorted before p1 (p2.arrival < p1.arrival)
  //  - if -1 is returned, p1 is sorted before p2 (p1.arrival < p2.arrival)
  queue.sort((p1, p2) => (p1.arrivalTime >= p2.arrivalTime) ? 1 : -1);
  console.log(queue);

  // run until all processes are finished running
  while(!complete) {
    if(queue.length > 0) {
      // take next process in queue and place it in running if no process is running,
      // otherwise, wait until process is done
      if(running === false) {
        // a process can only run once it has arrived
        if(queue[0].arrivalTime <= timer) {
          running = true;
          runningProcess = queue.shift()!;
          console.log('%s is running at time %d', runningProcess.name, timer);
        }
        else {
          console.log('nothing is running at time %d', timer);
        }
      }
    }
    else {
      console.log('queue is empty!');
    }

    // increment "timer"
    timer++;

    // if no process is running, then don't touch the runningProcess (because
    // there is no running process...)
    if(running === true) {
      // decrement remaining time of running process
      runningProcess.remainingCPUTime--;

      // do we need a new process?
      if(runningProcess.remainingCPUTime === 0) {
        running = false;
        runningProcess.turnaroundTime = timer - runningProcess.arrivalTime;
        console.log('%s is done running at time %d', runningProcess.name, timer);
        avgTurnaroundTime += runningProcess.turnaroundTime;
        console.log(runningProcess);
      }
    }

    if(queue.length === 0 && running === false) {
      complete = true;
      console.log('we\'re done!');
      console.log('Total Time: %d', timer);

      avgTurnaroundTime = avgTurnaroundTime / numOfProcesses;
      console.log('Average Turnaround Time: %f', avgTurnaroundTime);
    }
  }
}

// Shortest Job First:
// With the SJF algorithm, there is no pre-emption. A process will run until
// it is completely done, then the next process in the queue will run.
// export const SJF = (...args: Process[]) => {
export const SJF = (args: Process[] = [p1, p2, p3]) => {
  // complete is true when all processes are done
  let complete: boolean = false;
  let queue: Process[] = [];
  let running: boolean = false;
  let runningProcess!: Process;
  let timer: number = 0;
  let avgTurnaroundTime: number = 0;
  const numOfProcesses: number = args.length;

  // copy args to queue
  args.forEach(process => queue.push(Object.assign({}, process)));
  
  // sort queue based on arrival time:
  //  - if 1 is returned, p2 is sorted before p1 (p2.arrival < p1.arrival)
  //  - if -1 is returned, p1 is sorted before p2 (p1.arrival < p2.arrival)
  queue.sort((p1, p2) => (p1.totalCPUTime >= p2.totalCPUTime) ? 1 : -1);
  console.log(queue);
  
  // run until all processes are finished running
  while(!complete) {
    if(queue.length > 0) {
      // take next process in queue and place it in running if no process is running,
      // otherwise, wait until process is done
      if(running === false) {
        // a process can only run once it has arrived
        if(queue[0].arrivalTime <= timer) {
          running = true;
          runningProcess = queue.shift()!;
          console.log('%s is running at time %d', runningProcess.name, timer);
        }
        else {
          console.log('nothing is running at time %d', timer);
        }
      }
    }
    else {
      console.log('queue is empty!');
    }
  
    // increment "timer"
    timer++;
  
    // if no process is running, then don't touch the runningProcess (because
    // there is no running process...)
    if(running === true) {
      // decrement remaining time of running process
      runningProcess.remainingCPUTime--;
  
      // do we need a new process?
      if(runningProcess.remainingCPUTime === 0) {
        running = false;
        runningProcess.turnaroundTime = timer - runningProcess.arrivalTime;
        console.log('%s is done running at time %d', runningProcess.name, timer);
        avgTurnaroundTime += runningProcess.turnaroundTime;
        console.log(runningProcess);
      }
    }
  
    if(queue.length === 0 && running === false) {
      complete = true;
      console.log('we\'re done!');
      console.log('Total Time: %d', timer);
  
      avgTurnaroundTime = avgTurnaroundTime / numOfProcesses;
      console.log('Average Turnaround Time: %f', avgTurnaroundTime);
    }
  }
}