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
points.innerHTML = `Total Score: `
scoreboard.append(points)




class gameCreation {
    constructor () {
        this.object = []
        this.objectCategory = []
        this.categoryId = 0
        this.questionList = []
        this.currentIndex = 0
        this.totalScore = 0
        
        document.querySelector("#submit").addEventListener("click", this.pickQuestion.bind(this))
        // this.randomNumber = this.selectRandomNumber()
        
    }


    //function to pick a random number between 1 and 100
    selectRandomNumber() {
        let randomNumber = Math.round(Math.random() * 100) + 1
        return randomNumber
    }

    //function that accesses and appends the category to the page
    createCategory() {
        
        let categoryList = Object.values(this.object)
    
        
        let category = categoryList[10].title
        
        category = category.split(" ")
        .map((string) => string.charAt(0).toUpperCase() + string.substring(1))
        .join(" ")
        
        let heading = document.querySelector(".category")
        let chosenCategory = document.createElement("p")
        chosenCategory.innerHTML = category
        heading.append(chosenCategory)
        return this.objectCategory = categoryList
    
    }

    createFirstQuestion() {
        let question = this.questionList[this.currentIndex].question
        let questionDiv = document.querySelector(".question")
        questionDiv.innerHTML = ""
        let chosenQuestion = document.createElement("p")
        chosenQuestion.classList = "currentQuestion"
        chosenQuestion.innerHTML = question
        questionDiv.append(chosenQuestion)
        let answer = this.questionList[this.currentIndex].answer
        console.log(answer)
    }

    pickQuestion() {
        let answer = this.questionList[this.currentIndex].answer
        console.log(answer)
        let input = document.querySelector(".answer")
        console.log(this.currentIndex)
        
        if (this.currentIndex <= 100) {
            this.currentIndex += 1
            }
    
            if (this.currentIndex === 101) {
                let winMessage = document.createElement("p")
                winMessage.innerHTML = "You Win!! You're a trivia master!"
                document.body.append(winMessage)
            }

            if (answer === input.value) {
                console.log("correct!")
                this.totalScore += 1
                
                } 
        
                if (answer !== input.value) {
                    console.log("wrong")
                    this.totalScore = 0
                }
    
            
        let question = this.questionList[this.currentIndex].question
        let nextanswer = this.questionList[this.currentIndex].answer
        console.log(nextanswer)
        let questionDiv = document.querySelector(".question")
        let chosenQuestion = document.querySelector(".currentQuestion")
        chosenQuestion.innerHTML = question
        questionDiv.append(chosenQuestion)
        console.log(question)
        this.updateScoreboard()
    }

    //save question List
    createQuestionList(response) {
       
        let questionList = response.clues
        for (let index = 0; index < response.clues.length; index ++) {
            this.questionList.push(questionList[index])
        }
        this.createFirstQuestion()
        return this.questionList
    }
    
    //fetch questions
    getQuestionsForCategory() {
        
        let newCategoryURL = categoryURL + this.categoryId

        fetch(newCategoryURL)
            .then(response => response.json())
            .then(parsedResponse => this.createQuestionList(parsedResponse))

    }
    //function selects a random section of a list of 100 for the category, question, and answer
    selectRandomCategory(response) {
        
        let randomNumber = this.selectRandomNumber()
        this.object = response[randomNumber]
        let categoryId = Object.values(this.object)
        this.categoryId = categoryId[10].id
        this.createCategory()
        this.getQuestionsForCategory()
        return this.categoryId = categoryId[10].id
    }

    //function to fetch from jService and get category/questions
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
        if (this.totalScore === 0) {
            this.gameOver()
        }
        
    }

    gameOver() {
        let result = document.querySelector(".game-over")
        document.querySelector(".game-container").style.display = "none"
        result.style.display = "block"
        let startOverButton = document.querySelector("#restart")
        startOverButton.style.display = "block"
        
        let gameOverMessage = document.querySelector(".message")
        gameOverMessage.innerHTML = "Oh, no! You got a question wrong! Well, better hit the books and study up. Your score is reset. Try, try again!"
        result.append(gameOverMessage)
        
        startOverButton.innerHTML = "Start Over"
        result.append(startOverButton)

        startOverButton.addEventListener("click", function(event) {
            event.preventDefault()
        document.querySelector(".game-over").style.display = "none"
        document.querySelector(".rules-container").style.display = "block"
        playGame.fetchRequest()
        
        })
    }

}

let playGame = new gameCreation()
playGame.fetchRequest()