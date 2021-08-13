import { useReducer } from 'react';
import { setupStore } from '@shipt/osmosis';

const initialState = {count: 0};

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

const useCounterWithReducerStore = () => {
  const [counterState, dispatch] = useReducer(counterReducer, initialState);;

  return {
    counterState,
    dispatch
  };
};

let  CounterWithReducerStore = setupStore(useCounterWithReducerStore);

export default CounterWithReducerStore;
