// 生成初始解决方案
function makeAns(n) {
    // n表示城市的数量，这里生成初始解决方案，就是按顺序访问这n个城市
    let cities = []
    for (let i = 0; i < n; i++)
        cities.push(i)
    return cities
}

// 随机扰动解决方案，生成新解决方案
function makeNewAns(resultNow, n) {
    let resultNew = resultNow.slice(0)
    // 随机选取两个不同的城市
    let firstCity = Math.floor(Math.random() * n)
    let secondCity = Math.floor(Math.random() * n)
    while (secondCity === firstCity)
        secondCity = Math.floor(Math.random() * n)
    // 交换访问它们的顺序，造成小扰动
    resultNew[firstCity] = resultNew[firstCity] ^ resultNew[secondCity]
    resultNew[secondCity] = resultNew[firstCity] ^ resultNew[secondCity]
    resultNew[firstCity] = resultNew[firstCity] ^ resultNew[secondCity]
    return resultNew
}

// 控制解决方案是否更新的Metropolis准则
const Metropolis = (Et, EtNew, T) => EtNew < Et ? 1 : Math.E ** (-(EtNew - Et) / T)

// 计算两个城市之间的欧几里得距离
const getDistance = (cityA, cityB) => Math.sqrt(((cityA[0] - cityB[0]) ** 2) + ((cityA[1] - cityB[1]) ** 2))

// 计算当前解决方案下的总距离
const getAns = (result, cities) => result.reduce((a, b, index) => result[index + 1] ? a + getDistance(cities[b], cities[result[index + 1]]) : a, 0)

// 设置模拟退火参数
function setParameters() {
    //中国34个城市实际距离坐标x坐标y坐标
    const cities = [[9932, 4439], [10109, 4351], [11552, 3472], [10302, 3290], [8776, 3333], [7040, 4867], [9252, 4278], [9395, 4539], [11101, 2540], [9825, 5087], [10047, 4879], [10227, 4648], [100027, 4229], [9878, 4211], [9087, 4065], [10438, 4075], [10382, 3865], [11196, 3563], [11075, 3543], [11544, 3365], [11915, 2900], [11305, 3189], [11073, 3137], [10950, 3394], [11576, 2575], [12239, 2785], [11529, 2226], [9328, 4006], [10012, 3811], [9952, 3410], [10612, 2954], [10349, 2784], [11747, 2469], [11673, 2461]]
    // 初始解决方案
    let result = makeAns(cities.length)
    // 初始温度
    let startTemperature = 10000
    // 结束温度
    let endTemperature = 1e-8
    // 降温系数
    let alpha = 0.98
    // 目标结果范围
    let targetDistance = 12000
    return {
        cities, result, startTemperature, endTemperature, alpha, targetDistance
    }
}

// 模拟退火执行函数
function anneal() {
    // 获取参数
    let {
        cities, result, startTemperature, endTemperature, alpha, targetDistance
    } = setParameters()

    // startTime为开始执行时间
    let startTime = Date.now()
    // cnt用于记录退火次数
    let cnt = 0
    // sum用于记录迭代次数
    let sum = 0
    // T表示当前温度
    let T = startTemperature
    // 最优解
    let bestResult = result

    // 如果当前求解最短路大于目标结果，那么重新退火
    while (getAns(result, cities) > targetDistance) {
        // 限制时间，如果超过20秒则退出程序
        if ((Date.now() - startTime) / 1000 > 20)
            break
        while (T > endTemperature) {
            // 制造一些波动，获取一个新解决方案
            let resultNew = makeNewAns(result, cities.length)
            // 获取新解决方案替换当前解决方案的概率
            let p = Metropolis(getAns(result, cities), getAns(resultNew, cities), T)
            // 获取一个概率值，如果p大于等于这个概率，那么就让新解决方案替换当前解决方案
            p >= Math.random() && (result = resultNew)
            // 降温
            T *= alpha
            // 更新最优解
            bestResult = getAns(result, cities) < getAns(bestResult, cities) ? result : bestResult
            sum++
        }
        T = startTemperature
        // 记录退火次数
        cnt++
    }

    return {
        distance: getAns(bestResult, cities),
        order: bestResult,
        cnt,
        sum,
        startTime
    }
}

// 主函数
(() => {
    let {
        distance,
        order,
        startTime,
        cnt,
        sum
    } = anneal()
    console.log(`总耗时为${(Date.now() - startTime) / 1000}秒，最短路径是${distance}，退火次数为${cnt - 1}次，迭代次数为${sum}，顺序如下`)
    console.log(order)
})()
