const a = 1
const b = [1, 2, 3]
const c = { x: 1 }

// 考察函数参数类型
// 函数传参：
// 1. 基本类型 (常见说法 值传递), 就是把数据a的值复制给change函数内部，将来改动也不改a本身(和a没关系了)
// 2. 引用类型 (常见说法 引用传递即传递的是地址)，就是把数据的内存地址传给过去了，如b c都是把地址传递过去
change(a, b, c)

// 函数接收参数：把参数的值 赋给 形参，形参是函数内部局部变量，可以再次修改
function change(a, b, c) {
  a = 2
  b.push(4)
  c = { y: 2 }

  // 这里打印的就是修改后的数据 a:2 b: [1,2,3,4] c: {y:2}
  console.log(11, a, b, c)
}

// 在执行change(a,b,c)函数后
// a是值传递，所以a变量本身没有影响没有变化还是1
// b是地址传递，然后在内部又往该地址中追加了一个数据4，所以外界就是[1, 2, 3, 4]
// c是地址传递，但是函数内部的局部变量c去指向了一个新的对象{y:2}，原对象{x:1}还由外界的变量c指向，打印{x: 1}
console.log(22, a, b, c)

// 总结:
// 1. 函数外界：类比父组件，提供数据方
// 2. 函数内部：类比子组件，接收数据方
// 3. 子组件/函数内部修改数据情况
//  3.1 基本类型，函数内部一改，函数内外数据就[不一致]了，对应子组件中直接修改基本类型props的报错
//  3.2 引用类型，函数内部重新赋值，函数内外数据[也不一致]了，对应子组件中对引用类型props =号赋值的报错
//  3.2 只有引用类型，不重新赋值 只改变内部数据的情况，函数内外数据[一致]，对应子组件使用push等方式修改数组数据不报错且夫子组件数据一致的情况

