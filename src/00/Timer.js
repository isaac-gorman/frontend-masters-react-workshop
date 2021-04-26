import * as React from "react";
import { useReducer } from "react";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProgressCircle } from "../ProgressCircle";
import { timerReducer, timerMachine } from "./timerMachine";

// Import the timer machine and its initial state:
// import { ... } from './timerMachine';

export const Timer = () => {
  const [status, dispatch] = useReducer(timerReducer, timerMachine.initial);

  const { duration, elapsed, interval } = {
    duration: 60,
    elapsed: 0,
    interval: 0.1,
  };

  return (
    <div
      className="timer"
      data-state={status}
      style={{
        // @ts-ignore
        "--duration": duration,
        "--elapsed": elapsed,
        "--interval": interval,
      }}
    >
      <header>
        <h1>Exercise 00</h1>
      </header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{status}</div>
        <div
          className="elapsed"
          onClick={() => {
            // ...
            dispatch({ type: "TOGGLE" });
          }}
        >
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          <button
            onClick={() => {
              // ...event = RESET
              dispatch({ type: "RESET" });
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="actions">
        {/* I need to hide the start timer when in the play state */}
        {status === "running" ? (
          <button
            onClick={() => {
              // ...event = TOGGLE
              dispatch({ type: "TOGGLE" });
            }}
            title="Pause timer"
          >
            <FontAwesomeIcon icon={faPause} />
          </button>
        ) : (
          <button
            onClick={() => {
              // ...event = TOGGLE
              dispatch({ type: "TOGGLE" });
            }}
            title="Start timer"
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
      </div>
    </div>
  );
};
