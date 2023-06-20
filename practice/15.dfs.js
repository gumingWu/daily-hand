const tree = {
  name: "root",
  children: [
    { name: "叶子1-1" },
    { name: "叶子1-2", children: [
      {
        name: "叶子3-1",
        children: [
          {
            name: "叶子4-1",
            children: [{
              name: '',
              children: [{}]
            }],
          },
        ],
      },
    ], },
    {
      name: "叶子2-1",
      children: [
        {
          name: "叶子3-1",
          children: [
            {
              name: "叶子4-1",
              children: [{}],
            },
          ],
        },
      ],
    },
  ],
};

function getTreeDepth(tree) {
  let max = 0
  function dfs(node, level) {
    if(!node.children || !node.children.length) {
      max = Math.max(max, level)
      return
    }
    node.children.forEach(child => {
      dfs(child, level + 1)
    })
  }

  dfs(tree, 1)
  return max
}

console.log(getTreeDepth(tree))