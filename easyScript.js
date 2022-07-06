//THIS IS THE API URL TEMPLATE: https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple
//This is how you check if a box is checked: document.getElementById("checkbox-id").checked = true;

//Gathering all of the necessary variables from the DOM:

let gkBox = document.querySelector('#easy-gk-checkbox')
let sportsBox = document.querySelector('#easy-sports-checkbox')
let geoBox = document.querySelector('#easy-geo-checkbox')
let easyQuestionArea = document.querySelector('.easy-question-list')
let easyStartButton = document.querySelector('#easy-start')
let scoreboard = document.querySelector('.scoreboard')
let score = 0

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

//This function unencrypts Qs and As from the API
let unencryptText = (phrase) => {
  phrase.toString()
  let arrayIterator = phrase.split('')
  //this loop decodes 's
  for (i = 0; i < arrayIterator.length; i++) {
    if (
      arrayIterator[i] === '&' &&
      arrayIterator[i + 1] === '#' &&
      arrayIterator[i + 2] === '0' &&
      arrayIterator[i + 3] === '3' &&
      arrayIterator[i + 4] === '9' &&
      arrayIterator[i + 5] === ';'
    ) {
      arrayIterator[i] = `'`
      arrayIterator.splice(i + 1, 5)
    }
  }
  //this loop decodes & signs
  for (i = 0; i < arrayIterator.length; i++) {
    if (
      arrayIterator[i] === '&' &&
      arrayIterator[i + 1] === 'a' &&
      arrayIterator[i + 2] === 'm' &&
      arrayIterator[i + 3] === 'p'
    ) {
      arrayIterator.splice(i + 1, 4)
    }
  }
  //This loop decodes quotes
  for (i = 0; i < arrayIterator.length; i++) {
    if (
      arrayIterator[i] === '&' &&
      arrayIterator[i + 1] === 'q' &&
      arrayIterator[i + 2] === 'u' &&
      arrayIterator[i + 3] === 'o' &&
      arrayIterator[i + 4] === 't' &&
      arrayIterator[i + 5] === ';'
    ) {
      arrayIterator[i] = `"`
      arrayIterator.splice(i + 1, 5)
    }
  }
  phrase = arrayIterator.join('')
  return phrase
}

//function that randomizes the order of an array
let answerRandomizer = (answers) => {
  answers.sort(() => Math.random() - 0.5)
  return answers
}

//disables the ability to click multiple answers
let disableAnswers = (answers) => {
  answers.forEach((answer) => {
    answer.disabled = true
  })
}

//map works displaying on the same page, but throws error when trying to open map on trivia.html. Need to figure out how to connect the two HTML pages

const mapQuestions = (questions) => {
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
    //The following content decodes info that came in from the API
    let contentArray = [questionHeader, ...answerArray]
    contentArray.forEach((phrase) => {
      phrase.innerText = unencryptText(phrase.innerText)
    })
    //appends new DOM elements to appropriate section in HTML
    easyQuestionArea.appendChild(questionHeader)
    randomizedAnswers.forEach((answer) => {
      easyQuestionArea.appendChild(answer)
    })
    easyQuestionArea.appendChild(displayCorrectResult)
    easyQuestionArea.appendChild(displayWrongResult)
    //Event Listeners to display right or wrong answers
    correctAnswer.addEventListener('click', () => {
      score++
      console.log(score)
      displayCorrectResult.classList.remove('answer-check')
      disableAnswers(answerArray)
      scoreboard.innerText = `Current Score: ${score}`
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
}

//This makes the appropriate API call for difficulty and topic

easyStartButton.addEventListener('click', async function () {
  let category = getCategory()
  let response = await axios.get(
    `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`
  )
  let questionsArray = response.data.results
  mapQuestions(questionsArray)
})
