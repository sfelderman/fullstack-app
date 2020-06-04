import React, { useState } from 'react';

export function useOptimisticState(initialState) {
  const [state, setState] = useState(initialState);

  /**
   *
   * @param {Function | Promise} request
   * @param {Function | undefined} optimisticResponse (prevState)
   * @param {Function | undefined} updateFunc (responseValue, prevState) will update the state with the response if no function is provided
   */
  async function wrappedSetState(request, optimisticResponse, updateFunc) {
    // set the optimisticResponse based on the previous state
    // this should create a new state that is visually what should appear
    if (optimisticResponse) {
      setState(prevState => {
        return optimisticResponse(prevState);
      });
    }

    let responseValue;
    // is already a promise
    if (typeof request.then === 'function') {
      responseValue = await request;
    } else {
      // is a function
      responseValue = await request();
    }

    // update the current state with the results of the real request
    // if there is an update function that need to happen pass the data and the  previous state
    // if there are no changes then just pass back the data
    setState(prevState => {
      return updateFunc ? updateFunc(responseValue, prevState) : responseValue;
    });
  }

  return [state, wrappedSetState];
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
