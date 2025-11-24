const displayQuiz = (qnId, fetchQnItem, quizContainer) => {
  const { id, options, question, correct_answer, user_answer } = fetchQnItem
  quizContainer.innerHTML = ''
  const qnHead = document.createElement('h4')
  qnHead.textContent = question
  const answerDiv = document.createElement('ul')
  answerDiv.className = 'quiz-options'
  options?.forEach(ans => {
    const newLi = document.createElement('li')
    newLi.textContent = ans
    answerDiv.appendChild(newLi)
  })
  quizContainer.appendChild(qnHead)
  quizContainer.appendChild(answerDiv)
}
export { displayQuiz }
