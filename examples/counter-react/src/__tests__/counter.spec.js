import React from 'react';
import Counter from '../counter';
import { CounterContext } from '../store';
import { render, fireEvent } from '@testing-library/react';

describe('Counter', () => {
  const CounterStore = {
    state: {
      count: 0
    },
    increment: jest.fn(),
    decrement: jest.fn()
  };
  let ContextComponent = () => (
    <CounterContext.Provider value={[CounterStore]}>
      <Counter />
    </CounterContext.Provider>
  );
  it('renders default', async () => {
    let wrapper = await render(<ContextComponent />);
    expect(wrapper.getByTestId('counter-wrap').props).toMatchSnapshot();
  });
  it('tests increment', async () => {
    let wrapper = await render(<ContextComponent />);
    fireEvent.click(wrapper.getByTestId('increment'));
    expect(CounterStore.increment).toHaveBeenCalled();
  });
  it('tests decrement', async () => {
    let wrapper = await render(<ContextComponent />);
    fireEvent.click(wrapper.getByTestId('decrement'));
    expect(CounterStore.decrement).toHaveBeenCalled();
  });
});
