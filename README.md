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
