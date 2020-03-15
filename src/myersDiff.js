class Snake {
    #xStart = 0
    #yStart = 0
    #xEnd = 0
    #yEnd = 0

    constructor(xStart, yStart, xEnd, yEnd) {
        this.#xStart = xStart
        this.#yStart = yStart
        this.#xEnd = xEnd
        this.#yEnd = yEnd
    }

    get getxStart(){
        return this.#xStart
    }

    set setxStart(xStart){
        this.#xStart = xStart
    }

    get getyStart(){
        return this.#yStart
    }

    set setyStart(yStart){
        this.#yStart = yStart
    }

    get getxEnd(){
        return this.#xEnd
    }

    set setxEnd(xEnd){
        this.#xEnd = xEnd
    }

    get getyEnd(){
        return this.#yEnd
    }

    set setyEnd(yEnd){
        this.#yEnd = yEnd
    }
}

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

            snakes.unshift(new Snake(xStart, yStart, xEnd, yEnd))
            console.log('d=' + d + ', k=' + k + ', start=(' + xStart + ',' + yStart + '), mid=(' + xMid + ',' + yMid + '), end=(' + xEnd + ',' + yEnd + ')')

            if (xEnd >= oldContent.length && yEnd >= newContent.length) {
                console.log("Found!")
                let resList = []
                let currentSnake = snakes[0]
                let outStr = '(' + currentSnake.getxEnd + ',' + currentSnake.getyEnd + ') <- (' + currentSnake.getxStart + ',' + currentSnake.getyStart + ')'
                console.log(outStr)
                resList.push(outStr)
                for (let i = 1; i < snakes.length - 1; i++) {
                    let tmpSnake = snakes[i]
                    if (tmpSnake.getxEnd === currentSnake.getxStart && tmpSnake.getyEnd === currentSnake.getyStart) {
                        currentSnake = tmpSnake
                        outStr = '(' + currentSnake.getxEnd + ',' + currentSnake.getyEnd + ') <- (' + currentSnake.getxStart + ',' + currentSnake.getyStart + ')'
                        console.log(outStr)
                        resList.push(outStr)
                        if ((currentSnake.getxStart === 0) && (currentSnake.getyStart === 0)) {
                            break
                        }
                    }
                }
                return resList
            }
        }
    }
    return []
}