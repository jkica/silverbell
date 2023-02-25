# silverbell
silverbell test task

The project consists of both backend and frontend in the same repository.

# To run the backend project:
- navigate to /backend folder
- create the .env file and fill it according to .env.example (port is 3001, allowed origin is the address frontend is served on)
- type "npm install"
- then type "node app.js"
(this requires you to have nodejs installed locally)

# To run the frontend project:
- navigate to /frontend folder
- type "npm install"
- type "npm run start" (the project will be automatically opened in port 3000)

# To set up the database:
- it needs only the users table, you can use the following sql command to set up the table correctly:
    `CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT uc_users_email UNIQUE (email)
     );`