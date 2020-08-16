import React, { useState } from 'react';

type FuncPromise<VAL> = () => Promise<VAL>;
type FuncOrPromise<VAL, FULL> = FuncPromise<FULL> | Promise<VAL>;

function isPromise<VAL, FULL>(prom: FuncOrPromise<VAL, FULL>): prom is Promise<VAL> {
  return (prom as Promise<VAL>).then !== undefined;
}

export function useOptimisticState<STATE>(initialState: STATE) {
  const [state, setState] = useState(initialState);

  // /**
  //  *
  //  * @param {Function | Promise} request
  //  * @param {Function | undefined} optimisticResponse (prevState)
  //  * @param {Function | undefined} updateFunc (responseValue, prevState) will update the state with the response if no function is provided
  //  */
  async function wrappedSetState<VAL>(
    request: FuncOrPromise<VAL, STATE>,
    optimisticResponse?: (input: STATE) => STATE,
    updateFunc?: (resVal: VAL, prevState: STATE) => STATE
  ) {
    //optimisticResponse, updateFunc) {
    // set the optimisticResponse based on the previous state
    // this should create a new state that is visually what should appear
    if (optimisticResponse) {
      setState(prevState => {
        return optimisticResponse(prevState);
      });
    }

    let responseVal: VAL;
    let responseState;

    // is already a promise
    if (isPromise(request)) {
      responseVal = (await request) as VAL;
    } else {
      // is a function
      responseState = (await request()) as STATE;
    }

    //   // update the current state with the results of the real request
    //   // if there is an update function that need to happen pass the data and the  previous state
    //   // if there are no changes then just pass back the data
    if (updateFunc) {
      setState(
        (prevState: STATE): STATE => {
          return updateFunc(responseVal, prevState);
        }
      );
    } else if (responseState) {
      setState(responseState);
    } else {
      // TODO this might mean I should make two functions
      throw new Error('Function invoked with invalid combination');
    }
  }

  return [state, wrappedSetState] as const;
}

/** This version doesn't handle multiple adds in a row
  export function useOptimisticState(initialState) {
  const [state, setState] = useState(initialState);

  async function updateFunc(request, optimisticResponse, parser) {
    const savedStateBeforeAction = state;
    let expectedState = state;
    if (optimisticResponse) {
      setState((prevState, props) => {
        const optimisticValue = optimisticResponse(prevState);
        expectedState = optimisticValue;
        return optimisticValue;
      });
    }
    const data = await request;
    console.log(data, savedStateBeforeAction);
    // const parsedData = parser ? parser(data, savedStateBeforeAction) : data;
    // setState(parsedData);
    setState((prevState, props) => {
      console.log('savedStateBeforeAction', savedStateBeforeAction);
      console.log('expectedState', expectedState);
      console.log('prevState', prevState);
      return parser ? parser(data, savedStateBeforeAction) : data;
    });
  }

  return [state, updateFunc];
}
 */
