import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoForm from './TodoForm';

describe('<TodoForm />', () => {
  // 반복된는 부분을 setup에 모아둠.
  const setup = ( props = {} ) => {
    const utils = render(<TodoForm {...props} />);
    const { getByText, getByPlaceholderText } = utils;
    const input = getByPlaceholderText('할 일을 입력하세요'); // input 이 있는지 확인
    const button = getByText('등록'); // button이 있는지 확인
    return {
      ...utils,
      input,
      button
    };
  }
  
  it('has input and button', () => {
    const {input, button} = setup();
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('changes input', () => {
    const { input } = setup();
    fireEvent.change(input,{
      target : {
        value : 'TDD 배우기'
      }
    });
    expect(input).toHaveAttribute('value', 'TDD 배우기');
  });

  it('calls onInsert and clears input', () => {
    // jest에서 제공하는 mock함수이다.
    // 이 함수를 사용하면 이 함수가 호출된 다음 toBeCalled, toBeCalledWith와 같은 matcher를 사용하여
    // 함수가 호출됐는지, 호출됐으면 어떤 파라미터로 호출됐는지 쉽게 확인 할수 있습니다.
    const onInsert = jest.fn(); 
    const { input, button } = setup({ onInsert });
    
    // 테스트 코드를 작성 할 때에는 마치 사용자가 된 입장으로,아래와 같은 흐름으로 작성하면 된다.
    // 글자입력하고  
    fireEvent.change(input, {
      target: {
        value: 'TDD 배우기'
      }
    });
    // 등록 버튼클릭
    fireEvent.click(button);
    expect(onInsert).toBeCalledWith('TDD 배우기'); // onInsert 가 'TDD 배우기' 파라미터가 호출됐어야함
    expect(input).toHaveAttribute('value',''); // input이 비워져야함.
  })
});
