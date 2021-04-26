import React, { useState, useEffect, useReducer } from "react";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import { inspect } from "@xstate/inspect";

inspect({
  iframe: false,
});

const incrementCount = assign({
  count: (context) => {
    return context.count + 1;
  },
});

const alarmMachine = createMachine(
  {
    initial: "inactive",
    context: {
      count: 0,
    },
    states: {
      inactive: {
        on: {
          TOGGLE: {
            target: "pending",
            actions: "incrementCount",
          },
        },
      },
      pending: {
        on: {
          SUCCESS: "active",
          TOGGLE: "inactive",
        },
      },
      active: {
        on: {
          TOGGLE: "inactive",
        },
      },
    },
  },
  {
    actions: {
      incrementCount: incrementCount,
    },
  }
);

console.log(alarmMachine.config.intial);

export const ScratchApp = () => {
  const [state, send] = useMachine(alarmMachine, {
    actions: {
      incrementCount: assign({
        count: (context) => {
          return context.count + 100;
        },
      }),
    },
    devTools: true,
  });
  console.log("state", state);
  const status = state.value; // 'pending', 'active', 'inactive'
  const { count } = state.context;
  // true
  // ?? (saving) = enumerated value
  // false
  useEffect(() => {
    if (status === "pending") {
      setTimeout(() => {
        send({ type: "SUCCESS" });
      }, 2_000);
    }
  }, [status, send]);

  return (
    <div className="scratch">
      <div className="alarm">
        <div className="alarmTime">
          {new Date().toLocaleTimeString("ens-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          ({count})
        </div>
      </div>
      <div
        className="alarmToggle"
        data-active={status === "active" || undefined}
        style={{
          opacity: status === "pending" ? 0.5 : 1,
        }}
        onClick={() => {
          send({ type: "TOGGLE" });
        }}
      ></div>
    </div>
  );
};
