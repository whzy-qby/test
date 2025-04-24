// 类型判断
const tpyeof = function (type) {
  function isType(value) {
    return typeof value === type
  }
  return isType
}

const isString = tpyeof('string')
const isNumber = tpyeof('number')
console.log(isString('abc'))
console.log(isString([1,2,3]))

console.log(isNumber('abc'))
console.log(isNumber(123))