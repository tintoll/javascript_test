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
​```javascript
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





### react-testing-library 테스트

#### 설치

```shell
# 예전버전
$ npm i react-testing-library jest-dom
# 최신버전
$ npm i @testing-library/react @testing-library/jest-dom
```

#### configuration(src/setupTests.js)

```javascript
// 리액트에서 DOM 시뮬레이션을 위한 [JSDOM]이라는 도구를 사용하여 document.body에 리액트 컴포넌트를 렌더링한다.
// cleanup-after-each를 불러오면 각 테스트 케이스가 끝날때마다 기존에 가상의 화면에 남아있는 UI를 정리합니다.
import '@testing-library/react/cleanup-after-each';

// jest에서 DOM관련 matcher를 사용할 수 있게 해준다.
import '@testing-library/jest-dom/extend-expect';
```

####  스냅샷 테스트

```javascript
import React from 'react';
import { render } from "@testing-library/react";
import Profile from './Profile';

describe('<Profile />', () => {
  it('matches snapshot', () => {
    const utils = render(<Profile username="velopert" name="김민준" />);
    expect(utils.container).toMatchSnapshot();
  });

  it('shows the props correctly', () => {
    const utils = render(<Profile username="velopert" name="김민준" />);
    utils.getByText('velopert!'); //  velopert라는 텍스트를 가진 엘리먼트가 있는지 확인
    utils.getByText('(김민준)');//  (김민준)라는 텍스트를 가진 엘리먼트가 있는지 확인
    utils.getByText(/김/); // 정규식 /김/ 을 통과하는 엘리먼트가 있는지 확인 
  });
});
```

#### 다양한 쿼리

`render` 함수를 실행하고 나면 그 결과물 안에는 [다양한 쿼리](https://testing-library.com/docs/dom-testing-library/api-queries) 함수들이 있다. 이 쿼리 함수들은 `Variant` 와 `Queries` 의 조합으로 네이밍이 이루져 있다. 
너무 많아서 추천하는 쿼리만 사용하면 될듯 하다.  

1. getByLabelText

   1. label 이 있는 input 의 label 내용으로 input 을 선택합니다.

      ```javascript
      <label for="username-input">아이디</label>
      <input id="username-input" />
      
      const inputNode = getByLabelText('아이디');
      ```

2. getByPlaceholderText

   1. placeholder 값으로 input 및 textarea 를 선택합니다.

      ```javascript
      <input placeholder="아이디" />;
      
      const inputNode = getByPlaceholderText('아이디');
      ```

3. getByText

   1. 엘리먼트가 가지고 있는 텍스트 값으로 DOM 을 선택합니다.

      ```javascript
      <div>Hello World!</div>;
      
      const div = getByText('Hello World!');
      ```

4. getByDisplayValue

   1. `input`, `textarea`, `select` 가 지니고 있는 현재 값을 가지고 엘리먼트를 선택합니다.

      ```javascript
      <input value="text" />;
      
      const input = getByDisplayValue('text');
      ```

5. getByAltText

   1. `alt` 속성을 가지고 있는 엘리먼트 (주로 `img`) 를 선택합니다.

      ```javascript
      <img src="/awesome.png" alt="awesome image" />;
      
      const imgAwesome = getByAltText('awesomse image');
      ```

6. getByTitle

   1. `title` 속성을 가지고 있는 DOM 혹은 `title` 엘리먼트를 지니고있는 SVG 를 선택 할 때 사용합니다.

7. getByRole

   1.  특정 `role` 값을 지니고 있는 엘리먼트를 선택합니다.

      ```javascript
      <span role="button">삭제</span>;
      
      const spanRemove = getByRole('button');
      ```

8. getByTestId

   1. 다른 방법으로 못 선택할때 사용하는 방법인데요, 특정 DOM 에 직접 test 할 때 사용할 id 를 달아서 선택하는 것을 의미합니다.

      ```javascript
      <div data-testid="commondiv">흔한 div</div>;
      
      const commonDiv = getByTestId('commondiv');
      ```

      

#### 이벤트 

`fireEvent()`함수는 이벤트를 발생시켜줍니다. 사용법은 다음과 같습니다.

```javascript
fireEvent.이벤트이름(DOM, 이벤트객체);
fireEvent.change(myInput, { target: { value: 'hello world' } });
```


#### jest.fn()
jest.fn()함수는 jest에서 제공하는 mock함수이다. 이 함수를 사용하면 이 함수가 호출된 다음 toBeCalled, toBeCalledWith와 같은 matcher를 사용하여 함수가 호출됐는지, 호출됐으면 어떤 파라미터로 호출됐는지 쉽게 확인 할수 있습니다.

```javascript
it('calls onInsert and clears input', () => {
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
```

#### toHaveStyle()
- toHaveStyle 이라는 matcher 함수를 사용하면 해당 DOM 에 특정 스타일이 있는지 쉽게 확인 할 수 있습니다.
- not 이라는 키워드는 특정 조건이 만족하지 않아야 함을 의미 
```javascript
it('shows line-through on span when done is false', () => {
  const { span } = setup({ todo: { ...sampleTodo, done: false } });
  expect(span).not.toHaveStyle('text-decoration: line-through;');
});
```

#### toBeInTheDocument()
- toBeInTheDocument 이라는 matcher 함수를 사용하면 특정 엘리먼트가 화면에서 사라졌는지 확인할 수 있습니다.  
```javascript
expect(todoText).not.toBeInTheDocument();

// 다른 toBeInTheDocument함수를 사용하지 않고 표현하기 
const removedText = queryByText('TDD 배우기');
expect(removedText).toBeNull();
```

### 비동기 작업 테스트 

- 비동기 테스트를 하기 위해서는 react-testing-library에서 지원하는 Async Utilities함수들을 사용하면 된다.

#### Async Utilities 함수들
##### wait
- 특정 콜백에서 에러를 발생하지 않을 때 까지 대기하는 함수 
```javascript
it('reveals text wheen toggle is ON', async () => {
  const { getByText } = render(<DelayedToggle />);
  const toggleButton = getByText('토글');
  fireEvent.click(toggleButton);
  // 콜백 안의 함수가 에러가 발생시키지 않을때 까지 기다립니다.
  // timeout 기본값은 4500ms 이다. 
  await wait( () => getByText('야호!!'), {timeout : 3000}); 

});
```

##### waitForElement
-  특정 엘리먼트가, 나타났거나, 바뀌었거나, 사라질때까지 대기를 해줍니다. 그리고 프로미스가 끝날 때 우리가 선택한 엘리먼트를 resolve 합니다.
```javascript
it('toggles text ON/OFF', async () => {
  const { getByText } = render(<DelayedToggle />);
  const toggleButton = getByText('토글');
  fireEvent.click(toggleButton);
  // waitForElement 함수는 특정 엘리먼트가, 나타났거나, 바뀌었거나, 사라질때까지 대기를 해줍니다. 
  // 프로미스가 끝날때 우리가 선택한 엘리먼트를 resolve한다.
  const text = await waitForElement(() => getByText('ON'));
  expect(text).toHaveTextContent('ON');
});
```

##### waitForDomChange
- 콜백함수가 아니라 검사하고 싶은 엘리먼트를 넣어주면 해당 엘리먼트에서 변화가 발생 할 때 까지 기다립니다. 프로미스가 resolve 됐을땐 mutationList를 반환하여 DOM이 어떻게 바뀌었는지에 대한 정보를 알수 있다.
```javascript
it('changes something when button is clicked', async () => {
  const { getByText, container } = render(<DelayedToggle />);
  const toggleButton = getByText('토글');
  fireEvent.click(toggleButton);
  // waitForDomChange는 콜백함수가 아니라 검사하고 싶은 엘리먼트를 넣어주면 해당 엘리먼트에서 변화가 발생할 때까지 기다려줍니다.
  const mutations = await waitForDomChange({container});
  // 프로미스가 resolve됐을때 mutationList를 반환하여 DOM이 어떻게 바뀌었는지에 대한 정보를 알수 있다.
  // console.log(mutations);
});
```

##### waitForElementToBeRemoved
- 특정 엘리먼트가 화면에서 사라질때까지 기다리는 함수입니다.

```javascript
t('removes text when toggle is OFF', async () => {
  const { getByText, container } = render(<DelayedToggle />);
  const toggleButton = getByText('토글');
  fireEvent.click(toggleButton);

  await waitForDomChange({container}); //  ON이 됨
  getByText('야호!!');
  fireEvent.click(toggleButton);
  // waitForElementToBeRemove는 특정 엘리먼트가 화면에서 사라질때까지 기다리는 함수입니다.
  await waitForElementToBeRemoved( () => getByText('야호!!'));

});
```


#### REST-API 호출 테스트 
- Rest API를 호출해야하는 경우에는 API를 직접 호출하지 않고 이를 mocking 합니다.

##### axios-mock-adapter 이용한 테스트 
- MockAdapter 를 사용하면 특정 API 요청이 발생했을 때 어떤 응답이 와야 하는지 직접 정의해줄 수 있습니다.
- delayResponse 옵션을 설정하면 딜레이를 임의적으로 설정할 수 있습니다. 이 설정은 없어도 상관 없습니다.

```javascript
describe('<UserProfile />', () => {
  const mock = new MockAdapter(axios, { delayResponse : 200}) // 200ms 가짜 딜레이 설정
  // API 요청에 대하여 응답 미리 정하기 
  mock.onGet('https://jsonplaceholder.typicode.com/users/1').reply(200, {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  });


  it('calls getUser API loads userData properly', async () => {
    const { getByText } = render(<UserProfile id={1} />);
    await waitForElement(() => getByText('로딩중...')); // 로딩중.. 문구 보여줘야함
    await waitForElement(() => getByText('Bret')); // Bret (username) 을 보여줘야함
  });
});
```


##### axios-mock-adapter 활용
###### 한번에 mocking하기 - replyOnce
```javascript
mock.onGet('/users').replyOnce(200, users);
```
이렇게 하면 요청을 딱 한번만 mocking 할 수 있습니다. 한번 요청을 하고 나면 그 다음 요청은 정상적으로 요청이 됩니다.

###### replyOnce 를 연달아서 사용하기
```javascript
mock
  .onGet('/users')
  .replyOnce(200, users) // 첫번째 요청
  .onGet('/users')
  .replyOnce(500); // 두번째 요청
```
이렇게 하면 첫번째 요청과 두번째 요청을 연달아서 설정 할 수 있습니다. 요청을 여러번 해야 하는 경우 이런 형태로 구현하시면 됩니다.

###### 아무 요청이나 mocking 하기 - onAny()
보통 메서드에 따라 onGet(), onPost() 이런식으로 사용하는데요, onAny() 를 사용하면 어떤 메서드던 mocking 을 할 수 있습니다.
```javascript
mock.onAny('/foo').reply(200);
// 주소를 생략하면 어떤 주소든 mocking 합니다.
mock.onAny().reply(200);
```

###### reset 과 restore
reset은 mock 인스턴스에 등록된 모든 mock 핸들러를 제거합니다. 만약에 테스트 케이스별로 다른 mock 설정을 하고 싶으시면 이 함수를 사용하시면 됩니다.
```javascript
mock.reset();
```

restore은 axios 에서 mocking 기능을 완전히 제거합니다. 만약에 실제 테스트를 하다가 요청이 실제로 날라가게 하고 싶으면 이 함수를 사용하면 됩니다.

```javascript
mock.restore();
```
