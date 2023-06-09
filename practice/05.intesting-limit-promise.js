class ConcurrencyTask {
  callBack = () => {}
  task = () => {}
  promise = null

  constructor(task, callBack) {
    this.task = task
    this.callBack = callBack
  }

  beginExecuteTask() {
    this.promise = new Promise((resolve, reject) => {
      this.task(resolve, reject)
    })
    return this.promise
  }

  static SimulationTask(time) { // 模拟性质，自己生成执行方法，应该由用户传入执行方法
    return new ConcurrencyTask(
      (resolve) => {
        console.log(`开始执行延时任务${time}`);
        setTimeout(() => {
          resolve(time)
        }, time)
      },
      (res) => {
        console.log(res);
      })
  }
}

class ConcurrencyQueue {
  // 最大并发数
  maxConcurrencyNum = 1
  // 并发任务集合
  concurrencyTasks = []
  // 正在进行任务
  executionTasks = []

  constructor(maxConcurrencyNum, ...concurrencyTasks) {
    this.maxConcurrencyNum = maxConcurrencyNum
    this.concurrencyTasks = [...this.concurrencyTasks, ...concurrencyTasks]
  }

  async beginExecuteTasks() {
    this.executionTasks = []
    let allExecutionTasks = []
    for(let i=0; i < this.concurrencyTasks.length; i++) {
      const task = this.concurrencyTasks[i]
      task.beginExecuteTask().then(res => {
        this.executionTasks.splice(this.executionTasks.indexOf(task), 1)
        if(task.callBack) {
          task.callBack(res)
        }
      })

      if(this.executionTasks.length < this.maxConcurrencyNum) {
        this.executionTasks.push(task)
        allExecutionTasks.push(task)
        if(this.concurrencyTasks.length - 1 === i || this.executionTasks.length >= this.maxConcurrencyNum) {
          await Promise.race(this.executionTasks.map(task => task.promise))
        }
      }
    }

    await Promise.all(allExecutionTasks.map(task => task.promise))
    console.log('任务完成');
  }
}

const currencyQueue = new ConcurrencyQueue(
  3,
  ConcurrencyTask.SimulationTask(1000), 
  ConcurrencyTask.SimulationTask(1000),
  ConcurrencyTask.SimulationTask(1000),
  ConcurrencyTask.SimulationTask(3000),
  ConcurrencyTask.SimulationTask(5000),
  ConcurrencyTask.SimulationTask(1000),
  ConcurrencyTask.SimulationTask(3000),
  ConcurrencyTask.SimulationTask(2000)
)
currencyQueue.beginExecuteTasks()