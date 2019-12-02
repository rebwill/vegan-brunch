// Core modules first
const fs = require('fs');
const http = require('http');
const url = require('url');

// Then our own modules
const replaceTemplate = require('./modules/replaceTemplate'); // we are saving this into a variable to use in this module.



/////////////////////////////
// FILES

// Blocking, synchronous way

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// // ^takes two arguments: 1st = path to file we're reading; 2nd = character encoding.
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// // ^takes two arguments: 1st = path to file we're writing to; 2nd = what to write.
// console.log("file written!");

// Non-blocking, asynchronous way

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         if (err) return console.log('ERROR!');
//         // ^ in readFile method (async), we need: 1st param = path to file we want to read; 2nd param = character encoding (we're not sure if it works without it); 3rd param = callback function.
//         // ^ callback accepts 2 args, error (very common, in case there is any error) and data to be passed
//             console.log(data2);
//             fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//                     console.log(data3);

//                     fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                         console.log("Your file has been written!");
//                     });
//                 });
//         });
// // Translation: read start.txt and pass the content (data1 = "read-this") into the file name of the next file to be read (read-this.txt). Then console.log the content in that file ("the avocado is also used...")
// });
// console.log('Will read file');

/////////////////////////////
// SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
// ^we use the sync version here because this is only called once at the beginning, to load the file and then it doesn't happen again.
// we are loading this data (product JSON, templates) at the beginning and reading to memory instead of making a new request every time they are needed.

const server = http.createServer((req, res) => {       // each time a new request hits the server, this callback function will be called. Res is the response object.
    
    const { query, pathname } = url.parse(req.url, true);

    // Overview 
    if (pathname === '/' || pathname === '/overview' ) {
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);
        res.end(output);
    
    // Product 
    } else if (pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output);
    
    // API 
    } else if (pathname === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);

    // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end("<h1>This page could not be found.</h1>");
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log("Listening to requests on port 8000");
});
