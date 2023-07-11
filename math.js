const questions =[
    {
        question:"Which is the highest common factor of the numbers 30 and 132?",
        answers :[
        
            {text :"6", correct:true},
            {text :"8", correct:false},
            {text :"2", correct:false},
            {text :"5", correct:false}
        ]
    },
    {
        question:"What is the next in the following number series: 256,289,324,361...",
        answers :[
        
            {text :"378", correct:false},
            {text :"478", correct:false},
            {text :"400", correct:true},
            {text :"420", correct:false}
        ] 
    },
    {
        question:"What is the value of Pi to four individual decimal places?",
        answers :[
        
            {text :"3.1416", correct:true},
            {text :"3.1425", correct:false},
            {text :"3.1415", correct:false},
            {text :"3.1427", correct:false}
        ] 
    },
    {
        question:"What does 6 raise to the power of 0 equal?",
        answers :[
        
            {text :"0", correct:false},
            {text :"6", correct:false},
            {text :"-1", correct:false},
            {text :"1", correct:true}
        ] 
    },
    {
        question:"How many vertices are present in a cube?",
        answers :[
        
            {text :"6", correct:false},
            {text :"8", correct:true},
            {text :"12", correct:false},
            {text :"16", correct:false}
        ] 
    },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerbuttons");
const nextButton = document.getElementById("nextbtn");

let currentQuestionIndex = 0;
let score=0;

function startQuiz()
{
 currentQuestionIndex=0;
 score=0;
 nextButton.innerHTML="Next"
 showQuestion();
}
function showQuestion(){
    resetState(); 
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
 
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
        button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct=="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
  Array.from(answerButtons.children).forEach(button=>{
    if(button.dataset.correct==="true"){
    button.classList.add("correct");
    } 
    button.disabled=true;

  });
  nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Try again";
    nextButton.style.display="block";

}

 function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
       showScore();
    }
 }
nextButton.addEventListener("click",function(){
    if(currentQuestionIndex < questions.length){
        handleNextButton();

    }else{
        startQuiz();
    }
})



startQuiz();