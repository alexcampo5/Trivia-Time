//THIS IS THE API URL TEMPLATE: https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple
//This is how you check if a box is checked: document.getElementById("checkbox-id").checked = true;

//Gathering all of the necessary variables from the DOM:

let gkBox = document.querySelector('#hard-gk-checkbox')
let sportsBox = document.querySelector('#hard-sports-checkbox')
let geoBox = document.querySelector('#hard-geo-checkbox')
let hardQuestionArea = document.querySelector('.hard-question-list')
let hardStartButton = document.querySelector('#hard-start')

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

//map works displaying on the same page, but throws error when trying to open map on trivia.html. Need to figure out how to connect the two HTML pages

const mapQuestions = (questions) => {
  questions.map((currentQuestion) => {
    //assigns values from API array to usable variables
    let questionText = currentQuestion.question
    let correctAnswerValue = currentQuestion.correct_answer
    let wrongAnswer1Value = currentQuestion.incorrect_answers[0]
    let wrongAnswer2Value = currentQuestion.incorrect_answers[1]
    let wrongAnswer3Value = currentQuestion.incorrect_answers[2]
    //creates DOM elements for answers/questions
    let correctAnswer = document.createElement('p')
    let wrongAnswer1 = document.createElement('p')
    let wrongAnswer2 = document.createElement('p')
    let wrongAnswer3 = document.createElement('p')
    let questionHeader = document.createElement('h3')
    //assigns API values to the created DOM elements
    correctAnswer.innerText = correctAnswerValue
    wrongAnswer1.innerText = wrongAnswer1Value
    wrongAnswer2.innerText = wrongAnswer2Value
    wrongAnswer3.innerText = wrongAnswer3Value
    questionHeader.innerText = questionText
    //appends new DOM elements to appropriate section in HTML
    hardQuestionArea.appendChild(questionHeader)
    hardQuestionArea.appendChild(wrongAnswer1)
    hardQuestionArea.appendChild(wrongAnswer3)
    hardQuestionArea.appendChild(correctAnswer)
    hardQuestionArea.appendChild(wrongAnswer2)
  })
}

//This makes the appropriate API call for difficulty and topic

hardStartButton.addEventListener('click', async function () {
  let category = getCategory()
  let response = await axios.get(
    `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=hard&type=multiple`
  )
  let questionsArray = response.data.results
  console.log(questionsArray)

  mapQuestions(questionsArray)
})
