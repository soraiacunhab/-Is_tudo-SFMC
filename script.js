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

// Configuração dos botões de navegação
document.getElementById("start-quiz").addEventListener("click", () => {
    showScreen("menu");
});

document.getElementById("start-quiz-certification").addEventListener("click", () => {
    showScreen("question-selection");
});

// Navegação entre telas
function showScreen(screen) {
    document.querySelectorAll('div').forEach(div => div.style.display = 'none');
    document.getElementById(screen + '-screen').style.display = 'block';
}

// Iniciar quiz com seleção de número de perguntas
document.getElementById("quiz-10").addEventListener("click", () => startQuiz(10));
document.getElementById("quiz-25").addEventListener("click", () => startQuiz(25));

// Função para iniciar o quiz
function startQuiz(numQuestions) {
    currentQuestionIndex = 0;
    score = 0;
    showScreen("quiz");
    loadQuestion(numQuestions);
}

// Função para carregar perguntas
function loadQuestion(numQuestions) {
    if (currentQuestionIndex < questions.length) {
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
}

// Verificar resposta e carregar próxima pergunta
function checkAnswer(selectedAnswer, correctAnswer, numQuestions) {
    if (selectedAnswer === correctAnswer) score++;
    currentQuestionIndex++;

    if (currentQuestionIndex < numQuestions && currentQuestionIndex < questions.length) {
        loadQuestion(numQuestions);
    } else {
        showResult(numQuestions);
    }
}

// Exibir resultado final
function showResult(numQuestions) {
    showScreen("result");
    document.getElementById("score").textContent = `Você acertou ${score} de ${numQuestions} perguntas.`;
}

// Configuração do botão de reinício
document.getElementById("retry-quiz").addEventListener("click", () => startQuiz(10));
document.getElementById("retry-25").addEventListener("click", () => startQuiz(25));
