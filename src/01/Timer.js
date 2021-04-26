import * as React from "react";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProgressCircle } from "../ProgressCircle";
import { timerMachine } from "./timerMachine";
import { useMachine } from "@xstate/react";
import { inspect } from "@xstate/inspect";

inspect({
  iframe: false,
});

export const Timer = () => {
  const [state, send] = useMachine(timerMachine, {
    devTools: true,
  });
  const status = state.value; // finite state values "idle", "running", "inactive"

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
            send({ type: "TOGGLE" });
          }}
        >
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          <button
            onClick={() => {
              // ...event = RESET
              send({ type: "RESET" });
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
              send({ type: "TOGGLE" });
            }}
            title="Pause timer"
          >
            <FontAwesomeIcon icon={faPause} />
          </button>
        ) : (
          <button
            onClick={() => {
              // ...event = TOGGLE
              send({ type: "TOGGLE" });
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
