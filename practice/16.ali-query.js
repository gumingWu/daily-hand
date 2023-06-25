function query(arr) {
  let currentArr = arr

  return {
    where(callback) {
      currentArr = currentArr.filter(callback)
      return this
    },
    sortBy(key) {
      currentArr.sort((a, b) => a[key] - b[key])
      return this
    },
    groupBy(key) {
      const map = new Map()
      currentArr.forEach(item => {
        map.set(item[key], map.has(item[key]) ? [...map.get(item[key]), item] : [item])
      })
      currentArr = Array.from(map.values())
      return this
    },
    execute() {
      return currentArr
    },
  }
}

const list = [
  {
    id: 10,
    name: 'a',
    age: 20,
  },
  {
    id: 3,
    name: 'a',
    age: 33,
  },
  {
    id: 10,
    name: 'b',
    age: 30,
  },
  {
    id: 2,
    name: 'b',
    age: 1,
  },
]

const result = query(list)
  .where(item => item.age > 18)
  .sortBy('id')
  .groupBy('name')
  .execute();

console.log(result);