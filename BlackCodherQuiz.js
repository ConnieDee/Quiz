const startButton = document.getElementById('start-bttn')
const nextButton = document.getElementById('next-bttn')
const questionContainerElement = document.getElementById
('question-container')
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionsIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionsIndex++
    setNextQuestion()
})

function startGame() {
    console.log('started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionsIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionsIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('bttn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild
        (answerButtonElement.firstChild)
    }
}

function selectAnswer(e) {
   const selectedButton = e.target
   const correct =  selectedButton.dataset.correct
   setStatusClass(document.body, correct)
   Array.from(answerButtonElement.children).forEach(button => {
       setStatusClass(button, button.dataset.correct)
   })
   if (shuffledQuestions.length > currentQuestionsIndex + 1) {
     nextButton.classList.remove('hide')  
   } else {
       startButton.innerText = 'Restart'
       startButton.classList.remove('hide')
   }
   
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [

{
    question: 'What is Descartes best known for?',
    answers: [
        {text: 'a: Philosophy', correct: false }, 
        {text: 'b: Mathematics', correct: false }, 
        {text: 'c: Both', correct: true}
    ]
},
{   
    question: 'Finish this quote ‘Cogito, ergo…….’',
    answers: [
        {text: 'a: "…solvam (pay)"', correct: false},
        {text: 'b: "…sum (am)"', correct: true},
        {text: 'c: "…sciam (know)"', correct: false},
        {text: 'd: "…vocare (call)"', correct: false}
    ]
},
{   
    question: 'What does ‘Cogito, ergo sum’ translate too?',
    answers: [
        {text: 'a: "‘I think, therefore I live.’"', correct: false},
        {text: 'b: "‘I think, therefore I understand.’"', correct: false},
        {text: 'c: "‘I think, therefore I am.’"', correct: true},
        {text: 'd: "‘I think, therefore I know."', correct: false},
    ]
},
{   question: 'In Descartes ‘Discourse on Methods’ did he doubt the connection between?',
    answers: [
        {text: 'a: "Mind and Body"', correct: true},
        {text: 'b: "Soul and Mind"', correct: false},
        {text: 'c: "Heart and Head"', correct: false},
        {text: 'd: "Soul and Heart"', correct: false}, 
    ]
} ]