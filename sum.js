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