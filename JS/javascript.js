let currentQuestion = {rightAnswer: -1}
let answerButtons = [];
var score = 0;

function setQuestion () {
    if (questions.length) {
        // Getting a random index
        let index = Math.round(Math.random() * (questions.length - 1));
        
        let question = questions[index];
        currentQuestion = question;
    
        // Set the question
        document.getElementById("question").innerHTML = question.question;
    
        // Remove old buttons
        for (i = 0; i < answerButtons.length; i++) {
            let parent = document.getElementsByTagName("BODY")[0]; 
            parent.removeChild(answerButtons[i]);
        }

        answerButtons = [];

        // Create new buttons
        for (i = 0; i < question.answers.length; i++) {
            let btn = document.createElement("BUTTON");       
            let t = document.createTextNode(question.answers[i]);       
            btn.appendChild(t);                                
            document.body.appendChild(btn);

            answerButtons[i] = btn;

            if (i == question.rightAnswer) {
                let old = setQuestion;   

                btn.onclick = function () {
                    if (questions.length) {
                        score++;
                        document.getElementById("score").innerHTML = 'score: ' + score;
                    }

                    setQuestion();
                };  
            }else{
                btn.onclick = setQuestion;            
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
    }
}
