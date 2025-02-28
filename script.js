// Sample Jeopardy data for Uzbek primary students
let categories = [
  {
    name: "Ona tili",
    questions: [
      { question: "'Bola' so‘zining ko‘plik shakli qanday?", answer: "Bolalar", value: 100 },
      { question: "'Maktab' so‘zida nechta unli harf bor?", answer: "2 ta", value: 200 },
      { question: " 'Yozuvchi' so‘zining sinonimi nima?", answer: "Adib", value: 300 },
      { question: "'Jahl' so‘zining zid ma'nosi nima?", answer: "Sabrlik", value: 400 },
      { question: "Quyidagi jumlada qanday xatolik bor? \n 'Qushlar osmonda uchayotganlar.'", answer: 'Uchayotganlar so‘zi noto‘g‘ri, to‘g‘ri shakli uchmoqda.', value: 500 }
    ]
  },
  {
    name: "Matematika",
    questions: [
      { question: "5 + 3  nechchi?", answer: "8", value: 100 },
      { question: "10 dan 4 ni ayirsak, nechchi qoladi?", answer: "6", value: 200 },
      { question: "3x + 5 = 11 tenglamani yeching.", answer: "2", value: 300 },
      { question: "Uchburchakning ichki burchaklari yig‘indisi nechaga teng?", answer: "180", value: 400 },
      { question: "72 sonining nechta bo‘luvchisi bor?", answer: "12 ta", value: 500 }
    ]
  },
  {
    name: "Musiqa",
    questions: [
      { question: "'Doira' qaysi xalq cholg‘u asbobi?", answer: "O‘zbek", value: 100 },
      { question: "'Alla' qanday qo‘shiq turi?", answer: "Bolalar uxlatish qo‘shig‘i", value: 200 },
      { question: " 5 ta nota nomini sanab bering.", answer: "Do, re, mi, fa, sol, lya, si", value: 300 },
      { question: " Musiqada 'pp' belgisi qanday talaffuz qilinadi va nimani anglatadi?", answer: "'Pianissimo' – juda past ovozda ijro etish", value: 400 },
      { question: "Garmoniya deganda nimani tushunasiz?", answer: "Turli tovushlarning uyg‘unligi, ohanglar kombinatsiyasi", value: 500 }
    ]
  },
  {
    name: "Mantiqiy Savollar",
    questions: [
      { question: " 3 ta olmani 3 ta bolaga teng taqsimlash kerak. Har bir bola bitta olma oladi, lekin bitta olma savatda qoladi. Bu qanday bo‘lishi mumkin?", answer: "Oxirgi bola olmani savat bilan oldi.", value: 100 },
      { question: "Bir kishi bitta qizil qalam va bitta ko‘k qalam sotib oldi. U qaysi qalam bilan yozadi?", answer: " Qalam bilan emas, ruchka bilan yozadi.", value: 200 },
      { question: "Agar bitta jiyda daraxtidan yiliga 50 kg meva olsa bo‘lsa, 4 ta daraxtdan 3 yilda necha kg meva olish mumkin?", answer: " 600 kg (50 × 4 × 3)", value: 300 },
      { question: "Bir kishining 4 ta o‘g‘li bor, har bir o‘g‘ilning yana 1 ta singlisi bor. Jami nechta farzand bor?", answer: "5 ta (4 o‘g‘il va 1 ta singlisi)", value: 400 },
      { question: "Bir odam restoranga kirdi va choy, shakar va non sotib oldi. U 100 000 so‘m to‘ladi. Choy 40 000 so‘m, non 20 000 so‘m. Shakar qancha turadi?", answer: "40 000 so‘m (100 000 - (40 000 + 20 000))", value: 500 }
    ]
  },
  {
    name: "O'qish",
    questions: [
      { question: "'Zumrad va Qimmat' ertagida kim yaxshi qiz edi?", answer: "Zumrad", value: 100 },
      { question: "'Bo‘ri va echkicha' ertagida echkicha bolalariga nima deb aytgan?", answer: "Hech kimga eshikni ochmang!", value: 200 },
      { question: "'Alpomish' dostoni qaysi adabiy janrga mansub?", answer: "Qahramonlik dostoni", value: 300 },
      { question: "Qaysi ertak qahramoni yulduzli ko‘ylak kiygan?", answer: "Malikai Oyjamol", value: 400 },
      { question: "O‘zbek xalq ertaklarida doimo uchraydigan uchta qahramon turini sanang.", answer: "Botir, dono chol, ayyor tulki", value: 500 }
    ]
  }
];

// Team scores
let teamScores = [0, 0, 0];
let currentQuestionValue = 0; // Stores the value of the current question
let activeQuestion = null; // Tracks the currently active question

// Function to create the Jeopardy board
function createBoard() {
  const board = document.getElementById("jeopardy-board");
  board.innerHTML = ""; // Clear the board before recreating it

  categories.forEach((category, catIndex) => {
    // Create category container
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category";
    categoryDiv.innerHTML = `<h2>${category.name}</h2>`;
    board.appendChild(categoryDiv);

    // Add questions
    category.questions.forEach((question, quesIndex) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "question";
      questionDiv.textContent = `$${question.value}`;
      questionDiv.dataset.catIndex = catIndex;
      questionDiv.dataset.quesIndex = quesIndex;
      questionDiv.addEventListener("click", handleQuestionClick);
      categoryDiv.appendChild(questionDiv);
    });
  });
}

// Function to handle question clicks
function handleQuestionClick(event) {
  if (activeQuestion !== null || event.target.classList.contains("used")) return; // Prevent clicking other questions or used questions

  const catIndex = event.target.dataset.catIndex;
  const quesIndex = event.target.dataset.quesIndex;
  const question = categories[catIndex].questions[quesIndex];

  // Show the question
  event.target.textContent = question.question;
  event.target.classList.add("revealed");
  activeQuestion = event.target; // Set the active question
  currentQuestionValue = question.value; // Store the question value

  // Disable all other questions
  document.querySelectorAll(".question").forEach((q) => {
    if (q !== event.target) q.classList.add("disabled");
  });

  // Show the question in the pop-up
  showQuestionPopup(question.question, question.answer);
}

// Function to show the question in the pop-up
function showQuestionPopup(question, answer) {
  const popup = document.getElementById("answer-popup");
  const questionText = document.getElementById("question-text");
  const answerText = document.getElementById("answer-text");
  const answerSection = document.getElementById("answer-section");
  const revealButton = document.getElementById("reveal-answer-button");

  questionText.textContent = question;
  answerText.textContent = answer;
  answerSection.style.display = "none"; // Hide the answer section initially
  revealButton.style.display = "block"; // Show the "Reveal Answer" button
  popup.style.display = "flex";

  // Add event listener to the "Reveal Answer" button
  revealButton.onclick = () => {
    answerSection.style.display = "block"; // Show the answer section
    revealButton.style.display = "none"; // Hide the "Reveal Answer" button
  };
}

// Function to mark the answer as correct
document.getElementById("correct-button").addEventListener("click", () => {
  markAnswer(true);
});

// Function to mark the answer as incorrect
document.getElementById("incorrect-button").addEventListener("click", () => {
  markAnswer(false);
});

// Function to mark the answer and update the board
function markAnswer(isCorrect) {
  if (activeQuestion) {
    activeQuestion.textContent = `$${currentQuestionValue}`;
    activeQuestion.classList.remove("revealed");
    activeQuestion.classList.add(isCorrect ? "correct" : "incorrect");
    activeQuestion.classList.add("used"); // Mark the question as used
    activeQuestion.removeEventListener("click", handleQuestionClick);

    // Re-enable all questions
    document.querySelectorAll(".question").forEach((q) => q.classList.remove("disabled"));
    activeQuestion = null; // Reset the active question
  }

  // Close the pop-up
  document.getElementById("answer-popup").style.display = "none";
}

// Function to add points to a team
function addPoints(teamIndex) {
  teamScores[teamIndex] += currentQuestionValue;
  updateScores();
}

// Function to subtract points from a team
function subtractPoints(teamIndex) {
  teamScores[teamIndex] -= currentQuestionValue;
  updateScores();
}

// Function to update team scores
function updateScores() {
  document.querySelectorAll(".team .score").forEach((score, index) => {
    score.textContent = teamScores[index];
  });
}

// Function to reset the game
function resetGame() {
  const board = document.getElementById("jeopardy-board");
  board.innerHTML = "";
  teamScores = [0, 0, 0];
  currentQuestionValue = 0;
  activeQuestion = null;
  updateScores();
  createBoard();
}

// Function to open the edit modal
document.getElementById("edit-button").addEventListener("click", () => {
  document.getElementById("edit-modal").style.display = "flex";
});

// Function to close the edit modal
document.getElementById("close-edit-modal").addEventListener("click", () => {
  document.getElementById("edit-modal").style.display = "none";
});

// Function to save a new or edited question
document.getElementById("save-question").addEventListener("click", () => {
  const categoryIndex = parseInt(document.getElementById("category").value);
  const question = document.getElementById("question").value;
  const answer = document.getElementById("answer").value;
  const value = parseInt(document.getElementById("value").value);

  if (question && answer && value) {
    const category = categories[categoryIndex];

    // Check if a question with the same value already exists
    const existingQuestionIndex = category.questions.findIndex(
      (q) => q.value === value
    );

    if (existingQuestionIndex !== -1) {
      // Replace the existing question
      category.questions[existingQuestionIndex] = { question, answer, value };
    } else {
      // Add the new question
      category.questions.push({ question, answer, value });
    }

    // Reset the form
    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";
    document.getElementById("value").value = "";

    // Update the board
    resetGame();
  } else {
    alert("Iltimos, barcha maydonlarni to'ldiring!");
  }
});

// Initialize the board
createBoard();

// Add reset button functionality
document.getElementById("reset-button").addEventListener("click", resetGame);