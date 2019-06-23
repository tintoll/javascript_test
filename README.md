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

