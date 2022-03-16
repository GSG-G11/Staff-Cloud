const createJobBtn = document.querySelector('.create-job-btn');
const form = document.querySelector('form');

createJobBtn.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector('.error') ? document.querySelector('.error').remove() : null;
    const title = document.querySelector('[name="title"]').value;
    const description = document.querySelector('textarea[name="description"]').value;
    const salary = document.querySelector('input[name="salary"]').value;

    const errorMessages = [];

    if(!title) {
        errorMessages.push('Title is required');
    } if(!description) {
        errorMessages.push('Description is required');
    } if(!salary) {
        errorMessages.push('Salary is required');
    }

    if(errorMessages.length > 0) {
        const div = document.createElement('div');
        div.classList.add('error');
        form.appendChild(div);
        errorMessages.forEach(message => {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = message;
            div.appendChild(errorMessage);

        });
    }
})
