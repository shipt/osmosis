import React from 'react';
import Counter from '../counter';
import { GlobalCounterStore } from '../store';
import { render, fireEvent } from '@testing-library/react';

describe('Counter', () => {
  const counterStore = {
    state: {
      count: 0
    },
    incrementNameCount: jest.fn(),
    decrementNameCount: jest.fn()
  };
  let ContextComponent = () => (
    <GlobalCounterStore.Context.Provider value={counterStore}>
      <Counter name="Count" />
    </GlobalCounterStore.Context.Provider>
  );
  it('renders default', async () => {
    let wrapper = await render(<ContextComponent />);
    expect(wrapper.getByTestId('counter-wrap')).toMatchSnapshot();
  });
  it('tests increment button', async () => {
    let wrapper = await render(<ContextComponent />);
    fireEvent.click(wrapper.getByTestId('increment'));
    expect(counterStore.incrementNameCount).toHaveBeenCalled();
  });
  it('tests decrement button', async () => {
    let wrapper = await render(<ContextComponent />);
    fireEvent.click(wrapper.getByTestId('decrement'));
    expect(counterStore.decrementNameCount).toHaveBeenCalled();
  });
});
