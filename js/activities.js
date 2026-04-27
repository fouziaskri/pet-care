const API = 'http://localhost:3000';
let currentPet = null;
let activityToDelete = null;

window.onload = function() {
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  if (!user) { window.location.href = 'login.html'; return; }

  const petId = localStorage.getItem('selectedPetId');
  if (!petId) { window.location.href = 'dashboard.html'; return; }

  fetch(API + '/pets/' + petId)
    .then(r => r.json())
    .then(pet => {
      currentPet = pet;
      const icons = { Dog:'🐶', Cat:'🐱', Bird:'🐦', Rabbit:'🐰', Fish:'🐟', Other:'🐾' };
      document.getElementById('bannerAvatar').textContent = icons[pet.type] || '🐾';
      document.getElementById('petName').textContent = pet.name;
      document.getElementById('petInfo').textContent = pet.type + '  ·  Age: ' + pet.age;
      loadActivities(pet.id);
    });

  const now = new Date();
  const local = new Date(now - now.getTimezoneOffset() * 60000);
  document.getElementById('activityDate').value = local.toISOString().slice(0, 16);
};

function addActivity() {
  const type = document.getElementById('activityType').value;
  const note = document.getElementById('activityNote').value.trim();
  const date = document.getElementById('activityDate').value;

  if (!type || !date) { showMessage('Please select activity type and date.', 'error'); return; }

  fetch(API + '/activities', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ petId: currentPet.id, type, note, date })
  })
  .then(r => r.json())
  .then(() => {
    showMessage('Activity saved! ✅', 'success');
    document.getElementById('activityType').value = '';
    document.getElementById('activityNote').value = '';
    loadActivities(currentPet.id);
  });
}

const activityIcons = {
  feeding:'🍽️', walking:'🚶', medicine:'💊', grooming:'✂️',
  vet:'🏥', vaccination:'💉', bath:'🛁', nailcut:'💅',
  training:'🎓', playtime:'🎾', sleep:'😴', water:'💧',
  weight:'⚖️', other:'📝'
};

function loadActivities(petId) {
  fetch(API + '/activities?petId=' + petId)
    .then(r => r.json())
    .then(activities => {
      const list = document.getElementById('activitiesList');
      if (activities.length === 0) {
        list.innerHTML = '<div class="empty-state"><span class="empty-icon">📋</span><p>No activities yet. Add the first one above!</p></div>';
        return;
      }
      activities.reverse();
      list.innerHTML = '';
      activities.forEach(activity => {
        const card = document.createElement('div');
        card.className = 'activity-card';
        const dateObj = new Date(activity.date);
        const dateStr = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        const icon = activityIcons[activity.type] || '📝';
        card.innerHTML = `
          <div class="activity-left">
            <span class="badge badge-${activity.type}">${icon} ${activity.type}</span>
            <div class="activity-note">${activity.note || 'No note'}</div>
          </div>
          <div style="display:flex;align-items:center;gap:12px">
            <div class="activity-date">${dateStr}</div>
            <button class="btn btn-danger btn-sm" onclick="openActConfirm('${activity.id}')">🗑️</button>
          </div>
        `;
        list.appendChild(card);
      });
    });
}

function openActConfirm(id) {
  activityToDelete = id;
  document.getElementById('confirmActModal').style.display = 'flex';
}

function closeActConfirm() { document.getElementById('confirmActModal').style.display = 'none'; }

function confirmDeleteActivity() {
  fetch(API + '/activities/' + activityToDelete, { method: 'DELETE' })
    .then(() => {
      closeActConfirm();
      loadActivities(currentPet.id);
    });
}

function showMessage(text, type) {
  const msg = document.getElementById('message');
  msg.textContent = text;
  msg.className = 'message ' + type;
  msg.style.display = 'block';
  setTimeout(() => { msg.style.display = 'none'; }, 3000);
}