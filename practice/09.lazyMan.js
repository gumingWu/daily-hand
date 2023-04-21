/**
 * 实现一个LazyMan，可以按照以下方式调用:
  LazyMan(“Hank”)输出:
  Hi! This is Hank!

  LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
  Hi! This is Hank!
  //等待10秒..
  Wake up after 10
  Eat dinner~

  LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
  Hi This is Hank!
  Eat dinner~
  Eat supper~

  LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
  //等待5秒
  Wake up after 5
  Hi This is Hank!
  Eat supper
  以此类推。
 */


class _LazyMan {
  constructor(name) {
    this.tasks = []
    const task = () => {
      console.log(`Hi! This is ${name}`);
      this.next()
    }
    this.tasks.push(task)

    setTimeout(() => {
      this.next()
    })
  }

  next() {
    const task = this.tasks.shift() // 这里第一次写的时候写反了，写成pop()
    task && task()
  }

  sleepWrap(time, first) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next()
      }, time * 1000)
    }
    if(first) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
  }

  sleep(time) {
    this.sleepWrap(time, false)
    return this
  }
  sleepFirst(time) {
    this.sleepWrap(time, true)
    return this
  }
  eat(food) {
    const task = () => {
      console.log(`eat ${food}`);
      this.next()
    }
    this.tasks.push(task)
    return this
  }
}

function LazyMan(name) {
  return new _LazyMan(name)
}

LazyMan('Hank').sleep(3).eat('dinner')