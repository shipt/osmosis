import React, { useContext } from 'react';
import { CounterContext, wrapCounter } from '../counter.store';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('CounterStore', () => {
  let store;
  const renderStore = () => {
    let Prep = wrapCounter(() => {
      store = useContext(CounterContext)[0];
      return null;
    });
    render(<Prep />);
  };

  it('tests increment', async () => {
    act(() => {
      renderStore();
    });
    expect(store.state.count).toEqual(0);
    act(() => {
      store.increment();
    });
    expect(store.state.count).toEqual(1);
  });

  it('tests decrement', async () => {
    act(() => {
      renderStore();
    });
    expect(store.state.count).toEqual(0);
    act(() => {
      store.decrement();
    });
    expect(store.state.count).toEqual(-1);
  });
});
