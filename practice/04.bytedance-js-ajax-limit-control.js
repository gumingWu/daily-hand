/**
 * 实现一个批量请求函数 multiRequest(urls, maxNum)，要求如下：
  • 要求最大并发数 maxNum
  • 每当有一个请求返回，就留下一个空位，可以增加新的请求
  • 所有请求完成后，结果按照 urls 里面的顺序依次打出

  我这里url换成time
 */

function multiRequest(times=[], maxNum=3) {
  const len = times.length
  const result = new Array(len).fill(false)
  let count = 0

  return new Promise((resolve, reject) => {
    while(count < maxNum) {
      next()
    }

    function next() {
      let current = count++
      if(current >= len && !result.includes(false)) { // 埋坑，万一结果就是false呢
        resolve(result)
        return
      }

      const time = times[current]
      new Promise((res) => {
        setTimeout(() => {
          res(time)
        }, time)
      }).then(res => {
          console.log('我是time: ' + res);
          result[current] = res
        if(current < len) {
          next()
        }
      })
    }
  })
}

multiRequest([1000, 1000, 1000, 3000, 5000, 1000]).then(res => {
  console.log(res);
})