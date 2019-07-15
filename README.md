## javascript 테스팅

- javascript에서 테스팅 도구은 정말 여러가지가 있다. 여기서는 jest를 사용해 볼 것이다. 

#### jest 문법

```javascript
// sum.js
function sum(a, b) {
  return a + b;
}

function sumOf(numbers) {
  // let result = 0;
  // numbers.forEach(n => {
  //   result += n;
  // });
  // return result;
  
  // reduce를 이용하여 배열의 총합을 구한다. 
  return numbers.reduce((acc, current) => acc +  current, 0);
}
// 각각 내보내기
exports.sum = sum;
exports.sumOf = sumOf;

```

```javascript

// sum.test.js
describe('sum', () => {
  it('calculates 1 + 2', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('calculates all numbers', () => {
    const array = [1,2,3,4,5];
    expect(sumOf(array)).toBe(15);
  });
});
```

##### it, test

- 테스트 케이스를 만들때 사용하는 함수

##### describe

- 여러개의 테스트 케이스를 묶어 줄때 사용하는 함수 

##### expect

- 특정값이 ~~일 것이다 라고 사전에 정의하고 통과하면 테스트를 성공시키고 통과하지 않으면 테스트를 실패시킵니다.

##### toBe

- 특정값과 우리가 정한 값과 일치하는지 확인을 해줍니다. 

#####  테스트 코드작성시 이점 
- 리팩토링 이후 코드가 제대로 작동하고 있는것을 검증하기 매우 간편하다.


## React 테스트

- react-dom/test-utils 안에 들어 있는 유틸 함수를 사용하여도 테스트를 진행할수 있지만 복잡하고 불편한 부분들이 있어서 React 공식 문서에서도 테스팅 라이브러리를 사용하는 것을 권장하고 있다.

#### Enzyme 과 react-testing-library

- React 공식 문서에서 권장하는 라이브러리는 react-testing-library 이다. 현재 많이 사용되는 Enzyme의 대체 방안이라고 언급하고 있다. 
- Enzyme은 Airbnb에서 만든 라이브러리로 테스트 코드를 작성할때 컴포넌트 내부 기능을 자주 접근한다. 예를 들어 컴포넌트가 가지고 있는 props, state를 확인하고 컴포넌트의 내장 메소드를 직접호출하기도 한다.
- react-testing-library는 렌더링 결과에 집중한다. 컴포넌트의 인스턴스에 대해서 신경쓰지 않고 실제 DOM에 대하여 신경을 많이 쓰고, 실제 화면에 무엇이 보여지는지, 어떠한 이벤트가 발생했을때 화면에 원하는 변화가 생겼는지 이런 것을 확인하기에 조금 더 최적화 되어있습니다. 그래서 사용자 관점에서 테스트하는것이 더 용이합니다. 
- 2개를 적절히 사용하면 된다. 


### Enzyme 테스트

#### 설치
```shell
$ npm i enzyme enzyme-adapter-react-16
```

#### configuration
```javascript
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

#### 스냅샷 테스팅
- 스냅샷 테스팅이란, 렌더링된 결과가 이전에 렌더링한 결과와 일치하는 확인하는 작업

##### 설치
```shell
$ npm i enzyme-to-json
``

##### 스냅샷 설정
```javascript
// package.json 에 아래 내용 추가 

"jest": {
  "snapshotSerializers": ["enzyme-to-json/serializer"]
}
```

##### 기본 테스트
```javascript
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
```


##### 클래스형 컴포넌트 테스트
```javascript
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
```


##### 함수형 컴포넌트와 Hooks테스트
```javascript
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
```