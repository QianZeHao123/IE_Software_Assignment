// STEP 1：引入javascript math.js库
math = require('mathjs');
// STEP 2：生成一个[0,1)之间的随机数
const random = math.random();
// STEP 3：设定a、b和c的值
const a = 1;
const b = 3;
const c = 2;
// STEP 4：计算F(c)
const Fc = (c - a) / (b - a);
// STEP 5：计算F^(-1)
if (random > 0 && random <= Fc) {
    res = a + math.sqrt((b - a) * (c - a) * random);
}
if (random > Fc && random < 1) {
    res = b * math.sqrt((b - a) * (b - c) * (1 - random));
}
// STEP 6：输出结果
console.log(res);