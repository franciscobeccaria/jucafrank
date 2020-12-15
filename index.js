// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: 'AIzaSyA-xQH2gBIpnQn1eQAoKCUHxr_9vGa5Pj4',
  authDomain: 'jucafrank-2.firebaseapp.com',
  projectId: 'jucafrank-2',
  storageBucket: 'jucafrank-2.appspot.com',
  messagingSenderId: '970469758633',
  appId: '1:970469758633:web:2afdaea9bf8758280bbbb8',
  measurementId: 'G-7Z940T77G9',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToastMessage(message) {
  // Get the snackbar DIV
  var x = document.getElementById('snackbar');
  x.innerHTML = '';
  x.innerHTML = message;
  // Add the "show" class to DIV
  x.className = 'show';

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace('show', '');
  }, 3000);
}

document.getElementById('nav-icon').addEventListener('click', () => {
  document.getElementById('nav-container').style.top = '0';
});

document.getElementById('nav-close').addEventListener('click', () => {
  document.getElementById('nav-container').style.top = '-100vh';
});

if (document.getElementById('contact-btn')) {
  document.getElementById('contact-btn').addEventListener('click', () => {
    window.location.pathname = '/contact.html';
  });
}

if (document.getElementById('contact-send')) {
  document.getElementById('contact-send').addEventListener('click', () => {
    const nameValue = document.getElementById('contact-name').value.trim();
    const emailValue = document.getElementById('contact-email').value.trim();
    const topicValue = document.getElementById('contact-topic').value.trim();
    const messageValue = document.getElementById('contact-message').value.trim();
    const dateValue = Date.now();
    if (nameValue !== '' || emailValue !== '' || messageValue !== '') {
      if (emailIsValid(emailValue)) {
        db.collection('messages')
          .add({
            name: nameValue,
            email: emailValue,
            topic: topicValue,
            message: messageValue,
            date: dateValue,
          })
          .then(function (docRef) {
            console.log('Document written with ID: ', docRef.id);
            showToastMessage('Mensaje enviado');
          })
          .catch(function (error) {
            console.error('Error adding document: ', error);
            showToastMessage('Error en el envío del mensaje');
          });
        document.getElementById('contact-name').value = '';
        document.getElementById('contact-email').value = '';
        document.getElementById('contact-topic').value = '';
        document.getElementById('contact-message').value = '';
      } else {
        showToastMessage('Email invalido');
      }
    } else {
      showToastMessage('Asegurate de completar todos los campos');
    }
  });
}
