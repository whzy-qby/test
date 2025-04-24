// get: get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象target、属性名property和 proxy 实例本身reciever（严格地说，是操作行为所针对的对象），其中最后一个参数可选。
const obj = {
  name: 'kklt',
  attack: 5000
}

const proxy = new Proxy(obj, {
  get: function(target, property) {
    if (property in target) {
      return property
    } else {
      return new ReferenceError(`${property}不存在。`)
    }
  }
})

// 调用：proxy.xxx
// console.log(proxy.name)//name
// console.log(proxy)//{ name: 'kklt', attack: 5000 }
// console.log(proxy.age)//ReferenceError: age不存在。

//使用get拦截，实现数组读取负数的索引
function createArray(...arguments) {//动态参数
  const handle = {
    get(target, property, receiver) {
      if (+property < 0) {
        property = String(+property + target.length)
      }
      return Reflect.get(target, property, receiver)
    }

  }
  let target = []  //注意，要在handle外声明
  target.push(...arguments)

  return new Proxy(target, handle)
}

const arr = createArray(...[1,2,3,4,5])
// console.log(arr[-1])//5
// console.log(arr[1])//2


// 对象元素的完整写法
//  const obj2 = {
//   foo: {
//     value: 123,
//     writable: false,//是否可直接改写（赋值）
//     configurable: false //是否可配置（通过proxy.get改写）
//   },// foo:123,
// }
// 一般用于Object.defineProperties({}, obj2)

const target2 = Object.defineProperties({}, {
  saiya: {
    value: 5000,
    writable: false,
    configurable: true
  }
})
const handle2 = {
  get(target, property) {
    return 456
  }
}
const proxy2 = new Proxy(target2,handle2)
// console.log(proxy2.saiya)




/**
 *@function Set():set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象target、属性名propertyKey、属性值value和 Proxy 实例本身(receiver)，其中*最后一个参数可选
*假定Person对象有一个age属性，该属性应该是一个不大于 200 的整数，那么可以使用Proxy保证age的属性值符合要求。由于设置了存值函数set，任何不符合要求的*age属性赋值，都会抛出一个错误，这是数据验证的一种实现方法。
 */
const test = {
  set: function(target, propertyKey, value) {
    if (propertyKey === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('什么鸟语，请输入整数')  //注意是throw，而不是return
      }
      if (value > 200) {
        throw new RangeError('你成仙了？！请确保年龄正常')
      }
      target[propertyKey] = value
    }
  }
}

//调用：
let person = new Proxy({}, test)
// person.age = 'kklt'
// console.log(person.age)//TypeError: 什么鸟语，请输入整数(直接报错，后面不执行)
// person.age = 234
// console.log(person.age)//RangeError: 你成仙了？！请确保年龄正常(直接报错，后面不执行)
person.age = 22
console.log(person.age)//22

//利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM。有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写。
const handle3 = {
  get: function(target, property) {
    invariant(property,'get')//invariant:恒定不变的
    return target[property]
  },
  set: function(target, property, value) {
    invariant(property, 'set')
    target[property] = value
    return true
  }
}
function invariant(property, action) {
  if (property[0] === '_') {//只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。
    throw new Error(`对${action}私有“${property}”属性的尝试无效`)
  }
}
const target3 = {
  a: 1,
  b: 2,
  _c: 3
}
const proxy3 = new Proxy(target3, handle3)
// console.log(proxy3.a)//1
// console.log(proxy3._c)//Uncaught Error: 对get私有“_c”属性的尝试无效(直接报错，后面不执行)
proxy3._c = 33
// console.log(proxy3._c)//Uncaught Error: 对set私有“_c”属性的尝试无效


//set方法的第四个参数receiver，指的是原始的操作行为所在的那个对象，一般情况下是proxy实例本身
