const obj = {
  a: 1,
  b: 2
}

let activeEffect
function effect(fn) {
  activeEffect = fn
  fn()
}

const reactiveMap = new WeakMap()

const proxy = new Proxy(obj, {
  get(targetObj, key) {
    let depsMap = reactiveMap.get(targetObj)
    if(!depsMap) {
      reactiveMap.set(targetObj, (depsMap = new Map()))
    }

    let deps = depsMap.get(key)
    if(!deps) {
      depsMap.set(key, (deps = new Set()))
    }

    deps.add(activeEffect)

    return Reflect.get(targetObj, key)
  },
  set(targetObj, key, value) {
    targetObj[key] = value

    const depsMap = reactiveMap.get(targetObj)
    if(!depsMap) return
    const effects = depsMap.get(key)
    effects && effects.forEach(fn => fn())
  }
})

effect(() => {
  console.log(proxy.a)
})
proxy.a = 2