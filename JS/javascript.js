let currentQuestion = {rightAnswer: -1}
let answerButtons = [];
var score = 0;

window.addEventListener('load',init);

function init () {
    setQuestion();
}

function timeOut(q, c = false) {
    if (c) {
        document.getElementById("question").innerHTML = 'Correct!';
    }else{
        document.getElementById("question").innerHTML = 'Wrong! The right answer was ' + q.answers[q.rightAnswer] + '.';
    }
        
    // Remove old buttons
    for (i = 0; i < answerButtons.length; i++) {
        let parent = document.getElementsByTagName("BODY")[0]; 
        parent.removeChild(answerButtons[i]);
    }
        
    answerButtons = [];

    setTimeout(setQuestion, 1500);         
}

function setQuestion () {
    if (questions.length) {
        // Getting a random index
        let index = Math.round(Math.random() * (questions.length - 1));
        
        let question = questions[index];
        currentQuestion = question;
    
        // Set the question
        document.getElementById("question").innerHTML = question.question;

        // Create new buttons
        for (i = 0; i < question.answers.length; i++) {
            let btn = document.createElement("BUTTON");       
            let t = document.createTextNode(question.answers[i]);       
            btn.appendChild(t);                                
            document.body.appendChild(btn);

            answerButtons[i] = btn;

            if (i == question.rightAnswer) {
                btn.onclick = function () {
                    if (questions.length) {
                        score++;
                        document.getElementById("score").innerHTML = 'Score: ' + score;
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
            let parent = document.getElementsByTagName("BODY")[0]; 
            parent.removeChild(answerButtons[i]);
        }

        document.getElementById("question").innerHTML = 'End of the quiz!';

        document.getElementById("score").innerHTML = 'You scored ' + score + ' points! Reload the page to try again.';
        
    }
}
