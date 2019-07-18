// 리액트에서 DOM 시뮬레이션을 위한 [JSDOM]이라는 도구를 사용하여 document.body에 리액트 컴포넌트를 렌더링한다.
// cleanup-after-each를 불러오면 각 테스트 케이스가 끝날때마다 기존에 가상의 화면에 남아있는 UI를 정리합니다.
import '@testing-library/react/cleanup-after-each';

// jest에서 DOM관련 matcher를 사용할 수 있게 해준다.
import '@testing-library/jest-dom/extend-expect';




// this is just a little hack to silence a warning that we'll get until react
// fixes this: https://github.com/facebook/react/pull/14853
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});