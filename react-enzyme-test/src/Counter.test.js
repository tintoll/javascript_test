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

  it('calls handleIncrease', () => {
    // 클릭이벤트를 시뮬레이트 하고 state를 확인 
    const wrapper = shallow(<Counter />);
    const plusButton = wrapper.findWhere(
      node => node.type() === 'button' && node.text() === '+1'
    );
    plusButton.simulate('click');
    expect(wrapper.state().number).toBe(1);
  });

  it('calls handleDecrease', () => {
    // 클릭이벤트를 시뮬레이트 하고 h2태의 텍스를 확인
    const wrapper = shallow(<Counter />);
    // findWhere 함수를 사용하면 원하는 조건을 만족하는 태그를 선택할 수 있다.
    const minuxButton = wrapper.findWhere(
      node => node.type() === 'button' && node.text() === '-1'
    );
    // 이벤트를 시뮬레이트 할때에는 원하는 엘리먼트를 찾아서 simulate()함수를 사용합니다.
    // 첫번째는 이벤트이름, 두번째는 이벤트 객체를 넣습니다.
    /*
      // input의 change이벤트일 경우 
      input.simulate('change', {
        target: {
          value: 'hello world'
        }
      });
    */

    minuxButton.simulate('click');
    const number = wrapper.find('h2');
    expect(number.text()).toBe('-1');
  });

});