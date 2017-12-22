let questions = [];
let answerButtons = [];

questions[0] = {
    question: 'Is this a question?',
    rightAnswer: 0,
    answers: [
        'yes',
        'no',
    ]
}

questions[1] = {
    question: 'What is a quiz',
    rightAnswer: 1,
    answers: [
        'something lol',
        'idk',
    ]
}

questions[2] = {
    question: 'What is the meaning of life',
    rightAnswer: 1,
    answers: [
        'to eat prawns',
        'idk',
        'to make js quizes',
    ]
}

function setQuestion () {
    // Getting a random index
    let index = Math.round(Math.random() * (questions.length - 1));

    let question = questions[index];

    // Set the question
    document.getElementById("question").innerHTML = question.question;

    // Remove old buttons
    for (i = 0; i < answerButtons.length; i++) {
        console.log(i);
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

        btn.onclick = setQuestion;
        btn.className = 'answer';
    }

    // Get rid of question so we don't repeat it
    questions.splice(index,1);
}
