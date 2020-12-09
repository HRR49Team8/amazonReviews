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

Please see notes.txt for instructions on database installations.

# Getting Started

1. Clone the repo onto your local machine
2. Navigate into the directory
3. Run `npm install`
4. Run `sudo apt-get install pv`

# Seeding Database
1. Within server/config.js, set the `isPostgres` boolean to false if you'd like to create a Cassandra CSV.
2. ```npm run createCSV```
  * BEWARE! Running this command will create approximately 4 GB of files, and take 4+ minutes depending on your CPU.
3. To seed Postgres, run ```npm run seedPostgres```
  * This will take 4+ minutes depending on your CPU.
4. To seed Cassandra, run ```npm run seedCass```
  * This will take 20+ minutes. Unfortunately, Cassandra is not optimized for CSV imports!

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