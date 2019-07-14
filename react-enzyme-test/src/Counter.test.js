import React from 'react';
import { shallow } from 'enzyme';
import Counter from './Counter';

describe('<Counter />', () => {

  it('matches snapshot', () => {
    // shallow는 컴포넌트 내부에 또 다른 리액트 컴포넌트가 있다면 이를 렌더링하지 않습니다.
    // mount는 컴포넌트 내부 컴포너트까지 렌더링 된다.
    const wrapper = shallow(<Counter />);
    expect(wrapper).toMatchSnapshot();
  });

  it('has initial number', () => {
    const wrapper = shallow(<Counter />);
    // 컴포넌트 state를 조회할때 state()함수를 이용
    expect(wrapper.state().number).toBe(0);
  });

  it('increases', () => {
    const wrapper = shallow(<Counter />);
    // 내장 메소드를 호출할때 instance()함수를 호출하여 인스턴스를 조회후 메서드 호출
    wrapper.instance().handleIncrease();
    expect(wrapper.state().number).toBe(1);
  });

  it('decreases', () => {
    const wrapper = shallow(<Counter />);
    wrapper.instance().handleDecrease();
    expect(wrapper.state().number).toBe(-1);
  });

});