import { createMachine } from "xstate";
// convert my timerMachine to a createMachine() and pass it the object

export const timerMachine = createMachine({
  initial: "idle",
  states: {
    idle: {
      on: {
        TOGGLE: "running",
      },
    },
    running: {
      on: {
        TOGGLE: "paused",
      },
    },
    paused: {
      on: {
        TOGGLE: "running",
        RESET: "idle",
      },
    },
  },
});

// export const timerReducer = (state, event) => {
//   console.log("input:", state, event);
//   const nextState = timerMachine.states[state].on[event.type] || state;
//   console.log("output:", nextState);
//   return nextState;
// };
