const API = 'http://localhost:3000';

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    showMessage('Please fill in all fields.', 'error');
    return;
  }

  fetch(API + '/users')
    .then(response => response.json())
    .then(users => {
      const found = users.find(u => u.username === username && u.password === password);
      if (found) {
        localStorage.setItem('loggedUser', JSON.stringify(found));
        window.location.href = 'dashboard.html';
      } else {
        showMessage('Wrong username or password.', 'error');
      }
    });
}

function goToRegister() {
  window.location.href = 'register.html';
}

function register() {
  const fullname = document.getElementById('fullname').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirm  = document.getElementById('confirm').value.trim();

  if (!fullname || !username || !password || !confirm) {
    showMessage('Please fill in all fields.', 'error');
    return;
  }

  if (password !== confirm) {
    showMessage('Passwords do not match.', 'error');
    return;
  }

  fetch(API + '/users')
    .then(response => response.json())
    .then(users => {
      const exists = users.find(u => u.username === username);
      if (exists) {
        showMessage('Username already taken. Choose another.', 'error');
        return;
      }

      const newUser = { fullname, username, password };

      fetch(API + '/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      })
      .then(response => response.json())
      .then(() => {
        showMessage('Account created! Taking you to login...', 'success');
        setTimeout(() => { window.location.href = 'login.html'; }, 2000);
      });
    });
}

function goToLogin() {
  window.location.href = 'login.html';
}

function showMessage(text, type) {
  const msg = document.getElementById('message');
  msg.textContent = text;
  msg.className = 'message ' + type;
  msg.style.display = 'block';
}