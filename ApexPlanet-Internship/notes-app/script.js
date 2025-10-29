const form = document.getElementById('noteForm');
const input = document.getElementById('noteInput');
const list = document.getElementById('noteList');
const KEY = 'notes_storage';
let notes = JSON.parse(localStorage.getItem(KEY)) || [];

function save() {
  localStorage.setItem(KEY, JSON.stringify(notes));
}

function render() {
  list.innerHTML = '';
  notes.forEach((n, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${n.text}</span> <button data-i="${i}" class="delete">❌</button>`;
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  notes.push({ text });
  input.value = '';
  save();
  render();
});

list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const i = e.target.dataset.i;
    notes.splice(i, 1);
    save();
    render();
  }
});

render();
