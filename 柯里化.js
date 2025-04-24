function curry(n) {
  let arr=[]
  function sum(...args) {
    arr.push(...args)
    if (arr.length<n) {
      return sum
    }
    const res=arr.splice(0,n).reduce((total,item) => total+item, 0)
    arr.slice(n)
    return res
  }
  return sum
}

function curry2(n) {
  let arr = []
  function mul(...args) {
    arr.push(...args)
    if (arr.length < n) {
      return mul
    }
    const res = arr.splice(0, n).reduce((total, item) => total * item, 1)
    arr.slice(n)
    return res
  }
  return mul
}

const sum = curry(3)
console.log(sum(1, 2, 3)) // 6
console.log(sum(1, 2)(3)) // 6
console.log(sum(1)(2)(3)) // 6
const sum2 = curry(4)
console.log(sum2(1, 2, 3, 4)) // 10
console.log(sum2(1, 2)(3, 4)) // 10
console.log('============================================')
const multiply = curry2(4)
console.log(multiply(1, 2, 3, 4)) // 24
console.log(multiply(1, 2)(3, 4)) // 24
console.log(multiply(1)(2)(3)(4)) // 24