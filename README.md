# Amazon Reviews

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Setting Up](#setting-up)
4. [Seeding Database](#seeding-database)
5. [Starting the client and server](#starting)
6. [CRUD API](#CRUD)

# Prerequisites
  * npm
  * Postgres
  * Cassandra

Please see notes.txt for instructions on database installations.

# Getting Started

1. Clone the repo onto your local machine
2. Navigate into the directory
3. Run `npm install`

# Setting Up
1. Make sure you have MySQL installed (`mysql -V`)
2. Navigate into your MySQL shell, create a user and grant them all permissions. For example, once you're in your MySQL shell, run these commands:

    `CREATE USER 'hrstudent'@'localhost' IDENTIFIED BY '1q@W3e$R';`

    `GRANT ALL PRIVILEGES ON * . * TO 'hrstudent'@'localhost';`

    `FLUSH PRIVILEGES;`

3. Make sure Postgres and Cassandra are installed.

# Seeding Database
1. ```npm run createCSV```
  - BEWARE! Running this command will create approximately 4 GB of files, and take 4+ minutes depending on your CPU.
2. To seed Postgres, run ```npm run seedPostgres```
  - This will take 4+ minutes depending on your CPU.

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