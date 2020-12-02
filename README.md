# Amazon Reviews

## Table of Contents

1. [CRUD API](#CRUD)
2. [Installation](#Installing)

# Getting started

1. Clone the repo onto your local machine
2. Navigate into the directory
3. Run `npm install`

# Setting up a MySQL database
1. Make sure you have MySQL installed (`mysql -V`)
2. Navigate into your MySQL shell, create a user and grant them all permissions. For example, once you're in your MySQL shell, run these commands:

    `CREATE USER 'hrstudent'@'localhost' IDENTIFIED BY '1q@W3e$R';`

    `GRANT ALL PRIVILEGES ON * . * TO 'hrstudent'@'localhost';`

    `FLUSH PRIVILEGES;`

# Connecting to and seeding the database
1. In your terminal, `cd` back to the cloned repo and run this command to connect to the database: `mysql -u hrstudent -p < server/schema.sql`
2. Run this command to seed the database: `npm run seed`, then "Control + C" to stop the seeding script
3. (Optional) Navigate into your MySQL shell to check that the script actually created and seeded the database

# Starting the client and server
1. To start the client: `npm run start-client`
2. In a separate terminal, to start the server: `npm run start-server`
3. In your browser, open up `localhost:3004` to view the running service

## CRUD API

Action | Method | URL
-------|--------|-----
Add a product review | POST | /api/reviews
Get all reviews for a product | GET | api/reviews/:id
Edit a review | PUT | /api/reviews
Delete a review | DELETE | /reviews/:id

# Questions, comments, grievances:
- mikatpt(at)gmail.com
- joebuono724(at)gmail.com