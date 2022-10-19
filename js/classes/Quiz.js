class Quiz {
    isStarted = false;
    currentQuestionIndex = 0;
    questions = [];
    rightAnswers = 0;

    controlBtn = document.getElementById('btn-control');
    questionEl = document.getElementById('question');
    answersEl = document.getElementById('answers');
    rightAnswersEl = document.getElementById('right-answers');


    constructor(questions) {
        this.questions = questions;
        this.controlBtn.addEventListener('click', this.handleControlBtn.bind(this));
    }

    handleControlBtn() {
        if (!this.isStarted) {
            this.isStarted = true;
            this.rightAnswersEl.innerText = '';
            this.rightAnswers = 0;
            this.controlBtn.setAttribute('disabled', 'disabled');
            this.renderQuestion();
        } else {
            this.currentQuestionIndex++;
            this.renderQuestion();
        }
    }

    clearQuestions() {
        if (this.questionEl && this.answersEl) {
            this.questionEl.innerText = '';
            this.answersEl.innerText = '';
        }
    }

    renderQuestion() {
        if(!this.questions[this.currentQuestionIndex]) {
            this.renderStats();
        } else {
            this.clearQuestions();
            this.questionEl.innerHTML = `<h3>${this.questions[this.currentQuestionIndex].question}</h3>`;
            this.renderAnswers();
        }
    }

    renderAnswers() {
        const answersEls = this.questions[this.currentQuestionIndex].answers
            .map((answer, index) => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.innerHTML = `${answer}`;
                li.addEventListener('click', () => {
                    this.userAnswer.call(this, index);
                })
                return li;
            });
        for (const answerEl of answersEls) {
            this.answersEl.appendChild(answerEl);
        }
    }

    userAnswer(answerIndex) {
        if (this.questions[this.currentQuestionIndex] && this.questions[this.currentQuestionIndex].rightAnswerIndex === answerIndex) {
            this.rightAnswers++;
        }

        if(this.currentQuestionIndex < this.questions.length) {
            this.currentQuestionIndex++;
            this.controlBtn.setAttribute('disabled', 'disabled');
        }
        this.renderQuestion();
    }

    renderStats() {
        this.clearQuestions();
        this.rightAnswersEl.innerText = `Right answers: ${this.rightAnswers}`;
        this.isStarted = false;
        this.controlBtn.removeAttribute('disabled');
        this.currentQuestionIndex = 0;
    }
}

export default Quiz;
