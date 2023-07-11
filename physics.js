const questions =[
    {
        question:"The different colours of stars are due to the variation of:",
        answers :[
        
            {text :"density", correct:false},
            {text :"temperature", correct:true},
            {text :"pressure", correct:false},
            {text :"radiation", correct:false}
        ]
    },
    {
        question:"A simple microscope consists of",
        answers :[
        
            {text :"a short focus convex lens", correct:true},
            {text :"a long focus convex lens", correct:false},
            {text :"a long focus concavelens", correct:false},
            {text :"a short focus concave lens", correct:false}
        ] 
    },
    { 
        question:"Which of the following produces more severe burns",
        answers :[
        
            {text :"Boiling water", correct:false},
            {text :"Hot water", correct:false},
            {text :"Steam", correct:true},
            {text :"Melting iceberg", correct:false}
        ] 
    },
    {
        question:"What material is used to make electric heater coil?",
        answers :[
        
            {text :"Copper", correct:false},
            {text :"Iron", correct:false},
            {text :"Silver", correct:false},
            {text :"Nichrome", correct:true}
        ] 
    },
    {
        question:"The device which converts AC to DC is:",
        answers :[
        
            {text :"Oscillator", correct:false},
            {text :"Rectifier", correct:true},
            {text :"Amplifier", correct:false},
            {text :"None of these", correct:false}
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
    document.getElementById("motives").innerHTML=""
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
    button.disabled= true;

  });
  nextButton.style.display= "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Try again";
    nextButton.style.display="block";
    clearInterval(time)

    
    if(score==5){
        document.getElementById("motives").innerHTML="Your hardwork paid off !"
        document.getElementById("badges").innerHTML="You've received a golden badge !"
    }
    else if(score==4){
        document.getElementById("motives").innerHTML="Good work champ !"
        document.getElementById("badges").innerHTML="You've received a silver badge !"
    }
    else if(score==3){
        document.getElementById("motives").innerHTML="That's not bad !"
        document.getElementById("badges").innerHTML="You've received a bronze badge !"
    }
    else if(score==2){
        document.getElementById("motives").innerHTML="You barely passed !"
    }
    else if(score==1){
        document.getElementById("motives").innerHTML="Uh oh ! You failed."
    }
    else if(score==1){
        document.getElementById("motives").innerHTML="Let's try that one more time"
    }

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
        document.getElementById("motives").innerHTML="";
        document.getElementById("badges").innerHTML="";
        document.getElementById("badge").innerHTML="";
    }
})


var sec = 15;
var time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('timer').innerHTML =sec+ " seconds";
    sec--;
    if (sec == -1) {
        showScore();
       var time=document.getElementById("Timer");
      
        clearInterval(time);
        
    }

}

nextButton.addEventListener("click",resetTimer);
answerButtons.addEventListener("click",freeze)
function freeze(){
    clearInterval(time);
}
function resetTimer() {
    
    clearInterval(time);
    sec = 15;
    document.getElementById('timer').innerHTML = sec + " seconds";
    time = setInterval(myTimer, 1000); // Restart the timer
  
  }

startQuiz();
