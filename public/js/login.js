const form = document.getElementById('form');
const loginBtn = document.querySelector('.login-form-btn');

loginBtn.addEventListener('click', e => {
  e.preventDefault();
  const email = document.querySelector('.email-input').value;
  const password = document.querySelector('.password-input').value;

  const errorMessages = [];

  if (email.trim() === '') {
    errorMessages.push('Email is required');
  }

  if (!email.includes('@')) {
    errorMessages.push('Email is invalid');
  }

  if (password.trim() === '') {
    errorMessages.push('Password is required');
  }

  if (
    !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  ) {
    errorMessages.push(
      'Password must contain at least one number, one lowercase and one uppercase letter and one special charcater, and at least 8 characters long'
    );
  }

  if (errorMessages.length > 0) {
    e.preventDefault();
    const errorContainer = document.querySelector('.error-container');
    errorContainer.innerHTML = '';
    errorMessages.forEach(errorMessage => {
      const error = document.createElement('p');
      error.classList.add('error-message');
      error.innerHTML = errorMessage;
      errorContainer.appendChild(error);
    });
  } else {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(res => {
        if (res.status === 404) {
          const error = document.createElement('p');
          error.classList.add('error-message');
          error.innerHTML = 'User not found';
          const errorContainer = document.querySelector('.error-container');
          errorContainer.innerHTML = '';
          errorContainer.appendChild(error);
        } else if (res.status === 400) {
          const error = document.createElement('p');
          error.classList.add('error-message');
          error.innerHTML = 'Invalid Email or Password';
          const errorContainer = document.querySelector('.error-container');
          errorContainer.innerHTML = '';
          errorContainer.appendChild(error);
        } else {
          res.json().then(data => {
            window.location.href = '/';
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
});
