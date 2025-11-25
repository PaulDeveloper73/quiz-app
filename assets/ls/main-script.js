import quizQuestions from './quiz-questions.js'
import { displayQuiz } from './display-quiz.js'
// import { handleOptionSelect } from './handle-option-select.js'
// import { handleSubmit } from './handle-submit.js'
// import { displayResults } from './display-results.js'
// Initialize quiz

document.addEventListener('DOMContentLoaded', () => {
  // Additional initialization code can go here
  setTimeout(() => {
    // nextBtn.textContent = 'Next'
    initApp()
  }, 1000)
})
const initApp = () => {
  const quizContainer = document.querySelector('.quiz-container')
  const quizHeader = document.querySelector('.quiz-header')
  const nextBtn = document.querySelector('#nextBtn')
  let qnId = 0
  let fetchQnItem = quizQuestions[qnId]

  const handleNextBrn = () => {
    fetchQnItem = quizQuestions[qnId] ?? ''
    displayQuiz(qnId, fetchQnItem, quizContainer)
    nextBtn.textContent = 'Next →'

    if (qnId >= quizQuestions.length) {
      const getUserAnswers = loadQuizData()
      const userAnswers = getUserAnswers.filter(
        qn => qn.correct_answer === qn.user_answer
      ).length

      // load quiz data from local storage
      nextBtn.style.display = 'none'
      quizHeader.textContent = 'Quiz Completed!'
      quizContainer.innerHTML = `<h4>Thank you for participating in the quiz.</h4> You scored:${userAnswers} out of ${quizQuestions.length}.
      <button id="restartBtn" onclick="location.reload()">Restart Quiz</button>
      `
      // displayResults(quizQuestions, quizContainer)
      // return
    }

    // check if there is no user answer  and disable the next button
    const currentQnItem = quizQuestions.find(qn => qn.id === qnId + 1)

    if (currentQnItem.user_answer === null) {
      nextBtn.disabled = true
    } else {
      nextBtn.disabled = false
    }
    qnId++
  }
  // add event listner on click on the list to give bgcolor on correct and wrong answer
  quizContainer.addEventListener('click', e => {
    const target = e.target
    if (target.tagName === 'LI') {
      const userAnswer = target.textContent
      const currentQnItem = quizQuestions.find(qn => qn.id === qnId)
      const isCorrect = currentQnItem.correct_answer === userAnswer // check the correct answer
      const options = target.parentElement.querySelectorAll('li')
      options.forEach(li => {
        li.style.pointerEvents = 'none' // disable all options
        if (li.textContent === currentQnItem.correct_answer) {
          li.style.backgroundColor = 'green'
          li.style.color = 'white'
        } else if (
          li === target &&
          userAnswer !== currentQnItem.correct_answer
        ) {
          li.style.backgroundColor = 'firebrick'
          li.style.color = 'white'
        } else {
          li.style.backgroundColor = 'lightgray'
          li.style.color = 'black'
        }
      })

      // update the quizQuestions array
      // quizQuestions.splice(0, quizQuestions.length, ...updateUserQn)
      //  updateQuizQuestion(qnId, userAnswer)

      // TODO update the quiz question and add to local storage and also get from local storage when the app load
      const updateUserQn = quizQuestions.map(qn => {
        if (qn.id === currentQnItem.id) {
          return {
            ...qn,
            user_answer: userAnswer
          }
        }
        return qn
      })
      // update the quizQuestions array
      quizQuestions.splice(0, quizQuestions.length, ...updateUserQn)
      // enable the next button
      nextBtn.disabled = false
      //  save to local storage
      storeQuizData()
    }
  })
  const storeQuizData = () => {
    localStorage.setItem('quizData', JSON.stringify(quizQuestions))
  }

  const loadQuizData = () => {
    const storedQuizData = localStorage.getItem('quizData')
    if (storedQuizData) {
      const parsedQuizData = JSON.parse(storedQuizData)
      // update the quizQuestions array
      return quizQuestions.splice(0, quizQuestions.length, ...parsedQuizData)
    }
  }

  const updateQuizQuestion = (id, userAnswer) => {
    const updateUserQn = quizQuestions.map(qn => {
      if (qn.id === id) {
        return {
          ...qn,
          user_answer: userAnswer
        }
      }
      return qn
    })
  }
  handleNextBrn()
  nextBtn.addEventListener('click', handleNextBrn)
}
