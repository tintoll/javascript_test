// exports.max = numbers => {
//   let result = numbers[0];
//   numbers.forEach(n => {
//     if(n > result) {
//       result = n;
//     }
//   });
//   return result;
// }

// 리팩토링 후 
exports.max = numbers => Math.max(...numbers);
exports.min = numbers => Math.min(...numbers);
exports.avg = numbers => numbers.reduce((acc, current, index, {length}) => acc + current / length, 0);
exports.sort = numbers => numbers.sort((a,b) => a - b);
// 중앙값 구하기
exports.median = numbers => {
  const { length } = numbers;
  const middle = Math.floor(length / 2);
  
  return length % 2 ? 
    numbers[middle] 
    : (numbers[middle-1] + numbers[middle]) / 2;
}

// 최빈값 구하기 : 최빈값은 배열에서 가장 빈도가 높은 값 입니다
exports.mode = numbers => {
  //const counts = new Map();
  // numbers.forEach(n => {
  //   const count = counts.get(n) || 0;
  //   counts.set(n, count+1);
  // });
  const counts = numbers.reduce(
    (acc, current) => acc.set(current, acc.get(current) + 1 || 1),
    new Map()
  );

  const maxCount = Math.max(...counts.values());
  const modes = [...counts.keys()].filter(number => counts.get(number) === maxCount);

  if(modes.length === numbers.length) {
    // 최빈값이 없음
    return null;
  }

  if(modes.length > 1) {
    // 최빈값이 여러개
    return modes;
  }

  // 최빈값이 하나
  return modes[0];
}