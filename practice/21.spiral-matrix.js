// 写一个函数，输入是正奇数n，输出1-n^2的二维数组，要求按照一定规律排列
/**
 * 输入3
 * [
 *  [5,4, 3],
 *  [6, 1, 2],
 *  [7, 8, 9]
 * ]
 */

function generateMatrix(n) {
  let left=0, right=n-1, top=0, bottom=n-1
  let target = n * n
  const res = Array(n).fill(0).map(() => Array(n).fill(0))

  while(target >= 1) {
    for(let i=right; i>=left; i--) {
      res[bottom][i] = target
      --target
    }
    --bottom

    for(let i=bottom; i>=top; i--) {
      res[i][left] = target
      --target
    }
    ++left

    for(let i=left; i<=right; i++) {
      res[top][i] = target
      --target
    }
    ++top

    for(let i=top; i<=bottom; i++) {
      res[i][right] = target
      --target
    }
    --right
  }

  return res
}

console.log(generateMatrix(5))
/**
 * [
    [ 17, 16, 15, 14, 13 ],
    [ 18, 5, 4, 3, 12 ],
    [ 19, 6, 1, 2, 11 ],
    [ 20, 7, 8, 9, 10 ],
    [ 21, 22, 23, 24, 25 ]
  ]
 */

console.log(generateMatrix(7))