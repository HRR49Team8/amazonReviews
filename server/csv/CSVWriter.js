// Reuse this to write one CSV file per table.
const writeCSV = (writeStream, lines, func, encoding, done) => {
  let i = 1;
  const write = () => {
    let canWrite = true;
    do {
      const csv = func(i);
      i++;
      // Once i = lines, we finish writing.
      if (i === lines) writeStream.write(csv, encoding, done);
      else canWrite = writeStream.write(csv, encoding);
    } while (i < lines && canWrite);

    // If buffer is full, wait until it has drained and continue writing.
    if (i < lines && !canWrite) { writeStream.once('drain', write); }
  };
  write();
};

module.exports = { writeCSV };
