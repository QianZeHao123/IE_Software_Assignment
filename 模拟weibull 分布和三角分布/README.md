# 模拟weibull 分布和三角分布
## 1 安装依赖
* 在IE_Software_Assigment根目录中执行
```bash
# 依赖包为package.json中的dependencies和package-lock.json中的dependencies
# npm可以自动识别根目录下的package.json文件，并且自动安装依赖包
npm install
```
## 2 运行
```bash
node triangle-distribution.js   # 生成的随机数服从三角分布
node weibull-distribution.js    # 生成的随机数服从weibull分布 
```
## 3 JavaScript版本的模拟weibull分布和三角分布
* 基于NodeJS
* 采用ES6语法，require()方法加载依赖包
* NodeJS为Javascript后端开发语言，可以在服务器上运行Javascript代码，下载地址：[NodeJS](https://nodejs.org/en/)
* 个人觉得JS比Python好用，NodeJS速度大约是CPython的3倍左右，开发效率也更高~
