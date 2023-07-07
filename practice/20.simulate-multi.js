// 递归实现两个整数的乘积，要求不使用‘*’号（即乘号）。

/**
 * 思路：两个数相乘，等于第一个数递归加第二个数次数，比如5*3 -> 5 + 5 + 5
 * 力扣题的进阶版：https://leetcode.cn/problems/recursive-mulitply-lcci/
 * 力扣只需要考虑两个正数的情况
 * 
 * 需要考虑四种情况
 * - 都是正数
 * - 其中一个是0
 * - 其中一个是负数
 * - 都是负数
 * 
 * 
 * 思考一下，-3 * -4 -> 3 * 4 -> (0 - -3) * (0 - -4)，也就是先用0减去负数，得到正数，再处理
 */

function multiply(A, B) {
  if(A === 0 || B === 0) {
    return 0
  } else if(A > 0 && B > 0) {
    return A + multiply(A, B-1)
  } else if(A < 0 && B < 0) {
    A = 0 - A
    B = 0 - B
    return A + multiply(A, B - 1)
  } else {
    const max = Math.max(A, B)
    const min = Math.min(A, B)
    return min + multiply(max - 1, min)
  }
}

console.log(multiply(3, 4))
console.log(multiply(0, 4))
console.log(multiply(-3, 4))
console.log(multiply(3, -4))
console.log(multiply(-3, -4))