let url = "https://jservice.io/api/clues"


class gameCreation {
    constructor () {
        this.object = []
    }
    //function to pick a random number between 1 and 100
    selectRandomNumber() {
        let randomNumber = Math.round(Math.random() * 100) + 1
        return randomNumber
    }

    //function that creates the category based on the fetch response using a random number and appends that category to the page
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

    selectRandomObject(response) {
        let randomNumber = this.selectRandomNumber()
        let randomKey = response[randomNumber]
        console.log(randomKey)
        this.createCategory(randomKey)
        this.createQuestion(randomKey)
        
    }

    //function to fetch from jService and get category/questions
    fetchRequest() {
        fetch(url)
        .then(response => response.json())
        .then(parsedResponse => this.selectRandomObject(parsedResponse))

    }
}

let playGame = new gameCreation()
playGame.fetchRequest()