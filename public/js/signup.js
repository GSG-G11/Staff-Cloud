const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const address = document.querySelector('#address');
const errorName = document.querySelector('.error-name');
const errorEmail = document.querySelector('.error-email');
const errorPassword = document.querySelector('.error-password');
const errorAddress = document.querySelector('.error-address');

const signupBtn = document.querySelector('#sign-up');
const containsUppercase = (text) => {
    for (let i = 0; i < text.length; i += 1) {
      if (
        isNaN(text.charAt(i)) && text.charAt(i) === text.charAt(i).toUpperCase()
      ) {
        return true;
      }
    }
    return false;
};
const containsNumber = (text) => {
    for (let i = 0; i < text.length; i += 1) {
      if (!isNaN(text.charAt(i)) && !(text.charAt(i) === ' ')) {
        return true;
      }
  }
  return false;
};
signupBtn.addEventListener('click',()=> {
    if (name.value == '' ) {
        errorName.textContent = 'name must not empty';
    }
    else if (email.value == '') {
        errorName.textContent = '';
        errorEmail.textContent = 'email must not empty';
    }
    else if (email.value.split('@').length != 2) {
        errorName.textContent = '';
        errorEmail.textContent = 'please enter valid email like this aaa@hotmail.com';
    }
    else if (password.value == '') {
        errorName.textContent = '';
        errorEmail.textContent = '';
        errorPassword.textContent = 'password must not empty';
    }
    else if (password.value.length < 6 ) {
        errorName.textContent = '';
        errorEmail.textContent = '';
        errorPassword.textContent = 'password length at least 6 char';
    }
    else if (!containsUppercase(password.value) || !containsNumber(password.value)) {
        errorName.textContent = '';
        errorEmail.textContent = '';
        errorPassword.textContent = 'Must at least contain one number and uppercase letter';
    }
    else if (address.value == '') {
        errorName.textContent = '';
        errorEmail.textContent = '';
        errorPassword.textContent = '';
        errorAddress.textContent = 'address must not empty';
    }
    else {
      const obj = {
        name :name.value,
        email : email.value,
        password : password.value,
        address : address.value,
      }
      fetch('/signup', {
        method :'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
      .then(res => res.json())
      .then(data => {
        swal("Added!", data.massege+ ' you now to login', "success");
      } 
      )
      .catch(err => console.log(err))
    }
});

