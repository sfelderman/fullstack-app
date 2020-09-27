import { useState } from 'react';

type FuncWillReturnPromise<VAL> = () => Promise<VAL>;
type FuncOrPromise<VAL, FULL> = FuncWillReturnPromise<FULL> | Promise<VAL>;

function isPromise<VAL, FULL>(prom: FuncOrPromise<VAL, FULL>): prom is Promise<VAL> {
  return (prom as Promise<VAL>).then !== undefined;
}

type OptResponse<STATE> = (input: STATE) => STATE;
type UpdateFunc<VAL, STATE> = (resVal: VAL, prevState: STATE) => STATE;

export type OUISetState<STATE> = <VAL>(
  request: FuncOrPromise<VAL, STATE>,
  optimisticResponse?: OptResponse<STATE> | undefined,
  updateFunc?: UpdateFunc<VAL, STATE> | undefined
) => Promise<void>;

function useOptimisticState<STATE>(initialState: STATE) {
  const [state, setState] = useState(initialState);

  async function wrappedSetState<VAL>(
    request: FuncOrPromise<VAL, STATE>,
    optimisticResponse?: OptResponse<STATE>,
    updateFunc?: UpdateFunc<VAL, STATE>
  ) {
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
      console.log('using set state version');
      setState(responseState);
    } else {
      // TODO this might mean I should make two functions
      throw new Error('Function invoked with invalid combination');
    }
  }

  return [state, setState, wrappedSetState] as const;
}
export default useOptimisticState;
