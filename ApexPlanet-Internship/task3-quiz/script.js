const quizBox = document.getElementById('quiz-box');
const nextBtn = document.getElementById('nextBtn');
const result = document.getElementById('result');

const quizData = [
  { q: 'What does HTML stand for?', 
    a: ['HyperText Markup Language','HighText Machine Language','HyperTool Multi Language'],
    correct: 0 },
  { q: 'Which symbol is used for comments in CSS?', 
    a: ['//','/* comment */','#'],
    correct: 1 },
  { q: 'JavaScript is used for?', 
    a: ['Styling','Structure','Interactivity'],
    correct: 2 }
];

let index = 0, score = 0;

function loadQuestion() {
  const item = quizData[index];
  quizBox.innerHTML = `
    <h2>${item.q}</h2>
    ${item.a.map((opt,i)=>`<label>
      <input type="radio" name="option" value="${i}"> ${opt}
    </label><br>`).join('')}
  `;
}

nextBtn.addEventListener('click', () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) return alert('Please select an answer!');
  if (Number(selected.value) === quizData[index].correct) score++;
  index++;
  if (index < quizData.length) {
    loadQuestion();
  } else {
    quizBox.innerHTML = `<h2>Quiz Completed!</h2>`;
    result.textContent = `✅ Your Score: ${score}/${quizData.length}`;
    nextBtn.disabled = true;
  }
});

loadQuestion();
