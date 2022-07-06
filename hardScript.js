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

//function that randomizes the order of an array
let answerRandomizer = (answers) => {
  answers.sort(() => Math.random() - 0.5)
  return answers
}

let disableAnswers = (answers) => {
  answers.forEach((answer) => {
    answer.disabled = true
  })
}

//map works displaying on the same page, but throws error when trying to open map on trivia.html. Need to figure out how to connect the two HTML pages

const mapQuestions = (questions) => {
  let score = 0
  questions.map((currentQuestion) => {
    //assigns values from API array to usable variables
    let answerArray = []
    let questionText = currentQuestion.question
    let correctAnswerValue = currentQuestion.correct_answer
    let wrongAnswer1Value = currentQuestion.incorrect_answers[0]
    let wrongAnswer2Value = currentQuestion.incorrect_answers[1]
    let wrongAnswer3Value = currentQuestion.incorrect_answers[2]
    //creates DOM elements for answers/questions
    let correctAnswer = document.createElement('button')
    let wrongAnswer1 = document.createElement('button')
    let wrongAnswer2 = document.createElement('button')
    let wrongAnswer3 = document.createElement('button')
    let questionHeader = document.createElement('h3')
    let displayCorrectResult = document.createElement('p')
    let displayWrongResult = document.createElement('p')
    //assigns API values to the created DOM elements
    correctAnswer.innerText = correctAnswerValue
    wrongAnswer1.innerText = wrongAnswer1Value
    wrongAnswer2.innerText = wrongAnswer2Value
    wrongAnswer3.innerText = wrongAnswer3Value
    questionHeader.innerText = questionText
    displayCorrectResult.innerText = 'Congratulations! Thats the right answer!'
    displayWrongResult.innerText = `That's the wrong answer. Try again next time.`
    displayCorrectResult.classList.add('answer-check')
    displayWrongResult.classList.add('answer-check')
    //Assigning answers to answer array
    answerArray.push(correctAnswer)
    answerArray.push(wrongAnswer1)
    answerArray.push(wrongAnswer2)
    answerArray.push(wrongAnswer3)
    let randomizedAnswers = answerRandomizer(answerArray)
    console.log(answerArray)
    //appends new DOM elements to appropriate section in HTML
    hardQuestionArea.appendChild(questionHeader)
    randomizedAnswers.forEach((answer) => {
      hardQuestionArea.appendChild(answer)
    })
    hardQuestionArea.appendChild(displayCorrectResult)
    hardQuestionArea.appendChild(displayWrongResult)
    //Event Listeners to display right or wrong answers
    correctAnswer.addEventListener('click', () => {
      displayCorrectResult.classList.remove('answer-check')
      disableAnswers(answerArray)
      score++
    })
    wrongAnswer1.addEventListener('click', () => {
      displayWrongResult.classList.remove('answer-check')
      disableAnswers(answerArray)
    })
    wrongAnswer2.addEventListener('click', () => {
      displayWrongResult.classList.remove('answer-check')
      disableAnswers(answerArray)
    })
    wrongAnswer3.addEventListener('click', () => {
      displayWrongResult.classList.remove('answer-check')
      disableAnswers(answerArray)
    })
  })
  return score
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
