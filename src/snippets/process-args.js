const argv = global.process.argv;

// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});