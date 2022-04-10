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
 
export const p1 = new Process('p1', 3, 8);
export const p2 = new Process('p2', 5, 4);
export const p3 = new Process('p3', 0, 2);

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
  let copyArgs: Process[] = [];
  let queue: Process[] = [];
  let running: boolean = false;
  let runningProcess!: Process;
  let timer: number = 0;
  let avgTurnaroundTime: number = 0;
  const numOfProcesses: number = args.length;
  let addedIndices: number[] = [];

  // copy args so we don't modify the processes (useful when multile algos
  // are running with the same processes)
  args.forEach(process => copyArgs.push(Object.assign({}, process)));
  
  // run until all processes are finished running
  while(!complete) {
    // this will control whether or not we have to delete an item from
    // copyArgs
    addedIndices = [];

    // if a process has arrived, add it to the queue and sort the queue
    // based on total time
    for(let i = 0; i < copyArgs.length; i++) {
      if(timer === copyArgs[i].arrivalTime) {
        // add to queue
        queue.push(copyArgs[i]);

        // add index to list of addedIndices
        addedIndices.push(i);

        if(queue.length > 1) {
          // re-order if necessary
          //  - if 1 is returned, p2 is sorted before p1 (p2.total < p1.total)
          //  - if -1 is returned, p1 is sorted before p2 (p1.total < p2.total)
          queue.sort((p1, p2) => (p1.totalCPUTime >= p2.totalCPUTime) ? 1 : -1);
          // console.log(queue);
        }
      }
    }

    // remove any processes from copyArgs if they were added to
    // the queue
    for(let i = 0; i < addedIndices.length; i++) {
      copyArgs.splice(addedIndices[i],1);
    }

    // take next process in queue and place it in running if no process is running,
    // otherwise, wait until process is done
    if(running === false) {
      // can only run a process if it's ready
      if(queue.length > 0) {
        running = true;
        runningProcess = queue.shift()!;
        console.log('%s is running at time %d', runningProcess.name, timer);
      }
      else {
        console.log('nothing is running at time %d', timer);
      }
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
  
    // We are done if all of the following are true:
    //  - ready queue is empty
    //  - there isn't anything running
    //  - there aren't any more processes waiting to arrive
    if(queue.length === 0 && running === false && copyArgs.length === 0) {
      complete = true;
      console.log('we\'re done!');
      console.log('Total Time: %d', timer);
  
      avgTurnaroundTime = avgTurnaroundTime / numOfProcesses;
      console.log('Average Turnaround Time: %f', avgTurnaroundTime);
    }
  }
}

// Shortest Remaining Time:
// With the SRT algorithm, the cpu will check the queue when a new process
// arrives or when a process completes. This is the pre-emptive version of
// SJF so it can stop the currently executing process if a newly arrived
// process requires less total CPU Time.
// export const SRT = (...args: Process[]) => {
export const SRT = (args: Process[] = [p1, p2, p3]) => {
  // complete is true when all processes are done
  let complete: boolean = false;
  let copyArgs: Process[] = [];
  let queue: Process[] = [];
  let running: boolean = false;
  let runningProcess!: Process;
  let timer: number = 0;
  let avgTurnaroundTime: number = 0;
  const numOfProcesses: number = args.length;
  let addedIndices: number[] = [];
  let temp: Process;

  // copy args so we don't modify the processes (useful when multile algos
  // are running with the same processes)
  args.forEach(process => copyArgs.push(Object.assign({}, process)));
  
  // run until all processes are finished running
  while(!complete) {
    // this will control whether or not we have to delete an item from
    // copyArgs
    addedIndices = [];

    // if a process has arrived, add it to the queue and sort the queue
    // based on total time
    for(let i = 0; i < copyArgs.length; i++) {
      if(timer === copyArgs[i].arrivalTime) {
        // add to queue
        queue.push(copyArgs[i]);

        // add index to list of addedIndices
        addedIndices.push(i);

        if(queue.length > 1) {
          // re-order if necessary
          //  - if 1 is returned, p2 is sorted before p1 (p2.total < p1.total)
          //  - if -1 is returned, p1 is sorted before p2 (p1.total < p2.total)
          queue.sort((p1, p2) => (p1.totalCPUTime >= p2.totalCPUTime) ? 1 : -1);
          // console.log(queue);
        }
      }
    }

    // remove any processes from copyArgs if they were added to
    // the queue
    for(let i = 0; i < addedIndices.length; i++) {
      copyArgs.splice(addedIndices[i],1);
    }

    // if a process arrived, check to see if a different process should
    // be running; i.e. check to see if there is a process whose remaining
    // cpu time is less than the running process.
    if(addedIndices.length > 0 && running === true) {
      if(queue[0].remainingCPUTime < runningProcess.remainingCPUTime) {
        // swap the current running process and the process first in queue
        temp = runningProcess;
        console.log('%s is moved back to queue at time %d', temp.name, timer);
        runningProcess = queue.shift()!;
        console.log('%s is running at time %d', runningProcess.name, timer);
        queue.push(temp);

        // re-order queue if necessary
        if(queue.length > 1) {
          queue.sort((p1, p2) => (p1.totalCPUTime >= p2.totalCPUTime) ? 1 : -1);
        }
      }
    }

    // take next process in queue and place it in running if no process is running,
    // otherwise, wait until process is done
    if(running === false) {
      // can only run a process if it's ready
      if(queue.length > 0) {
        running = true;
        runningProcess = queue.shift()!;
        console.log('%s is running at time %d', runningProcess.name, timer);
      }
      else {
        console.log('nothing is running at time %d', timer);
      }
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
  
    // We are done if all of the following are true:
    //  - ready queue is empty
    //  - there isn't anything running
    //  - there aren't any more processes waiting to arrive
    if(queue.length === 0 && running === false && copyArgs.length === 0) {
      complete = true;
      console.log('we\'re done!');
      console.log('Total Time: %d', timer);
  
      avgTurnaroundTime = avgTurnaroundTime / numOfProcesses;
      console.log('Average Turnaround Time: %f', avgTurnaroundTime);
    }
  }
}