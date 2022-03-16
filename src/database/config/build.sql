BEGIN;

DROP TABLE IF EXISTS users, posts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  address TEXT
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  salary VARCHAR(55) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO users (name, email, password, address) VALUES ('John Doe', 'John@Doe.com', 'Admin@123', 'Gaza Street'), ('Jane Doe', 'Jane@Doe.com', 'Admin@123', 'Palestine Street'), ('Joe Doe', 'Jae@Doe.com', 'Admin@123', 'Rafah Street');

INSERT INTO posts (title, description, salary, user_id) VALUES ('Hiring Now', 'Software Developer', '20000', 1), ('Hiring Now', 'Techincal Recuriter', '30000', 2), ('Hiring Now', 'Software Engineer', '40000', 3);


COMMIT;