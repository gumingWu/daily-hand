const pErr = new Promise((resolve, reject) => {
  reject("总是失败");
});

const pSlow = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "最终完成");
});

const pFast = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "很快完成");
});

Promise.any([pErr, pSlow, pFast]).then((value) => {
  console.log(value);
  // pFast fulfils first
})
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