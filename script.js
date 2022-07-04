//THIS IS THE API URL TEMPLATE: https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple
//This is how you check if a box is checked: document.getElementById("checkbox-id").checked = true;

//Gathering all of the necessary variables from the DOM:

let checkboxes = document.querySelectorAll('.checkbox')
let easyBox = document.querySelector('#easy-checkbox')
let mediumBox = document.querySelector('#medium-checkbox')
let hardBox = document.querySelector('#hard-checkbox')
let gkBox = document.querySelector('#gk-checkbox')
let sportsBox = document.querySelector('#sports-checkbox')
let geoBox = document.querySelector('#geo-checkbox')
let questionArea = document.querySelector('.question-list')
let troubleshooter = document.querySelector('.troubleshooter')
let startButton = document.querySelector('.start-button')

//function to determine difficulty selected

let getDifficulty = () => {
  if (easyBox.checked == true) {
    return 'easy'
  } else if (mediumBox.checked == true) {
    return 'medium'
  } else if (hardBox.checked == true) {
    return 'hard'
  }
}

//function that determines category

let getCategory = () => {
  if (sportsBox.checked == true) {
    return '21'
  } else if (gkBox.checked == true) {
    return '9'
  } else if (geoBox.checked == true) {
    return '22'
  }
}

//function that maps questions and answers to trivia.html

//map works displaying on the same page, but throws error when trying to open map on trivia.html. Need to figure out how to connect the two HTML pages

const mapQuestions = (questions) => {
  questions.map((currentQuestion) => {
    let questionText = currentQuestion.question
    let questionHeader = document.createElement('h3')
    questionHeader.innerText = questionText
    questionArea.appendChild(questionHeader)
    //troubleshooter.appendChild(questionHeader) //area for questions on main page for troubleshooting purposes
  })
}

//This makes the appropriate API call for difficulty and topic

startButton.onclick = async function () {
  let difficultyOption = getDifficulty()
  let category = getCategory()
  let response = await axios.get(
    `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficultyOption}&type=multiple`
  )
  let questionsArray = response.data.results
  console.log(questionsArray)
  mapQuestions(questionsArray)
  //location.href = '/trivia.html' //opens Trivia Time in same tab
  window.open('/trivia.html', '_blank') //opens Trivia Time in new window for testing purposes
}
