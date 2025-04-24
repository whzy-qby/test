const obj = {
  a: {
    b: {
      c: {
        d: {
          e: 1
        },
        f: 2
      },
      g: 3
    },
    h: 4
  },
  i: {
    j: 5,
    k: 6
  }
}

const bfs = (obj) => {
   const arr = [obj]
   const a = []
   while(arr.length > 0) {
    current = arr.shift()
    for(const key in current) {
      if(current.hasOwnProperty(key)) {
        a.push(key)
      }
      if(typeof current[key] === 'object' && current[key] !== null){
        arr.push(current[key])
      }
     }
   }
   return a
}
console.log(bfs(obj))