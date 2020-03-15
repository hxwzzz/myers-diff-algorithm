function myersDiff(oldStr, newStr) {
    let oldContent = oldStr.split('')
    let newContent = newStr.split('')

    let lengthSum = oldContent.length + newContent.length
    let maxStep = oldContent.length + newContent.length
    let v = new Array(lengthSum * 2 + 1).fill(0)
    let snakes = []

    for (let d = 0; d <= lengthSum; d++) {
        for (let k = -d; k <= d; k += 2) {
            let down = (k === -d || (k !== d && (v[k - 1 + maxStep] < v[k + 1 + maxStep])))

            let kPrev = down ? k + 1 : k - 1
            let xStart = v[kPrev + maxStep]
            let yStart = xStart - kPrev
            let xMid = down ? xStart : xStart + 1
            let yMid = xMid - k
            let xEnd = xMid
            let yEnd = yMid

            let snake = 0
            while (xEnd < oldContent.length && yEnd < newContent.length && oldContent[xEnd] == newContent[yEnd]) {
                xEnd++
                yEnd++
                snake++
            }

            v[k + maxStep] = xEnd

            snakes.unshift({ xStart, yStart, xMid, yMid, xEnd, yEnd })
            console.log('d=' + d + ', k=' + k + ', start=(' + xStart + ',' + yStart + '), mid=(' + xMid + ',' + yMid + '), end=(' + xEnd + ',' + yEnd + ')')

            if (xEnd >= oldContent.length && yEnd >= newContent.length) {
                console.log("Found!")
                let resList = []
                let mainPath = [];
                let currentSnake = snakes[0]
                let outStr = '(' + currentSnake.xEnd + ',' + currentSnake.yEnd + ') <- (' + currentSnake.xStart + ',' + currentSnake.yStart + ')'
                console.log(outStr)
                resList.push(outStr)
                mainPath.unshift({
                    xStart: currentSnake.xStart,
                    xMid: currentSnake.xMid,
                    xEnd: currentSnake.xEnd
                })
                for (let i = 1; i < snakes.length - 1; i++) {
                    let tmpSnake = snakes[i]
                    if (tmpSnake.xEnd === currentSnake.xStart && tmpSnake.yEnd === currentSnake.yStart) {
                        currentSnake = tmpSnake
                        outStr = '(' + currentSnake.xEnd + ',' + currentSnake.yEnd + ') <- (' + currentSnake.xStart + ',' + currentSnake.yStart + ')'
                        console.log(outStr)
                        resList.push(outStr)
                        mainPath.unshift({
                            xStart: currentSnake.xStart,
                            xMid: currentSnake.xMid,
                            xEnd: currentSnake.xEnd
                        })
                        if ((currentSnake.yStart === 0) && (currentSnake.xEnd === 0)) {
                            break
                        }
                    }
                }
                printRes(mainPath, oldStr, newStr)
                return resList
            }
        }
    }
    return []
}

function printRes(snakes, oldStr, newStr) {
    let grayColor = 'color: gray'
    let redColor = 'color: red'
    let greenColor = 'color: green'
    let consoleStr = ''
    let args = []
    let yOffset = 0

    snakes.forEach((snake, index) => {
        let currentPos = snake.xStart

        if (index === 0 && snake.xStart !== 0) {
            for (let j = 0; j < snake.xStart; j++) {
                consoleStr += `%c${oldStr[j]}`
                args.push(grayColor)
                yOffset++
            }
        }

        if (snake.xMid - snake.xStart == 1) {
            // 删除
            consoleStr += `%c${oldStr[snake.xStart]}`
            args.push(redColor)
            currentPos = snake.xMid
        } else {
            // 添加
            consoleStr += `%c${newStr[yOffset]}`
            args.push(greenColor)
            yOffset++
        }

        // 不变
        for (let i = 0; i < snake.xEnd - currentPos; i++) {
            consoleStr += `%c${oldStr[currentPos + i]}`
            args.push(grayColor)
            yOffset++
        }
    })
    console.log(consoleStr, ...args)
}
