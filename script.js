import questions from './question.js';

let currentQuestionIndex = 0;
let score = 0; // Variável para armazenar a pontuação
let erros = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateScore() {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `Pontuação: ${score.toFixed(2)}`; // Atualiza a pontuação na tela
}

function loadQuestion() {
  const themeElement = document.getElementById('theme');
  const questionElement = document.getElementById("question");
  const statementsElement = document.getElementById("statements");
  const optionsElement = document.getElementById("options");
  const feedbackElement = document.getElementById("feedback");

  // Limpa feedback e opções anteriores
  feedbackElement.textContent = "";
  optionsElement.innerHTML = "";
  statementsElement.innerHTML = ""; // Limpa as afirmações anteriores

  // Atualiza a pontuação na tela
  updateScore();

  // Carrega a pergunta atual
  const currentQuestion = questions[currentQuestionIndex];
  themeElement.textContent = currentQuestion.theme;
  questionElement.textContent = currentQuestion.question;

  // Exibe as afirmações (statements)
  currentQuestion.statements.forEach((statement, index) => {
    const statementElement = document.createElement("p");
    statementElement.textContent = `${String.fromCharCode(65 + index)}. ${statement}`;
    statementsElement.appendChild(statementElement);
  });

  // Cria opções com ordem aleatória
  const options = [...currentQuestion.options];
  shuffleArray(options);

  options.forEach((option, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option, currentQuestion);
    li.appendChild(button);
    optionsElement.appendChild(li);
  });
}

function checkAnswer(selectedOption, currentQuestion) {
  const feedbackElement = document.getElementById("feedback");

  if (selectedOption === currentQuestion.options[currentQuestion.correct]) {
    feedbackElement.textContent = "Você acertou!";
    feedbackElement.style.color = "green";

    score += 2; // Adiciona 2 pontos ao acertar
  } else {
    feedbackElement.textContent = "Você errou. Tente novamente.";
    feedbackElement.style.color = "red";
    erros++;
    score -= 0.66; // Subtrai 0,66 pontos ao errar
  }

  // Atualiza a pontuação na tela
  updateScore();

  // Avança para a próxima pergunta ou finaliza o quiz
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setTimeout(loadQuestion, 1000);
  } else {
    setTimeout(() => {
      document.getElementById("quiz").innerHTML = `
        <h2>Parabéns! Você completou o quiz.</h2>
        <p>Sua pontuação final foi: ${score.toFixed(2)}</p>
        <p>Você errou: ${erros} questões</p>
        <p>Você acertou: ${questions.length - erros} questões</p>
      `;
    }, 1000);
  }
}

// Adiciona um elemento para exibir a pontuação
document.addEventListener("DOMContentLoaded", () => {
  const scoreElement = document.createElement("div");
  scoreElement.id = "score";
  scoreElement.style.fontSize = "18px";
  scoreElement.style.marginBottom = "10px";
  document.getElementById("quiz").prepend(scoreElement);
  updateScore(); // Inicializa a pontuação como 0
});

// Inicializa o quiz
loadQuestion();
