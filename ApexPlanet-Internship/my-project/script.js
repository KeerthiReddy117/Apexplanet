// Show the current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Add alert button interactivity
document.getElementById('alertBtn').addEventListener('click', () => {
  alert('Hello! 👋 This alert is triggered by JavaScript.');
});
