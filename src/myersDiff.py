import sys

class Snake:
    __xStart = 0
    __yStart = 0
    __xEnd = 0
    __yEnd = 0
 
    def __init__(self, xStart, yStart, xEnd, yEnd):
        self.__xStart = xStart
        self.__yStart = yStart
        self.__xEnd = xEnd
        self.__yEnd = yEnd

    def getxStart(self):
        return self.__xStart
 
    def setxStart(self, xStart):
        self.__xStart = xStart
 
    def getyStart(self):
        return self.__yStart
 
    def setyStart(self, yStart):
        self.__yStart = yStart
 
    def getxEnd(self):
        return self.__xEnd

    def setxEnd(self, xEnd):
        self.__xEnd = xEnd

    def getyEnd(self):
        return self.__yEnd
 
    def setyEnd(self, yEnd):
        self.__yEnd = yEnd

def myersDiff(oldStr, newStr):
    oldContent = list(oldStr)
    newContent = list(newStr)

    lengthSum = len(oldContent) + len(newContent)
    maxStep = len(oldContent) + len(newContent)
    v = [0] * (lengthSum * 2 + 1)
    snakes = []

    for d in range(0, lengthSum + 1):
        for k in range(-d, d + 2, 2):
            print("d=", d, sep="", end=" ")
            print("k=", k, sep="", end=" ")
            down = (k == -d or (k != d and (v[k - 1 + maxStep] < v[k + 1 + maxStep])))

            if (down):
                kPrev = k + 1
            else:
                kPrev = k - 1
            xStart = v[kPrev + maxStep]
            yStart = xStart - kPrev
            if (down):
                xMid = xStart 
            else:
                xMid = xStart + 1
            yMid = xMid - k
            xEnd = xMid
            yEnd = yMid

            snake = 0
            while (xEnd < len(oldContent) and yEnd < len(newContent) and oldContent[xEnd] == newContent[yEnd]):
                xEnd += 1
                yEnd += 1
                snake += 1
            
            v[k + maxStep] = xEnd

            snakes.insert(0, Snake(xStart, yStart, xEnd, yEnd))
            print("start=(", xStart, ",", yStart, "), mid=(", xMid, ",", yMid, "), end=(", xEnd, ",", yEnd, ")", sep="")

            if (xEnd >= len(oldContent) and yEnd >= len(newContent)):
                print("Found!")
                currentSnake = snakes[0]
                print("(", currentSnake.getxEnd(), ",", currentSnake.getyEnd(), ") <- (", currentSnake.getxStart(), ",", currentSnake.getyStart(), ")", sep="")
                for i in range(1, len(snakes) - 1):
                    tmpSnake = snakes[i]
                    if (tmpSnake.getxEnd() == currentSnake.getxStart() and tmpSnake.getyEnd() == currentSnake.getyStart()):
                        currentSnake = tmpSnake
                        print("(", currentSnake.getxEnd(), ",", currentSnake.getyEnd(), ") <- (", currentSnake.getxStart(), ",", currentSnake.getyStart(), ")", sep="")
                        if ((currentSnake.getxStart() == 0) and (currentSnake.getyStart() == 0)):
                            break
                return

if __name__ == "__main__":
    try:
        oldStr= sys.argv[1]
        newStr= sys.argv[2]
        myersDiff(oldStr, newStr)
    except Exception as e:
        print(sys.argv)
        print(e)
