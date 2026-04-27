const translations = {
  en: {
    tagline: "Take care of your furry friends",
    welcomeBack: "Welcome back!",
    createAccountTitle: "Create Account",
    username: "Username",
    password: "Password",
    fullName: "Full Name",
    confirmPassword: "Confirm Password",
    loginBtn: "Login",
    createAccount: "Create new account",
    registerBtn: "Create Account",
    backToLogin: "Already have an account",
    logout: "Logout",
    myPets: "My Pets",
    activities: "Activities",
    feedings: "Feedings",
    walks: "Walks",
    addPet: "+ Add Pet",
    editPet: "Edit Pet",
    petName: "Pet Name",
    petType: "Pet Type",
    age: "Age (years)",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    confirmDelete: "Are you sure you want to delete this pet and all its activities?",
    yesDelete: "Yes, Delete",
    addNewPet: "Add a New Pet",
    savePet: "Save Pet",
    backToDashboard: "← Dashboard",
    addActivity: "Add New Activity",
    activityType: "Activity Type",
    notes: "Notes",
    dateTime: "Date & Time",
    saveActivity: "Save Activity",
    activityHistory: "Activity History",
    confirmDeleteActivity: "Delete this activity?",

    // Pet types
    petDog: "🐶 Dog",
    petCat: "🐱 Cat",
    petBird: "🐦 Bird",
    petRabbit: "🐰 Rabbit",
    petFish: "🐟 Fish",
    petOther: "🐾 Other",

    // Activity types
    actSelect: "-- Select --",
    actFeeding: "🍽️ Feeding",
    actWalking: "🚶 Walking",
    actMedicine: "💊 Medicine",
    actGrooming: "✂️ Grooming",
    actVet: "🏥 Vet Visit",
    actVaccination: "💉 Vaccination",
    actBath: "🛁 Bath",
    actNailcut: "💅 Nail Cutting",
    actTraining: "🎓 Training",
    actPlaytime: "🎾 Play Time",
    actSleep: "😴 Sleep",
    actWater: "💧 Water",
    actWeight: "⚖️ Weight Check",
    actOther: "📝 Other",
  },
  tr: {
    tagline: "Evcil hayvanlarınıza bakın",
    welcomeBack: "Tekrar hoşgeldiniz!",
    createAccountTitle: "Hesap Oluştur",
    username: "Kullanıcı Adı",
    password: "Şifre",
    fullName: "Ad Soyad",
    confirmPassword: "Şifreyi Onayla",
    loginBtn: "Giriş Yap",
    createAccount: "Yeni hesap oluştur",
    registerBtn: "Hesap Oluştur",
    backToLogin: "Zaten hesabım var",
    logout: "Çıkış",
    myPets: "Evcil Hayvanlarım",
    activities: "Aktiviteler",
    feedings: "Beslemeler",
    walks: "Yürüyüşler",
    addPet: "+ Hayvan Ekle",
    editPet: "Hayvanı Düzenle",
    petName: "Hayvan Adı",
    petType: "Hayvan Türü",
    age: "Yaş",
    cancel: "İptal",
    saveChanges: "Değişiklikleri Kaydet",
    confirmDelete: "Bu hayvanı ve tüm aktivitelerini silmek istediğinize emin misiniz?",
    yesDelete: "Evet, Sil",
    addNewPet: "Yeni Hayvan Ekle",
    savePet: "Hayvanı Kaydet",
    backToDashboard: "← Panele Dön",
    addActivity: "Yeni Aktivite Ekle",
    activityType: "Aktivite Türü",
    notes: "Notlar",
    dateTime: "Tarih & Saat",
    saveActivity: "Aktiviteyi Kaydet",
    activityHistory: "Aktivite Geçmişi",
    confirmDeleteActivity: "Bu aktiviteyi sil?",

    // Pet types
    petDog: "🐶 Köpek",
    petCat: "🐱 Kedi",
    petBird: "🐦 Kuş",
    petRabbit: "🐰 Tavşan",
    petFish: "🐟 Balık",
    petOther: "🐾 Diğer",

    // Activity types
    actSelect: "-- Seçiniz --",
    actFeeding: "🍽️ Besleme",
    actWalking: "🚶 Yürüyüş",
    actMedicine: "💊 İlaç",
    actGrooming: "✂️ Tımar",
    actVet: "🏥 Veteriner",
    actVaccination: "💉 Aşı",
    actBath: "🛁 Banyo",
    actNailcut: "💅 Tırnak Kesimi",
    actTraining: "🎓 Eğitim",
    actPlaytime: "🎾 Oyun Zamanı",
    actSleep: "😴 Uyku",
    actWater: "💧 Su",
    actWeight: "⚖️ Kilo Kontrolü",
    actOther: "📝 Diğer",
  }
};

function setLang(lang) {
  localStorage.setItem('lang', lang);

  // Translate all text elements
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });

  // Translate placeholders
  document.querySelectorAll('[data-placeholder]').forEach(el => {
    const key = el.getAttribute('data-placeholder');
    if (translations[lang][key]) el.placeholder = translations[lang][key];
  });

  // Translate select option text using data-key on <option>
  document.querySelectorAll('option[data-key]').forEach(opt => {
    const key = opt.getAttribute('data-key');
    if (translations[lang][key]) opt.textContent = translations[lang][key];
  });

  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === lang.toUpperCase());
  });
}

// Auto-apply on page load
(function() {
  const saved = localStorage.getItem('lang') || 'en';
  setLang(saved);
})();