let url = "https://jservice.io/api/clues"
let categoryURL = "https://jservice.io/api/category?id="


document.querySelector("#start").addEventListener("click", function(event) {
    event.preventDefault()
    document.querySelector(".rules-container").style.display = "none"
    document.querySelector(".game-container").style.display = "block"
})

let scoreboard = document.querySelector(".scoreboard")
let points = document.createElement("p")
let totalScore = 0
points.classList = "points"
points.innerHTML = `Total Score: ${totalScore}`
scoreboard.append(points)


class gameCreation {
    constructor () {
        this.object = []
        this.objectCategory = []
        this.categoryId = 0
        this.questionList = []
        this.currentIndex = 0
        
        document.querySelector("#submit").addEventListener("click", this.displayNextQuestion.bind(this))
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

    pickQuestion() {
        let question = this.questionList[this.currentIndex].question
        
       
        let questionDiv = document.querySelector(".question")
        questionDiv.innerHTML = ""
        let chosenQuestion = document.createElement("p")
        chosenQuestion.classList = "currentQuestion"
        chosenQuestion.innerHTML = question
        questionDiv.append(chosenQuestion)
       
        this.checkAnswer()

    }

    //save question List
    createQuestionList(response) {
       
        let questionList = response.clues
        for (let index = 0; index < response.clues.length; index ++) {
            this.questionList.push(questionList[index])
        }
        this.pickQuestion()
        return this.questionList
    }

    displayNextQuestion() {
        if (this.currentIndex <= 100) {
            this.currentIndex += 1
        }

        if (this.currentIndex === 101) {
            let winMessage = document.createElement("p")
            winMessage.innerHTML = "You Win!! You're a trivia master!"
            document.body.append(winMessage)
        }
        
        this.pickQuestion(this.currentIndex)
    
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
        
        
        // console.log(randomKey)
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
        
       
        let answerListener = document.querySelector("#submit")
        answerListener.addEventListener("click", function(event) {
            event.preventDefault()
        let getPoints = document.querySelector(".points")
        let scoreboard = document.querySelector(".scoreboard")
        if (totalScore === 0) {
            getPoints.innerHTML = `Total Score: ${totalScore}`
            scoreboard.append(points)
        } else {
            getPoints.innerHTML = `Total Score: ${totalScore}`
            scoreboard.append(getPoints)
        }
        })
    }

    checkAnswer() {
         
        let correctAnswer = this.questionList[this.currentIndex].answer
        console.log(correctAnswer)
        
        let result = document.querySelector(".result")
        let answerResponse = document.createElement("p")
        
        let answerListener = document.querySelector("#submit")
        let userInput = document.querySelector(".answer")
        
        let currentQuestion = document.querySelector(".currentQuestion")
        result.innerHTML = ""
        answerListener.addEventListener("click", function(event) {
            event.preventDefault()
            
            if (userInput.value === correctAnswer) {
                totalScore += 1
                
                
                
                answerResponse.innerHTML = "You got it right! On to the next question!"
                //result.append(answerResponse)
               // userInput.value = ""
               // currentQuestion.innerHTML = ""
                
                console.log(totalScore)
                
                
            } else if (userInput.value !== correctAnswer) {
                totalScore = 0
                
                
                answerResponse.innerHTML = "That’s not right… Well, better hit the books and study up. Your score is reset. Try, try again!"
                //result.append(answerResponse)
                
                //currentQuestion.innerHTML = ""
                
                console.log(totalScore)
            }
            result.append(answerResponse)
        })
        this.updateScoreboard()
    }
}

let playGame = new gameCreation()
playGame.fetchRequest()

// let answerListener = document.querySelector("#submit")
// console.group(answerListener)
// answerListener.addEventListener("click", playGame.checkAnswer())
//hello