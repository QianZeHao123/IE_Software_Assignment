// STEP 1：引入javascript math.js库
math = require('mathjs');
// STEP 2：生成一个[0,1)之间的随机数
// const random = math.random();
// STEP 3：设定alpha和beta的值
const alpha = 1;
const beta = 1;
// STEP 4：计算F^(-1)
// const res = -alpha * math.pow(math.log(1 - random), 1 / beta);
// console.log(res);
// 循环计算10次，并输出结果
for (let i = 0; i < 10; i++) {
    const random = math.random();
    const res = -alpha * math.pow(math.log(1 - random), 1 / beta);
    console.log(res);
}