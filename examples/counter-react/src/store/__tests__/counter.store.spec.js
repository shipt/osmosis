import React, { useContext } from 'react';
import { CounterContext, CounterWrapper} from '../counter.store';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('CounterStore', () => {
  let store;
  const renderStore = () => {
    let Prep = CounterWrapper(() => {
      store = useContext(CounterContext)[0];
      return null;
    });
    render(<Prep />);
  };

  it('tests increment', () => {
    act(() => {
      renderStore();
    });
    expect(store.state.count).toEqual(0);
    act(() => {
      store.incrementCount();
    });
    expect(store.state.count).toEqual(1);
  });

  it('tests decrement', () => {
    act(() => {
      renderStore();
    });
    expect(store.state.count).toEqual(0);
    act(() => {
      store.decrementCount();
    });
    expect(store.state.count).toEqual(-1);
  });
});
