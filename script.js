// Variáveis para controle de fluxo
let currentScreen = "welcome";
let score = 0;
let currentQuestionIndex = 0;
let questions = [];
let words = [];

// Carregar perguntas do JSON (atualizado para o link Raw do GitHub)
fetch('https://raw.githubusercontent.com/soraiacunhab/-Is_tudo-SFMC/1f513fe81d05307a911860a2e7b6dad05d1a298a/questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data.questions;
  })
  .catch(error => {
    console.error("Erro ao carregar perguntas:", error);
  });

// Carregar palavras do JSON (atualizado para o link Raw do GitHub)
fetch('https://raw.githubusercontent.com/soraiacunhab/-Is_tudo-SFMC/1f513fe81d05307a911860a2e7b6dad05d1a298a/words.json')
  .then(response => response.json())
  .then(data => {
    words = data.words;
  })
  .catch(error => {
    console.error("Erro ao carregar palavras:", error);
  });

document.getElementById("start-quiz").addEventListener("click", () => {
    showScreen("menu");
});

document.getElementById("start-quiz-certification").addEventListener("click", () => {
    showScreen("question-selection");
});

function showScreen(screen) {
    document.querySelectorAll('div').forEach(div => div.style.display = 'none');
    document.getElementById(screen + '-screen').style.display = 'block';
}

document.getElementById("quiz-10").addEventListener("click", () => startQuiz(10));
document.getElementById("quiz-25").addEventListener("click", () => startQuiz(25));

function startQuiz(numQuestions) {
    currentQuestionIndex = 0;
    score = 0;
    showScreen("quiz");
    loadQuestion(numQuestions);
}

function loadQuestion(numQuestions) {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-container").textContent = question.question;
    const options = document.getElementById("answer-options");
    options.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, question.correctAnswer, numQuestions));
        options.appendChild(button);
    });
}

function checkAnswer(selectedAnswer, correctAnswer, numQuestions) {
    if (selectedAnswer === correctAnswer) score++;
    currentQuestionIndex++;
    if (currentQuestionIndex < numQuestions) {
        loadQuestion(numQuestions);
    } else {
        showResult();
    }
}

function showResult() {
    showScreen("result");
    document.getElementById("score").textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
}
