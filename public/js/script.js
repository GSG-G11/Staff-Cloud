
/* eslint-disable linebreak-style */

const regBtn = document.querySelector('.regBtn');
const loginBtn = document.querySelector('.loginBtn');
const logoutBtn = document.querySelector('.logoutBtn');
const jobsSection = document.querySelector('.jobs');

const createForm = () => {
  const createJob = document.querySelector('.create-job');
  createJob.style.display = 'block';
  const formJob = document.createElement('form');
  formJob.id = 'form';
  formJob.classList = 'form-control';

  const firstRow = document.createElement('div');
  firstRow.classList = 'row';
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.classList = 'input-control';
  titleInput.name = 'title';
  titleInput.placeholder = 'Title';
  const salaryInput = document.createElement('input');
  salaryInput.type = 'text';
  salaryInput.classList = 'input-control';
  salaryInput.name = 'salary';
  salaryInput.placeholder = 'Salary';
  firstRow.append(titleInput, salaryInput);

  const secondRow = document.createElement('div');
  secondRow.classList = 'row';
  const textArea = document.createElement('textarea');
  textArea.name = 'description';
  textArea.cols = '30';
  textArea.rows = '10';
  textArea.placeholder = 'More about the job..';

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Add a job';
  submitBtn.classList = 'btn create-job-btn';
  submitBtn.type = 'click';

  secondRow.appendChild(textArea);
  formJob.append(firstRow, secondRow, submitBtn);
  createJob.appendChild(formJob);
  addPost();
};

fetch('/login/user')
  .then((res) => res.json())
  .then((data) => {

    if (data.meg == 'yes there have user') {
      regBtn.style.display = 'none';
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'block';
      createForm();
    }
  })
  .catch((err) => console.log(err));

async function getJobs() {
  jobsSection.innerHTML = '';
  await fetch('/posts').then((res) => res.json()).then(({ posts }) => {
    posts.forEach(async (post) => {
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

      const userName = (await getUserName(post.user_id)).name;
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

      fetch('/login/user').then((res) => res.json()).then((data) => data.id).then((id) => {
        if (id == post.user_id) {
          const deleteButton = document.createElement('button');
          deleteButton.classList.add('delete-btn');
          deleteButton.textContent = 'x';
          jobCard.appendChild(deleteButton);
          deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            fetch(`/post/${post.id}`, {
              method: 'DELETE',
            }).then((res) => {
              e.target.parentElement.remove();
              if (res.status === 204) {
                swal('Deleted!', 'Your post has been deleted.', 'success');
                getJobs();
              }
            });
          });
        }
      })
        .catch((err) => console.log(err));
    });
  });
}
async function getUserName(post_id) {
  const userName = await fetch(`/users/posts/${post_id}`).then((res) => res.json()).then(({ id, name }) => ({ id, name }));

  return userName;
}

getJobs();

const addPost = () => {
  const createJobBtn = document.querySelector('.create-job-btn');
  const form = document.querySelector('form');
  createJobBtn.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector('.error') ? document.querySelector('.error').remove() : null;
    const title = document.querySelector('[name="title"]').value;
    const description = document.querySelector('textarea[name="description"]').value;
    const salary = document.querySelector('input[name="salary"]').value;

    const errorMessages = [];

    if (!title) {
      errorMessages.push('Title is required');
    } if (!description) {
      errorMessages.push('Description is required');
    } if (!salary) {
      errorMessages.push('Salary is required');
    }

    if (errorMessages.length > 0) {
      const div = document.createElement('div');
      div.classList.add('error');
      form.appendChild(div);
      errorMessages.forEach((message) => {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = message;
        div.appendChild(errorMessage);
      });
    }
    const data = {
      title,
      description,
      salary,
    };
    fetch('/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Post successfully added') {
          swal('Added!', data.message, 'success');
          getJobs();
        }
      })
      .catch((err) => console.log(err));
  });
};


fetch('/username')
  .then((res) => res.json())
  .then((data) => {
    if (data.name) {
      const user = document.querySelector('.userName');
      user.textContent = data.name;
    }
  })
  .catch((err) => console.log(err));
