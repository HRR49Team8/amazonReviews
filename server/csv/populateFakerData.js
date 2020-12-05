const path = require('path');
const fs = require('fs');
const { getRandomItems } = require('./createRandomData.js');
const { writeCSV } = require('./CSVWriter.js');

const items = 1;
const fileName = path.join(__dirname, '/assets/fakerData.json');

// Use this to grab 1000 items from faker and populate , so we aren't making 10 million api calls.
const getItems = () => {
  const jsonObject = { data: [] };
  for (let i = 0; i < 1000; i++) {
    jsonObject.data.push(getRandomItems());
  }
  return JSON.stringify(jsonObject);
};

const stream = fs.createWriteStream(fileName);
writeCSV(stream, items, getItems, 'utf-8', () => { stream.end(); });
