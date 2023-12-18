/**
 * 숫자를 3자리마다 ,로 구분하는 문자열로 반환
 * @param {Number} num
 * @returns
 */
const toDecimalString = num => {
  const numReg = /^[0-9]*$/;
  if (!numReg.test(num)) return '-';
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export {toDecimalString};
