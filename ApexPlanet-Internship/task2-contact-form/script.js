const form = document.getElementById('contactForm');
const status = document.getElementById('status');

// Email validation regex
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', (e) => {
  e.preventDefault(); // stop actual form submission
  status.textContent = '';
  status.style.color = 'crimson';

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // 1️⃣ Check empty fields
  if (!name || !email || !message) {
    status.textContent = '⚠️ Please fill all required fields.';
    return;
  }

  // 2️⃣ Check email format
  if (!isValidEmail(email)) {
    status.textContent = '📧 Please enter a valid email address.';
    return;
  }

  // 3️⃣ If all good
  status.style.color = 'green';
  status.textContent = '✅ Message sent successfully (Example only).';
  form.reset();
});
