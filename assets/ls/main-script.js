import quizQuestions from './quiz-questions.js'
import { displayQuiz } from './display-quiz.js'
// import { handleOptionSelect } from './handle-option-select.js'
// import { handleSubmit } from './handle-submit.js'
// import { displayResults } from './display-results.js'
// Initialize quiz

document.addEventListener('DOMContentLoaded', () => {
  // Additional initialization code can go here
  initApp()
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
    qnId++
  }
  handleNextBrn()
  nextBtn.addEventListener('click', handleNextBrn)
}
