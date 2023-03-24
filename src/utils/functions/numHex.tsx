import BigNumber from 'bignumber.js';
export const numHex = (s: number) => {
  var test = new BigNumber(s, 10);
  var a = test.toString(16);
  if (a.length % 2 > 0) {
    a = '0' + a;
  }
  return a;
};
