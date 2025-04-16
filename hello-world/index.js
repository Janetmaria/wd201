/*const fs = require("fs");
fs.writeFile(
  "sample.txt",
  "Hello World. Welcome to Node.js File System module.",
  (err) => {
    if (err) throw err;
    console.log("File created!");
  }
);

fs.readFile("sample.txt",(err,data) => {
  if (err) throw err;
  console.log(data.toString());
});

fs.appendFile("sample.txt","This is my updated content",(err) => {
  if (err) throw err;
  console.log("File Updated!");
});

fs.rename("sample.txt","test.txt", (err) => {
  if (err) throw err;
  console.log("File name updated!");
});

fs.unlink("test.txt", (err) => {
  if (err) throw err;
  console.log("File test.txt deleted successfully!");
});*/

const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res) => {
   const stream = fs.createReadStream("sample.txt");
   stream.pipe();
});
server.listen(3000);