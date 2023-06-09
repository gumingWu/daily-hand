/**
 * const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
  await asyncPool(2, [1000, 5000, 3000, 2000], timeout);
  // Call iterator (i = 1000)
  // Call iterator (i = 5000)
  // Pool limit of 2 reached, wait for the quicker one to complete...
  // 1000 finishes
  // Call iterator (i = 3000)
  // Pool limit of 2 reached, wait for the quicker one to complete...
  // 3000 finishes
  // Call iterator (i = 2000)
  // Itaration is complete, wait until running ones complete...
  // 5000 finishes
  // 2000 finishes
  // Resolves, results are passed in given array order `[1000, 5000, 3000, 2000]`.
 */

// async function asyncPoolES7(poolLimit, array, iteratorFn) {
//   const ret = [] // 存储所有异步任务
//   const executing = [] // 存储正在执行的异步任务

//   for(const item of array) {
//     const p = Promise.resolve().then(() => iteratorFn(item, array)) // 调用iteratorFn创建异步任务
//     ret.push(p) // 保存异步任务

//     // 当poolLimit小于总任务个数，进行并发控制
//     if(poolLimit <= array.length) {
//       // 任务完成后，从正在执行的任务数组中移除已完成的任务
//       const e = p.then(() => executing.splice(executing.indexOf(e), 1))
//       executing.push(e) // 保存正在执行的异步任务
//       if(executing.length >= poolLimit) {
//         await Promise.race(executing) // 等待较快的任务执行完成
//       }
//     }
//   }
//   return Promise.all(ret)
// }

// const timeout = i => new Promise(resolve => setTimeout(() => {
//   console.log(i)
//   resolve(i)
// }, i));
// // asyncPoolES7(2, [1000, 1000, 1000, 1000, 5000, 3000, 2000], timeout)


// function asyncPoolES6(poolLimit, array, iteratorFn) {
//   let i=0
//   const ret = []
//   const executing = []
//   function enqueue() {
//     if(i === array.length)
//       return Promise.resolve()
    
//     const item = array[i++]
//     const p = Promise.resolve().then(() => iteratorFn(item, array))
//     ret.push(p)

//     let r = Promise.resolve()

//     if(poolLimit <= array.length) {
//       const e = p.then(() => executing.splice(executing.indexOf(e), 1))
//       executing.push(e)
//       if(executing.length >= poolLimit) {
//         r = Promise.race(executing)
//       }
//     }

//     return r.then(() => enqueue())
//   }

//   return enqueue().then(() => Promise.all(ret))
// }

// asyncPoolES6(2, [1000, 1000, 1000, 1000, 5000, 3000, 2000], timeout)

async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = []
  const executing = [] // 用于存放并发限制的处于Pending状态的Promise对象
  for(const item of array) {
    // iteratorFn(item) 得到一个pending状态的Promise对象 p。（这里之所以不直接 p = iteratorFn(item)，
    // 是为了兼容iteratorFn是同步函数的场景，保证返回的p一定是Promose对象
    const p = Promise.resolve().then(() => iteratorFn(item))
    ret.push(p)
    // 如果限制数量poolLimit 小于等于 数组的总长度再执行限制。当前poolLimit=3，arr.length=10，进入if逻辑
    if(poolLimit <= array.length) {
      // 根据刚刚的p创建一个Promise对象e，等p resolve的时候才执行then里的回调，把e从executing数组移除
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if(executing.length >= poolLimit) {
        await Promise.race(executing)
      }
    }
  }
  return await Promise.all(ret)
}

const curl = (i) => {
  console.log('开始', i)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(i)
      console.log('结束', i)
    }, 1000 + Math.random()*1000)
  })
}
let urls = Array(10).fill(0).map((v,i) => i);
(async () => {
    const res = await asyncPool(3, urls, curl);
    console.log(res);
 })();