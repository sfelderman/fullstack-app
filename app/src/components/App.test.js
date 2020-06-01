import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

describe('Full App Testing', () => {
  describe('Add Todo Flow', () => {
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve([])
    });

    test('Shows loading screen', () => {
      act(() => {
        const { getByText } = render(<App />);
        const loading = getByText(/Loading/);
        expect(loading).toBeInTheDocument();
      });
    });

    test('Shows no todo message', () => {
      act(() => {
        const { getByText } = render(<App initialTodos={[]} />);
        const loading = getByText(/No Todos/);
        expect(loading).toBeInTheDocument();
      });
    });

    const todo = {
      _id: 1,
      text: 'Hello',
      completed: false
    };
    test('Shows initially loaded todos', () => {
      act(() => {
        const { getByText } = render(<App initialTodos={[todo]} />);
        const loading = getByText(/Hello/);
        expect(loading).toBeInTheDocument();
      });
    });
  });

  xtest('Add Todo placeholder text exists', () => {
    const { getByPlaceholderText } = render(<App />);
    const addTodo = getByPlaceholderText(/Create New TODO/);
    expect(addTodo).toBeInTheDocument();
  });

  xtest('Adds a Todo', () => {
    const addTodo = jest.fn;
    const textValue = 'A New Todo';
    const { getByPlaceholderText, getByDisplayValue, getByText } = render(<TodoContainer />);
    const AddTodoComp = getByPlaceholderText(/Create New TODO/);
    expect(AddTodoComp).toBeInTheDocument();

    fireEvent.click(AddTodoComp);
    fireEvent.input(AddTodoComp, { target: { value: textValue } });
    fireEvent.keyDown(AddTodoComp, { key: 'Enter', code: 'Enter' });
    expect(getByPlaceholderText(/Create New TODO/)).toBeInTheDocument();
    expect(getByText(textValue)).toBeInTheDocument();
  });
});
