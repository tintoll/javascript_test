import React from 'react';
import TodoItem from './TodoItem';
import { render, fireEvent } from "@testing-library/react";

describe('<TodoItem />', () => {

  const sampleTodo = {
    id : 1,
    text : 'TDD 배우기',
    done : false,
  }

  const setup = ( props = {}) => {
    const initialProps = { todo : sampleTodo};
    const utils = render(<TodoItem {...initialProps} {...props} />);
    const {getByText} = utils;
    const todo = props.todo || initialProps.todo;
    const span = getByText(todo.text);
    const button = getByText('삭제');
    return {
      ...utils,
      span,
      button
    }
  }

  it('has span and button', () => {
    const { span, button} = setup();
    expect(span).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('shows line-through on span when done is true', () => {
    const { span } = setup({ todo: { ...sampleTodo, done: true } });
    // toHaveStyle 이라는 matcher 를 사용했는데요, 
    // 이 함수를 사용하면 해당 DOM 에 특정 스타일이 있는지 쉽게 확인 할 수 있습니다.
    expect(span).toHaveStyle('text-decoration: line-through;');
  });

  it('shows line-through on span when done is false', () => {
    const { span } = setup({ todo: { ...sampleTodo, done: false } });
    // not 이라는 키워드는 특정 조건이 만족하지 않아야 함을 의미 
    expect(span).not.toHaveStyle('text-decoration: line-through;');
  });

  it('calss onToggle', () => {
    const onToggle = jest.fn();
    const {span} = setup({onToggle});
    fireEvent.click(span);
    expect(onToggle).toBeCalledWith(sampleTodo.id);
  });

  it('calss onRemove', () => {
    const onRemove = jest.fn();
    const { button } = setup({ onRemove });
    fireEvent.click(button);
    expect(onRemove).toBeCalledWith(sampleTodo.id);
  });
});