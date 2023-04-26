// 基础版
function clone1(target) {
  if(typeof target === 'object') {
    const cloneTarget = {}
    for(const key in target) {
      cloneTarget[key] = clone1(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
}
const target1 = {
  field1: 1,
  field2: undefined,
  field3: 'ConardLi',
  field4: {
      child: 'child',
      child2: {
          child2: 'child2'
      }
  }
}
const cloneTarget1 = clone1(target1)
cloneTarget1.field4.child = 'cloneChild'
console.log(target1);
console.log(cloneTarget1);


// 考虑数组
function clone2(target) {
  if(typeof target === 'object') {
    const cloneTarget = Array.isArray(target) ? [] : {}
    for(const key in target) {
      cloneTarget[key] = clone2(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
}
const target2 = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8]
};
const cloneTarget2 = clone2(target2)
cloneTarget2.field4[1] = 444
console.log(target2);
console.log(cloneTarget2);

// 循环引用
/**
 * let obj = { name : 'ConardLi'}
  const target = new WeakMap();
  target.set(obj,'code秘密花园');
  obj = null;

  如果是Map，虽然obj置为null，但target依然对obj存在强引用关系，所以这部分内容无法被释放
  使用WeakMap，target和obj是弱引用关系，下次垃圾回收执行时，这块内存会被释放

  设想一下，如果我们要拷贝的对象非常庞大时，使用Map会对内存造成非常大的额外消耗
  而且我们需要手动清除Map的属性才能释放这块内存，而WeakMap会帮我们巧妙化解这个问题
 */
function clone3(target, map = new WeakMap()) {
  if(typeof target === 'object') {
    const cloneTarget = Array.isArray(target) ? [] : {}
    if(map.has(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for(let key in target) {
      cloneTarget[key] = clone3(target[key], map)
    }
    return cloneTarget
  } else {
    return target
  }
}
const target3 = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8]
};
target3.target3 = target3;
const cloneTarget3 = clone3(target3)
console.log(target3);
console.log(cloneTarget3);


// 添加可持续遍历类型，Map，Set
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]'

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, ]

function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}
function getType(target) {
  return Object.prototype.toString.call(target)
}
function getInit(target) {
  const Ctor = target.constructor
  return new Ctor()
}
function clone4(target, map = new WeakMap()) {
  // 克隆原始类型
  if(!isObject(target)) {
    return target
  }

  // 初始化
  const type = getType(target)
  let cloneTarget
  if(deepTag.includes(type)) {
    cloneTarget = getInit(target, type)
  }

  // 防止循环引用
  if(map.has(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  // 克隆set
  if(type === setTag) {
    for(let value of target) {  // 这里要遍历迭代器，Set的迭代器Set.prototype[Symbol.iterator] === Set.prototype.values
      cloneTarget.add(clone4(value, map))
    }
    return cloneTarget
  }

  // 克隆Map
  if(type === mapTag) {
    for(let key of target.keys()) {  // 遍历迭代器
      cloneTarget.set(key, clone4(target.get(key), map))
    }
    return cloneTarget
  }

  // 克隆对象和数组
  for(let key in target) {
    cloneTarget[key] = clone4(target[key], map)
  }
  return cloneTarget
}
const target4 = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8],
  empty: null,
  map: new Map().set(1, 1).set(2, 3),
  set: new Set().add(1).add(2),
};
const cloneTarget4 = clone4(target4)
console.log(target4);
console.log(cloneTarget4);