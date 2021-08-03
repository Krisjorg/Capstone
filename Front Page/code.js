// let url = "https://jservice.io/api/random"


// function createCategory(response) {
//     let firstKey = Object.values(response[0])
//     console.log(firstKey[10].title)
//     let category = firstKey[10].title
    
//     category = category.split(" ")
//     .map((string) => string.charAt(0).toUpperCase() + string.substring(1))
//     .join(" ")
    
//     let heading = document.querySelector(".category")
//     let chosenCategory = document.createElement("p")
//     chosenCategory.innerHTML = category
//     heading.append(chosenCategory)
//     return category
// }

// function fetchRequest() {
//     fetch(url)
//     .then(response => response.json())
//     .then(parsedResponse => createCategory(parsedResponse))
// }

// fetchRequest()