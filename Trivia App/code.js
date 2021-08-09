let url = "https://jservice.io/api/clues"

document.querySelector("#start").addEventListener("click", function(event) {
    event.preventDefault()
    document.querySelector(".rules-container").style.display = "none"
    document.querySelector(".game-container").style.display = "block"
})

class gameCreation {
    constructor () {
        this.object = []
        this.category = 0
    }
    //function to pick a random number between 1 and 100
    selectRandomNumber() {
        let randomNumber = Math.round(Math.random() * 100) + 1
        return randomNumber
    }

    //function that accesses and appends the category to the page
    createCategory(response) {
        
        let keyList = Object.values(response)
        console.log(keyList[10].title)
        let category = keyList[10].title
        
        category = category.split(" ")
        .map((string) => string.charAt(0).toUpperCase() + string.substring(1))
        .join(" ")
        
        let heading = document.querySelector(".category")
        let chosenCategory = document.createElement("p")
        chosenCategory.innerHTML = category
        heading.append(chosenCategory)
    
    }

    createQuestion(response) {
        let question = response.question
        console.log(question)
        let questionDiv = document.querySelector(".question")
        let chosenQuestion = document.createElement("p")
        chosenQuestion.innerHTML = question
        questionDiv.append(chosenQuestion)
    }

    //function selects a random section of a list of 100 for the category, question, and answer
    selectRandomObject(response) {
        let randomNumber = this.selectRandomNumber()
        let randomKey = response[randomNumber]
        this.object = response
        console.log(this.object)
        console.log(randomKey)
        this.createCategory(randomKey)
        this.createQuestion(randomKey)
        this.checkAnswer(randomKey)
    }

    //function to fetch from jService and get category/questions
    fetchRequest() {
        fetch(url)
        .then(response => response.json())
        .then(parsedResponse => this.selectRandomObject(parsedResponse))
    }

    checkAnswer(response) {
        
        let answer = response.answer.toLowerCase()
        console.log(answer)
        
        let result = document.querySelector(".result")
        let answerResponse = document.createElement("p")
        let answerListener = document.querySelector("#submit")
        let answerInput = document.querySelector(".answer")
        console.group(answerListener)
        answerListener.addEventListener("click", function () {
            
            if (answerInput.value === answer) {
                answerResponse.innerHTML = "You got it right! On to the next question!"
                result.append(answerResponse)
            } else {
                answerResponse.innerHTML = "That’s not right… Well, better hit the books and study up. Your score is reset. Try, try again!"
                result.append(answerResponse)
            }
        })
    }
}

let playGame = new gameCreation()
playGame.fetchRequest()

// let answerListener = document.querySelector("#submit")
// console.group(answerListener)
// answerListener.addEventListener("click", playGame.checkAnswer())