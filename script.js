const questions = [{
    question: "Which type of JavaScript language is" ,
    answers : [
        {text: "Object-Oriented" ,correct:"false"},
        {text: "Object-Based" ,correct:"true"},
        {text: "Assembly-language" ,correct:"false"},
        {text:"High-level"  , correct:"false"},
    ]
},
{
    question: "Which one of the following also known as Conditional Expression:" ,
    answers : [
        {text: "Alternative to if-else" ,correct:"false"},
        {text: "Switch statement" ,correct:"false"},
        {text: "If-then-else statement" ,correct:"false"},
        {text:"immediate if"  , correct:"true"},
    ]
},
{
    question: "In JavaScript, what is a block of statement?" ,
    answers : [
        {text: "Conditional block" ,correct:"false"},
        {text: "block that combines a number of statements into a single compound statement" ,correct:"true"},
        {text: "both conditional block and a single statement" ,correct:"false"},
        {text:"block that contains a single statement"  , correct:"false"},
    ]
},
{
    question: "When interpreter encounters an empty statements, what it will do:" ,
    answers : [
        {text: "Shows a warning" ,correct:"false"},
        {text: "Prompts to complete the statement" ,correct:"false"},
        {text: "Throws an error" ,correct:"false"},
        {text:"Ignores the statements"  , correct:"true"},
    ]
},
]
const answerButtons= document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-button");
const questionElement = document.getElementById("question");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML= "Next";
    showQuestion();
}

function showQuestion(){
    //to remove the previous answers from DOM screen
    resetState();
    //code to display questions:
    let currentQuestion = questions[currentQuestionIndex];
    let currentQuestionNo = currentQuestionIndex + 1 ;
    questionElement.innerHTML = currentQuestionNo + "." + currentQuestion.question ;

    //code to display answer buttons:
    currentQuestion.answers.forEach(answer => {
      
        const button = document.createElement("button");
        button.innerHTML = answer.text ;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
      }
        button.addEventListener("click",selectAnswer);
    })
}
//this function we are writing to give red and green background colours to our wrong and right answers respectively.
function selectAnswer(e){
    const selectedBtn = e.target ;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add ("correct");
        score++ ;
    }else{
        selectedBtn.classList.add ("incorrect");
    }
    //answer buttons taken input in form of array
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextBtn.style.display= "block";
}
//this function to resetState when next button is clicked or a new question appears
function resetState(){
    nextBtn.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
//ending of quiz app
function showScore(){
    resetState();
    questionElement.innerHTML = `your score is ${score} out of ${questions.length} `
    nextBtn.innerHTML = "Play again!";
    nextBtn.style.display = "block";
}
//function to make nextbutton working
function handleNextButton(){
currentQuestionIndex++ ;
if(currentQuestionIndex < questions.length){
    showQuestion();
}else{
    showScore();
}
}



nextBtn.addEventListener("click" , () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();

    }
})
startQuiz();
