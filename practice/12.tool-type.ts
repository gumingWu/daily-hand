type myPartial<T extends object> = {
  [K in keyof T]?: T[K]
}

type Obj = {
  name: string
  age: number
}

type PartialObj = myPartial<Obj>