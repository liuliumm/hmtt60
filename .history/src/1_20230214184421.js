const a = 1
const b = [1, 2, 3]
const c = { x: 1, y: 3 }
//考察函数参数类型
console.log(typeof(c))
change(a, b, c)
function change(a, b, c) {
    a = 2
    b.push(4)
    c = {x:2, y: 2 }
    console.log(1, a, b, c)
}
console.log(22, a, b, c)
// 大家看下这两个log打印结果考察函数传参类型跟组件传递类似，强化一下
