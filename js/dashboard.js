const API = 'http://localhost:3000';
let petToDelete = null;
let editingPetId = null;

window.onload = function() {
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  if (!user) { window.location.href = 'login.html'; return; }
  document.getElementById('navUsername').textContent = 'Hi, ' + user.fullname + ' 👋';
  loadStats(user.id);
  loadPets(user.id);
};

function loadStats(userId) {
  fetch(API + '/pets')
    .then(r => r.json())
    .then(pets => {
      const myPets = pets.filter(p => String(p.userId) === String(userId));
      document.getElementById('totalPets').textContent = myPets.length;
      fetch(API + '/activities')
        .then(r => r.json())
        .then(acts => {
          const ids = myPets.map(p => String(p.id));
          const mine = acts.filter(a => ids.includes(String(a.petId)));
          document.getElementById('totalActivities').textContent = mine.length;
          document.getElementById('totalFeeding').textContent = mine.filter(a => a.type === 'feeding').length;
          document.getElementById('totalWalking').textContent  = mine.filter(a => a.type === 'walking').length;
        });
    });
}

const icons   = { Dog:'🐶', Cat:'🐱', Bird:'🐦', Rabbit:'🐰', Fish:'🐟', Other:'🐾' };
const classes = { Dog:'dog', Cat:'cat', Bird:'bird', Rabbit:'rabbit', Fish:'fish', Other:'other' };

function loadPets(userId) {
  fetch(API + '/pets')
    .then(r => r.json())
    .then(pets => {
      const myPets = pets.filter(p => String(p.userId) === String(userId));
      const list = document.getElementById('petsList');
      if (myPets.length === 0) {
        list.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
          <span class="empty-icon">🐾</span>
          <p>No pets yet! Add your first pet.</p>
          <button class="btn btn-primary" style="width:auto;padding:12px 28px" onclick="goToAddPet()">+ Add My First Pet</button>
        </div>`;
        return;
      }
      list.innerHTML = '';
      myPets.forEach(pet => {
        const icon = icons[pet.type] || '🐾';
        const cls  = classes[pet.type] || 'other';
        const card = document.createElement('div');
        card.className = 'pet-card';
        card.innerHTML = `
          <div class="pet-avatar ${cls}">${icon}</div>
          <h3>${pet.name}</h3>
          <p class="pet-type">${pet.type}</p>
          <span class="pet-tag">Age: ${pet.age}</span>
          <div class="pet-card-actions">
            <button class="btn btn-primary btn-sm" onclick="viewPet('${pet.id}')">🐾 Activities</button>
            <button class="btn btn-warning btn-sm" onclick="openEdit('${pet.id}','${pet.name}','${pet.type}','${pet.age}')">✏️</button>
            <button class="btn btn-danger btn-sm" onclick="openConfirm('${pet.id}')">🗑️</button>
          </div>
        `;
        list.appendChild(card);
      });
    });
}

// ── VIEW ──
function viewPet(petId) {
  localStorage.setItem('selectedPetId', petId);
  window.location.href = 'activities.html';
}

function goToAddPet() { window.location.href = 'add-pet.html'; }

// ── EDIT ──
function openEdit(id, name, type, age) {
  editingPetId = id;
  document.getElementById('editName').value = name;
  document.getElementById('editType').value = type;
  document.getElementById('editAge').value  = age;
  document.getElementById('editModal').style.display = 'flex';
}

function closeEdit() { document.getElementById('editModal').style.display = 'none'; }

function saveEdit() {
  const name = document.getElementById('editName').value.trim();
  const type = document.getElementById('editType').value;
  const age  = document.getElementById('editAge').value;
  if (!name || !type || !age) return;

  fetch(API + '/pets/' + editingPetId, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, type, age })
  })
  .then(() => {
    closeEdit();
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    loadPets(user.id);
  });
}

// ── DELETE PET ──
function openConfirm(petId) {
  petToDelete = petId;
  document.getElementById('confirmModal').style.display = 'flex';
}

function closeConfirm() { document.getElementById('confirmModal').style.display = 'none'; }

function confirmDeletePet() {
  // First delete all activities of this pet
  fetch(API + '/activities?petId=' + petToDelete)
    .then(r => r.json())
    .then(acts => {
      const deletes = acts.map(a => fetch(API + '/activities/' + a.id, { method: 'DELETE' }));
      Promise.all(deletes).then(() => {
        fetch(API + '/pets/' + petToDelete, { method: 'DELETE' })
          .then(() => {
            closeConfirm();
            const user = JSON.parse(localStorage.getItem('loggedUser'));
            loadStats(user.id);
            loadPets(user.id);
          });
      });
    });
}

function logout() {
  localStorage.removeItem('loggedUser');
  window.location.href = 'login.html';
}