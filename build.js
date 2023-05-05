const fs = require('fs');
const path = require('path');

const inputFile = path.resolve(__dirname, './dist/index.js');
const outputFile = path.resolve(__dirname, './dist/bookmarklet.js');

const head = `javascript:(function(){`;
const tail = `})()`;

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    process.exit(1);
  }

  // esbuild changes the "\n" to into a newline character in template literal.
  // see: https://esbuild.github.io/faq/#minified-newlines
  // so we need to encode it to use it in a bookmarklet.
  const encodedData = encodeURIComponent(data);

  fs.writeFile(outputFile, head + encodedData + tail, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      process.exit(1);
    }

    console.log('File encoded successfully.');
  });
});
