const jokeText = document.getElementById('joke');
const newJokeBtn = document.getElementById('newJoke');

async function loadJoke() {
  jokeText.textContent = 'Loading...';
  try {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await res.json();
    jokeText.textContent = `${data.setup} — ${data.punchline}`;
  } catch (err) {
    jokeText.textContent = '⚠️ Could not load a joke.';
    console.error(err);
  }
}

newJokeBtn.addEventListener('click', loadJoke);
loadJoke(); // load once on page load
