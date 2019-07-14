import React from "react";
import { mount } from "enzyme";
import Profile from './Profile';

describe('<Profile />', () => {

  it('matches snapshot', () => {
    // mount함수는 Enzyme 을 통하여 리액트 컴포넌트를 렌더링 해줍니다.
    const wrapper = mount(<Profile username="tintoll" name="화니" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders username and name', () => {
    const wrapper = mount(<Profile username="tintoll" name="화니" />);
    
    expect(wrapper.props().username).toBe('tintoll');
    expect(wrapper.props().name).toBe('화니');

    // find 함수를 사용하면 특정 DOM을 선택할 수 있다. querySelector와 똑같은 방식으로 사용할 수 있다.
    const boldElement = wrapper.find('b');
    expect(boldElement.contains('tintoll')).toBe(true);

    const spanElement = wrapper.find('span');
    expect(spanElement.text()).toBe('(화니)');
  })
});