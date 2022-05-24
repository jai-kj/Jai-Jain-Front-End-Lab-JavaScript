/*  
    Create Quiz class
    @param => Questions(array of objects)
    @init  => score =  0
           => questionIndex = 0
*/
class Quiz {
    constructor(questions) {
        this.questions = questions
        this.score = 0
        this.questionIndex = 0
    }
}

/*  
    Create Question class
    @param => text(Question Description)
           => choices(answer choices)
           => answer(correct choice)
*/
class Question {
    constructor(text, choices, answer) {
        this.text = text
        this.choices = choices
        this.answer = answer
    }
}

// Questions => Array of Question class objects
const questions = [
    new Question(
        "Which of the following is not an OOP principle?",
        ["Abstraction", "Encapsulation", "Embedding", "Inheritance"],
        "Embedding"
    ),
    new Question(
        "What is the full form of XML?",
        [
            "Expensive Markup Language",
            "Extendible Markup Language",
            "Expressive Markup Language",
            "Extensible Markup Language",
        ],
        "Extensible Markup Language"
    ),
    new Question(
        "Inside which HTML element do we put the Javascript code?",
        ["section", "script", "link", "meta"],
        "script"
    ),
    new Question(
        "React is a javascript _________ .",
        ["library", "framework", "package", "class"],
        "library"
    ),
    new Question(
        "What will be the value of a if\nvar a = (2, 5 - 1) * 2",
        ["undefined", "2", "4", "8"],
        "8"
    ),
]

/*  
    Class method to return question is anwered correctly
    @param => choice (String)
*/
Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice
}

// Class method to get the Question object by its array index
Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex]
}

/*      
    Class method to check the correct answer of a Question object in the quiz
    @param => answer (String)
*/
Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) this.score++
    this.questionIndex++
}

/*
    Class method to find if quiz has ended or not
*/
Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length
}

// function to update question number in the footer
const showProgress = () => {
    const currentQuestion = `Question ${quiz.questionIndex + 1} of ${
        questions.length
    }`
    const progress = document.getElementById("progress")
    progress.innerHTML = currentQuestion
}

// function to display scores once quiz is completed
const showScores = () => {
    const gameResult = `<h1>Result</h1><h2 id="score">Your score: ${
        quiz.score
    } / ${questions.length} & <br>Overall correct percentage: ${(
        (quiz.score / questions.length) *
        100
    ).toFixed(2)}%</h2>`
    const quizElement = document.getElementById("quiz")
    quizElement.innerHTML = gameResult
}

/*
    function to handle and update DOM on choice select
    @param choice => mcq text (String)
    @param index => mcq index (int)
*/
const handleChoiceSelect = (choice, index) => {
    let choiceButton = document.getElementById(`btn${index}`)
    choiceButton.onclick = () => {
        quiz.checkOptionWithAnswer(choice)
        loadQuestions()
    }
}

// function to load questions into HTML
const loadQuestions = () => {
    if (quiz.isEnded()) return showScores()

    // Get current question
    const question = quiz.getQuestionByIndex()

    const questionText = document.getElementById("question")
    questionText.innerHTML = question.text

    // display choices
    const choices = question.choices
    choices.forEach((choice, index) => {
        let currentChoice = document.getElementById(`choice${index}`)
        currentChoice.innerHTML = choice

        // choice button event handler
        handleChoiceSelect(choice, index)
    })

    // update queston progess
    showProgress()
}

// Create the quiz object
const quiz = new Quiz(questions)

// Start the Quiz on DOM load
loadQuestions()
