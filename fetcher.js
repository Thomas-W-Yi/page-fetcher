const request = require('request');
const url = process.argv[2];
const html = process.argv[3];
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

try {
  if (fs.existsSync(html)) {
    rl.question('The file already exists, type Y and enter to overwrite the file ', () => {
      console.log(`File has been overwritten!`);
      rl.close();
      request(url, (error, response, body) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          fs.writeFile(html, body, function(err) {
            if (err) {
              return console.log(err);
            }
            console.log(`Downloaded and saved ${body.length} bytes to ${html}`);
          });
        } else {
          response.statusCode >= 300 && response.statusCode < 400 ? console.log('Redirects') : response.statusCode >= 400 && response.statusCode < 500 ? console.log('Client Erros') : console.log('Server errors');
          process.exit();
        }
      
      });
    });
  } else if (!html) {
    console.log('The local file path is invalid');
    process.exit();
  } else {
    request(url, (error, response, body) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        fs.writeFile(html, body, function(err) {
          if (err) {
            return console.log(err);
          }
          console.log(`Downloaded and saved ${body.length} bytes to ${html}`);
        });
      } else {
        response.statusCode >= 300 && response.statusCode < 400 ? console.log('Redirects') : response.statusCode >= 400 && response.statusCode < 500 ? console.log('Client Erros') : console.log('Server errors');
        process.exit();
      }
      
    });
  }
} catch (err) {
  console.error(err);
}
