const questions =[
    {
        question:"Aflatoxins are produced by:",
        answers :[
        
            {text :"bacteria", correct:false},
            {text :"fungi", correct:true},
            {text :"viruses", correct:false},
            {text :"algae", correct:false}
        ]
    },
    {
        question:"Which of the following is biodegradable?",
        answers :[
        
            {text :"Leather belts", correct:true},
            {text :"Silver foil", correct:false},
            {text :"Iron nails", correct:false},
            {text :"Plastic mugs", correct:false}
        ] 
    },
    {
        question:"Which one of these animals is jawless?",
        answers :[
        
            {text :"Shark", correct:false},
            {text :"Myxine", correct:true},
            {text :"Trygon", correct:false},
            {text :"Sphyrna", correct:false}
        ] 
    },
    {
        question:"Photoperiodism affects:",
        answers :[
        
            {text :"Vegetative growth", correct:false},
            {text :"Fruiting", correct:false},
            {text :"Flowering", correct:false},
            {text :"All of these", correct:true}
        ] 
    },
    {
        question:"Pink mould is the common name for:",
        answers :[
        
            {text :"Aspergillus", correct:false},
            {text :"Rhizopus", correct:false},
            {text :"Neurospora", correct:true},
            {text :"Mucor", correct:false}
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
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();

    }else{
        startQuiz();
    }
})



startQuiz();