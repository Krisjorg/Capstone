let url = "https://jservice.io/api/clues"
let categoryURL = "https://jservice.io/api/category?id="

document.querySelector("#start").addEventListener("click", function(event) {
    event.preventDefault()
    document.querySelector(".rules-container").style.display = "none"
    document.querySelector(".game-container").style.display = "block"
})

let scoreboard = document.querySelector(".scoreboard")
let points = document.createElement("p")

points.classList = "points"
points.innerHTML = `Total Score: 0`
scoreboard.append(points)

class gameCreation {
    constructor () {
        this.object = []
        this.objectCategory = []
        this.categoryId = 0
        this.questionList = []
        this.currentIndex = 0
        this.totalScore = 0
        this.randomNumber = 0
        
        document.querySelector("#submit").addEventListener("click", this.pickQuestion.bind(this))
    }

    selectRandomNumber() {
        let randomNumber = Math.round(Math.random() * 100) + 1
        return randomNumber
    }

    createCategory() {
        let categoryList = Object.values(this.object)
        let category = categoryList[10].title
        category = category.split(" ")
        .map((string) => string.charAt(0).toUpperCase() + string.substring(1))
        .join(" ")
        
        let heading = document.querySelector(".category")
        let chosenCategory = document.querySelector(".chosenCategory")
        chosenCategory.innerHTML = category
        heading.append(chosenCategory)
        
        return this.objectCategory = categoryList
    }

    createFirstQuestion() {
        this.randomNumber = Math.floor(Math.random() * this.questionList.length)
        let question = this.questionList[this.randomNumber].question
        let questionDiv = document.querySelector(".question")
        questionDiv.innerHTML = ""
        
        let chosenQuestion = document.createElement("p")
        chosenQuestion.classList = "currentQuestion"
        chosenQuestion.innerHTML = question
        questionDiv.append(chosenQuestion)

        let answer = this.questionList[this.randomNumber].answer
        console.log(answer)
        return this.randomNumber
    }

    pickQuestion() {
        let answer = this.questionList[this.randomNumber].answer
        let input = document.querySelector(".answer")
        
        if (this.currentIndex <= 100) {
            this.currentIndex += 1
        }
        if (this.totalScore === 100) {
            let winMessage = document.createElement("p")
            winMessage.innerHTML = "You Win!! You're a trivia master!"
            document.body.append(winMessage)
        }
        if (answer.toLowerCase() === input.value.toLowerCase()) {
            this.totalScore += 1
            input.value = ""
        } else if (answer !== input.value.toLowerCase()) {
            this.totalScore = 0
            input.value = ""
        }
                
        this.questionList.splice([this.randomNumber], 1)
        this.randomNumber = Math.floor(Math.random() * this.questionList.length)
        
        if (this.questionList.length === 0) {
            this.gameOver()
        } else {
            let question = this.questionList[this.randomNumber].question
            let nextanswer = this.questionList[this.randomNumber].answer
            console.log(nextanswer)
            let questionDiv = document.querySelector(".question")
            let chosenQuestion = document.querySelector(".currentQuestion")
            chosenQuestion.innerHTML = question
            questionDiv.append(chosenQuestion)
            
            this.updateScoreboard()
            return this.questionList
        }
    }

    createQuestionList(response) {
        let questionList = response.clues
        for (let index = 0; index < response.clues.length; index ++) {
            this.questionList.push(questionList[index])
        }
        this.createFirstQuestion()
        return this.questionList
    }

    getQuestionsForCategory() {
        let newCategoryURL = categoryURL + this.categoryId

        fetch(newCategoryURL)
            .then(response => response.json())
            .then(parsedResponse => this.createQuestionList(parsedResponse))
    }
    
    selectRandomCategory(response) {
        let randomNumber = this.selectRandomNumber()
        this.object = response[randomNumber]
        
        let categoryId = Object.values(this.object)
        this.categoryId = categoryId[10].id
        this.createCategory()
        this.getQuestionsForCategory()
        return this.categoryId = categoryId[10].id
    }

    fetchRequest() {
        fetch(url)
        .then(response => response.json())
        .then(parsedResponse => this.selectRandomCategory(parsedResponse))
    }

    updateScoreboard() {
        let getPoints = document.querySelector(".points")
        let scoreboard = document.querySelector(".scoreboard")
        getPoints.innerHTML = `Total Score: ${this.totalScore}`
        scoreboard.append(getPoints)

        let result = document.querySelector(".result")
        let resultMessage = document.querySelector(".resultMessage")
        resultMessage.innerHTML = "You got the answer right! You've been awarded 1 point. Keep up the good work!"
        result.append(resultMessage)
        
        if (this.totalScore === 0) {
            this.gameOver()
        }
        setInterval(function() {
            resultMessage.innerHTML = ""
        }, 5000)
    }

    gameOver() {
        this.currentIndex = 0
        let result = document.querySelector(".game-over")
        document.querySelector(".game-container").style.display = "none"
        result.style.display = "block"
        
        let gif = document.querySelector(".sad-face")
        let startOverButton = document.querySelector("#restart")
        startOverButton.style.display = "block"
        
        let scoreResult = document.querySelector(".score-result")
        let gameOverMessage = document.querySelector(".message")
        let scoreboardReset = document.querySelector(".points")
        scoreboardReset.innerHTML = `Total Score: 0`

        if (this.questionList.length === 0) {
            gameOverMessage.innerHTML = "<h2>You win! You're a trivia master!</h2><p>Hit the Start Over button to start a new game!</p>"
            scoreResult.innerHTML = `Your final score is ${this.totalScore} points!` 
        } else {
            gameOverMessage.innerHTML = "Oh, no! You got a question wrong! Well, better hit the books and study up. Your score is reset. Try, try again!"
            gif.style.display = "block"
        }

        result.append(scoreResult)
        result.append(gameOverMessage)
        startOverButton.innerHTML = "Start Over"
        result.append(startOverButton)
        
        startOverButton.addEventListener("click", function(event) {
            event.preventDefault()
            document.querySelector(".game-over").style.display = "none"
            document.querySelector(".rules-container").style.display = "block"
            gif.style.display = "none"
            playGame.fetchRequest()
        })
        return this.totalScore = 0
    }
}

let playGame = new gameCreation()
playGame.fetchRequest()