let currentQuestion = {rightAnswer: -1}
let answerButtons = [];
let score = 0;

let scoreObject;
let containerObject;
let questionObject;

window.addEventListener('load',init);

function init () {
    scoreObject     = document.getElementById("score");
    questionObject  = document.getElementById("question");
    containerObject = document.getElementById("container");

    setToStartScreen();
}

function timeOut(q, c = false) {
    if (c) {
        questionObject.innerHTML = 'Correct!';
    }else{
        questionObject.innerHTML = 'Wrong! The right answer was ' + q.answers[q.rightAnswer] + '.';
    }
        
    // Remove old buttons
    for (i = 0; i < answerButtons.length; i++) { 
        containerObject.removeChild(answerButtons[i]);
    }
        
    answerButtons = [];

    setTimeout(setQuestion, 1500);         
}

function setToStartScreen () {
    questionObject.innerHTML    = 'Welcome to this quiz. Click \'start\' to begin';
    scoreObject.innerHTML       = 'START';
    scoreObject.style.cursor    = 'pointer';
    // VISIBILITY scoreObject.style.visibility = 'visible';

    scoreObject.onclick = function () {
        this.innerHTML      = 'Score: ' + score;
        this.onclick        = null;
        this.style.cursor   = 'default';
        // VISIBILITY this.style.visibility = 'hidden';

        setQuestion();
    }
}

function setQuestion () {
    if (questions.length) {
        // Getting a random index
        let index       = Math.round(Math.random() * (questions.length - 1));
        let question    = questions[index];
        currentQuestion = question;
    
        // Set the question
        questionObject.innerHTML = question.question;

        // Create new buttons
        for (i = 0; i < question.answers.length; i++) {
            let btn = document.createElement("BUTTON");       
            let t   = document.createTextNode(question.answers[i]);       
            btn.appendChild(t);                                
            containerObject.appendChild(btn);

            answerButtons[i] = btn;

            if (i == question.rightAnswer) {
                btn.onclick = function () {
                    if (questions.length) {
                        score++;
                        scoreObject.innerHTML = 'Score: ' + score;
                    }
                    
                    timeOut(question, true);
                };  
            }else{
                btn.onclick = function() {
                    timeOut(question);
                }        
            }

            btn.className = 'answer';
        }

        // Get rid of question so we don't repeat it
        questions.splice(index,1);
    }else{
        // Remove old buttons
        for (i = 0; i < answerButtons.length; i++) {
            containerObject.removeChild(answerButtons[i]);
        }

        questionObject.innerHTML = 'End of the quiz!';

        // VISIBILITY scoreObject.style.visibility = 'visible';
        
        scoreObject.innerHTML = 'You scored ' + score + ' points! Click here to try again.';
        scoreObject.style.cursor = 'pointer';
        scoreObject.onclick = function () {
            location.reload();
        }
        
    }
}
