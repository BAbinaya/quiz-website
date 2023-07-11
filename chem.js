const questions =[
    {
        question:"The most commonly used bleaching agent is:",
        answers :[
        
            {text :"alcohol", correct:false},
            {text :"chlorine", correct:true},
            {text :"sodium chloride", correct:false},
            {text :"carbon dioxide", correct:false}
        ]
    },
    {
        question:"When a helium atom loses an electron it becomes:",
        answers :[
        
            {text :"an alpha particle", correct:false},
            {text :"a proton", correct:false},
            {text :"a positive helium ion", correct:true},
            {text :"a negative helium ion", correct:false}
        ] 
    },
    {
        question:"The purest form of iron is:",
        answers :[
        
            {text :"Cast iron", correct:false},
            {text :"Steel", correct:false},
            {text :"Pig iron", correct:false},
            {text :"Wrought iron", correct:true}
        ] 
    },
    {
        question:"Combustion is a:",
        answers :[
        
            {text :"physical and chemical process", correct:false},
            {text :"biological process", correct:false},
            {text :"physical process", correct:false},
            {text :"chemical process", correct:true}
        ] 
    },
    {
        question:"Which of the following is not a form of carbon?",
        answers :[
        
            {text :"Soot", correct:false},
            {text :"Hematite", correct:true},
            {text :"Graphite", correct:false},
            {text :"Charcoal", correct:false}
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
    nextButton.style.display = "block";

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
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();

    }else{
        startQuiz();
    }
})



startQuiz();