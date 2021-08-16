let url = "https://jservice.io/api/clues"
let categoryURL = "https://jservice.io/api/category?id="

//This section when you click the start button hides the "first page" and reveals the "Second page"
document.querySelector("#start").addEventListener("click", function(event) {
    event.preventDefault()
    document.querySelector(".rules-container").style.display = "none"
    document.querySelector(".game-container").style.display = "block"
})

//create a class to contain all the methods that will be accessed
class gameCreation {
    constructor () {
        this.categoryId = 0
        this.list = []
        this.currentIndex = 0
        //Button click initiates the next question to pull up
        document.querySelector("#submit").addEventListener("click", this.displayNextQuestion.bind(this))
    }


    //create a random number to pick a random category with
    selectRandomNumber() {
        let randomNumber = Math.round(Math.random() * 100) + 1
        return randomNumber
    }

    //selects a random category from the list of objects we're given
    selectRandomCategory(response) {
        //calls the method to pick a random number
        let randomNumber = this.selectRandomNumber()
        //picks a random object from the list of objects
        let selectedObject = response[randomNumber]
        //turns the object into an array of values
        let categoryId = Object.values(selectedObject)
        //finds the category id number to be used to fetch a list from that number
        this.categoryId = categoryId[10].id
        
        return this.categoryId = categoryId[10].id
    }

    createObjectList(response) {
        
        for (let index = 0; index < response.clues.length; index ++) {
            this.list.push(list[index])
        }
        return this.list
    }

    // displayQuestion(questionObj) {
    //     let question = this.
    // }

    displayNextQuestion() {
        if (this.currentIndex <= 100) {
           this.currentIndex += 1 
        }

        if (this.currentIndex === 101) {
            let winMessage = document.createElement("p")
            winMessage.innerHTML = "You Win!! You're a trivia master!"
            document.body.append(winMessage)
        }
        
        let object = this.list[this.currentIndex]
        (console.log(object))
        this.displayQuestion(object)
        

    }

    //fetch from the second url to get a list of objects from the category id number

    getQuestionsForCategory() {
        
        // let id = this.objectCategory[7]
        // console.log(id)
        
        let newCategoryURL = categoryURL + this.categoryId
        console.log(newCategoryURL)
        fetch(newCategoryURL)
            .then(response => response.json())
            .then(parsedResponse => this.createObjectList(parsedResponse))

    }








    //fetch using the first url that will give us a list of random categories
    fetchRequest() {
        fetch(url)
        .then(response => response.json())
        .then(parsedResponse => this.selectRandomCategory(parsedResponse))
    }
}

let playGame = new gameCreation()
playGame.fetchRequest()

