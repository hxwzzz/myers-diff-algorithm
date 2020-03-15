function myersDiff(oldStr, newStr) {
    let oldContent = oldStr.split('')
    let newContent = newStr.split('')

    let lengthSum = oldContent.length + newContent.length
    let v = { '1': 0 }
    let vs = { '0': { '1': 0 } }

    for (let d = 0; d <= lengthSum; d++) {
        let tmp = {}

        for (let k = -d; k <= d; k += 2) {
            let down = (k === -d || (k !== d && (v[k - 1] < v[k + 1])))
            let kPrev = down ? k + 1 : k - 1

            let xStart = v[kPrev]
            let yStart = xStart - kPrev
            let xMid = down ? xStart : xStart + 1
            let yMid = xMid - k
            let xEnd = xMid
            let yEnd = yMid

            while (xEnd < oldContent.length && yEnd < newContent.length && oldContent[xEnd] == newContent[yEnd]) {
                xEnd++
                yEnd++
            }

            v[k] = xEnd
            tmp[k] = xEnd

            if (xEnd >= oldContent.length && yEnd >= newContent.length) {
                vs[d] = tmp
                console.log("Found!")
                console.log(vs)
                let keySnakes = getSolution(vs, oldContent.length, newContent.length, d);
                printRes(keySnakes, oldStr, newStr);
                return
            }
        }
        vs[d] = tmp
    }
}

function getSolution(vs, oldLen, newLen, currentD) {
    let mainPath = []
    let p = { x: oldLen, y: newLen }
    let d = currentD

    for (; d > 0; d--) {
        let v = vs[d]
        let vPrev = vs[d - 1]
        let k = p.x - p.y
  
        let xEnd = v[k]
        let yEnd = xEnd - k
      
        let down = k == -d || k != d && vPrev[k + 1] > vPrev[k - 1]
        let kPrev = down ? k + 1 : k - 1
      
        let xStart = vPrev[kPrev]
        let yStart = xStart - kPrev
      
        let xMid = down ? xStart : xStart + 1
        let yMid = xMid - k
      
        let outStr = '(' + xEnd + ',' + yEnd + ') <- (' + xStart + ',' + yStart + ')'
        console.log(outStr)
        mainPath.unshift({xStart, xMid, xEnd})
  
        p.x = xStart
        p.y = yStart
    }

    return mainPath
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
