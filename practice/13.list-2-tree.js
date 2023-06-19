let list = [
  { id: 0, parentId: null, name: '生物' },
  { id: 1, parentId: 0, name: '动物' },
  { id: 2, parentId: 0, name: '植物' },
  { id: 3, parentId: 0, name: '微生物' },
  { id: 4, parentId: 1, name: '哺乳动物' },
  { id: 5, parentId: 1, name: '卵生动物' },
  { id: 6, parentId: 2, name: '种子植物' },
  { id: 7, parentId: 2, name: '蕨类植物' },
  { id: 8, parentId: 4, name: '大象' },
  { id: 9, parentId: 4, name: '海豚' },
  { id: 10, parentId: 4, name: '猩猩' },
  { id: 11, parentId: 5, name: '蟒蛇' },
  { id: 12, parentId: 5, name: '麻雀' }
]

function traverseTree(list) {
  const res = []
  const map = new Map()
  list.forEach(item => {
    map.set(item.id, item)
  });

  list.forEach(item => {
    const parent  = map.get(item.parentId)
    if(parent) {
      parent.children = [...parent.children || [], item]  // 耍帅
    } else {
      res.push(item)
    }
  });

  return res
}

console.log(traverseTree(list))