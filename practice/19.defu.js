function isObject(val) {
  return val !== null && typeof val === 'object'
}

function defu(baseObject, defaults) {
  if(!isObject(defaults)) {
    return defu(baseObject, {})
  }

  const object = Object.assign({}, defaults)
  for(const key in baseObject) {
    if(key === '__proto__' || key === 'constructor') continue

    const value = baseObject[key]
    if(value === null || value === undefined) continue

    if(Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]]
    } else if(isObject(value) && isObject(object[key])) {
      object[key] = defu(value, object[key])
    } else {
      object[key] = value
    }
  }

  return object
}

const a = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
}

const b = {
  a: 2,
  b: {
    c: 3,
    d: {
      e: 4
    },
    f: {
      g: 4
    }
  }
}

const c = defu(a, b)
console.log(c)