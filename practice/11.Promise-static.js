// const pErr = new Promise((resolve, reject) => {
//   reject("总是失败");
// });

// const pSlow = new Promise((resolve, reject) => {
//   setTimeout(resolve, 500, "最终完成");
// });

// const pFast = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, "很快完成");
// });

// Promise.any([pErr, pSlow, pFast]).then((value) => {
//   console.log(value);
//   // pFast fulfils first
// })
// 期望输出："很快完成"

// Promise.race([pErr, pSlow, pFast]).then((value) => {
//   console.log('then', value);
// }, err => {
//   console.log('err', err);
// })
// // 总是失败

// Promise.any([pErr, pErr, pErr]).then((value) => {
//   console.log('then', value);
// }, err => {
//   console.log('err', err);
// })

function PromiseAll(arr) {
  return new Promise((resolve, reject) => {
    const ans = []
    const len = arr.length
    for(let i in arr) {
      Promise.resolve(arr[i]).then(res => {
        ans[i] = res
        if(ans.length === len) {
          resolve(ans)
        }
      }).catch(err => {
        reject(err)
      })
    }
  })
}

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('p1')
  }, 2000);
})
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('p2')
  }, 1000);
})
const p3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('p3')
  }, 3000);
})
const p4 = new Promise((resolve, reject) => {
  reject(new Error('p4'))
})

PromiseAll([p1, p2, p3, p4]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})