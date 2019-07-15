import React from 'react';
import { mount } from 'enzyme';
import HookCounter from './HookCounter';


// 함수형 컴포넌트에서는 클래스형 컴포넌트와 달리 인스턴스 메서드 및 상태를 조회 할 방법이 없습니다. 
// Hooks 를 사용하는 경우 꼭 shallow 가 아닌 mount 를 사용하셔야 합니다. 
// 그 이유는, useEffect Hook 은 shallow 에서 작동하지 않고, 버튼 엘리먼트에 연결되어있는 함수가 이전 함수를 가르키고 있기 때문에, 
// 예를 들어 +1 버튼의 클릭 이벤트를 두번 시뮬레이트해도 결과값이 2가 되는게 아니라 1이 됩니다.

describe('<HookCounter />', () => {

  it('matches snapshot', () => {
    const wrapper = mount(<HookCounter />);
    expect(wrapper).toMatchSnapshot();
  });

  it('increases', () => {
    const wrapper = mount(<HookCounter />);
    let plusButton = wrapper.findWhere(
      node => node.type() === 'button' && node.text() === '+1'
    );
    plusButton.simulate('click');
    plusButton.simulate('click');

    const number = wrapper.find('h2');

    expect(number.text()).toBe('2');
  });

  it('decreases', () => {
    const wrapper = mount(<HookCounter />);
    let decreaseButton = wrapper.findWhere(
      node => node.type() === 'button' && node.text() === '-1'
    );
    decreaseButton.simulate('click');
    decreaseButton.simulate('click');

    const number = wrapper.find('h2');

    expect(number.text()).toBe('-2');
  });

});