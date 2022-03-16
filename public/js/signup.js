const nameUser = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const address = document.querySelector('#address');
const errorName = document.querySelector('.error-name');
const errorEmail = document.querySelector('.error-email');
const errorPassword = document.querySelector('.error-password');
const errorAddress = document.querySelector('.error-address');

const signupBtn = document.querySelector('#sign-up');
signupBtn.addEventListener('click', () => {
  if (nameUser.value === '') {
    errorName.textContent = 'name must not empty';
  } else if (email.value === '') {
    errorName.textContent = '';
    errorEmail.textContent = 'email must not empty';
  } else if (email.value.split('@').length !== 2) {
    errorName.textContent = '';
    errorEmail.textContent = 'please enter valid email like this aaa@hotmail.com';
  } else if (password.value === '') {
    errorName.textContent = '';
    errorEmail.textContent = '';
    errorPassword.textContent = 'password must not empty';
  } else if (password.value.length < 8) {
    errorName.textContent = '';
    errorEmail.textContent = '';
    errorPassword.textContent = 'password length at least 8 char';
  } else if (
    !password.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  ) {
    errorName.textContent = '';
    errorEmail.textContent = '';
    errorPassword.textContent = 'Must at least contain one number,lowercase letter, uppercase letter and spical character';
  } else if (address.value === '') {
    errorName.textContent = '';
    errorEmail.textContent = '';
    errorPassword.textContent = '';
    errorAddress.textContent = 'address must not empty';
  } else {
    errorAddress.textContent = '';
    const obj = {
      name: nameUser.value,
      email: email.value,
      password: password.value,
      address: address.value,
    };
    fetch('/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.massege === 'This user exists') {
          // eslint-disable-next-line no-undef
          swal('Not Accept email', data.massege, 'error');
        } else {
          // eslint-disable-next-line no-undef
          swal('Added!', `${data.massege} you can now to login`, 'success');
        }
      })
      .catch((err) => console.log(err));
  }
});
