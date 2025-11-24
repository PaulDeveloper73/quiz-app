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

      // TODO update the quiz question and add to local storage and also get from local storage when the app load
      // quizQuestions = updateQnObject(id, userAnswer)
      // console.log(quizQuestions[id]) //
    }
  })

  const updateQnObject = (id, userAnswer) => {
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
