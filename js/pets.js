const API = 'http://localhost:3000';

window.onload = function() {
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  if (!user) {
    window.location.href = 'login.html';
  }
};

function addPet() {
  const name = document.getElementById('petName').value.trim();
  const type = document.getElementById('petType').value;
  const age  = document.getElementById('petAge').value.trim();

  if (!name || !type || !age) {
    showMessage('Please fill in all fields.', 'error');
    return;
  }

  const user = JSON.parse(localStorage.getItem('loggedUser'));

  const newPet = {
    name: name,
    type: type,
    age: age,
    userId: user.id
  };

  fetch(API + '/pets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPet)
  })
  .then(response => response.json())
  .then(() => {
    showMessage('Pet saved! Going back to dashboard...', 'success');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  });
}

function goBack() {
  window.location.href = 'dashboard.html';
}

function showMessage(text, type) {
  const msg = document.getElementById('message');
  msg.textContent = text;
  msg.className = 'message ' + type;
  msg.style.display = 'block';
}