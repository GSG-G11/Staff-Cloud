const createJobBtn = document.querySelector('.create-job-btn');
const form = document.querySelector('form');
const jobsSection = document.querySelector('.jobs');

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





async function getJobs() {
    await fetch('/posts').then(res=> res.json()).then(  ({posts}) => {
        posts.forEach(async post => {
            
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');
            jobsSection.appendChild(jobCard);

            const jobTitle = document.createElement('p');
            jobTitle.classList.add('job-title');
            jobTitle.textContent = post.title;
            jobCard.appendChild(jobTitle);

            const row = document.createElement('div');
            row.classList.add('row');
            jobCard.appendChild(row);

            const userName = await getUserName(post.user_id)
            const createdBy = document.createElement('p');
            createdBy.classList.add('user-created');
            createdBy.textContent = `Created by:${userName}`;
            const createdAt = document.createElement('span');
            createdAt.classList.add('date-created');
            createdAt.textContent = `Created at: ${post.created_at.slice(0, 10)}`;
            row.appendChild(createdBy);
            row.appendChild(createdAt);

            const jobDescription = document.createElement('p');
            jobDescription.classList.add('job-desc');
            jobDescription.textContent = post.description;
            jobCard.appendChild(jobDescription);

            const jobSalary = document.createElement('p');
            jobSalary.classList.add('job-salary');
            jobSalary.textContent = `Salary: ${post.salary}$`;
            jobCard.appendChild(jobSalary);
        })
    })

}

async function getUserName(id) {
    const userName = await fetch(`/users/posts/${id}`).then(res=> res.json()).then(({name}) => name)

    return userName;
}


getJobs();
