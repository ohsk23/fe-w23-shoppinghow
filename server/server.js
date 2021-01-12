const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

server.use(middlewares);

// APIs
// Get carousel data
server.get('/carousel', (req, res) => {
    res.send(db.get('carousel').value());
})

// Get first banner image
server.get('/banner', (req, res) => {
    res.send(db.get('banner').value())
})

// Get banner carousel image
server.get('/banner-carousel', (req, res) => {
    res.send(db.get('banner-carousel').value())
})

// Get first five items
server.get('/items', (req, res) => {
    res.send(db.get('items').take(5).value());
})

// Get item numbers
server.get('/items/number', (req, res) => {
    res.send(db.get('items').size().value())
})

// Get five items from startindex
server.get('/items/more/*', (req, res) => {
    const startIdx = req.params[0]
    const resData = [];
    for (let i = 0; i < 5; i++) {
        console.log(Number(startIdx) + i)
        resData.push(db.get(`items[${Number(startIdx) + i}]`).value());
    }
    res.send({data: resData});
})

// Get thumbnails
server.get('/items/thumbnail/*', (req, res) => {
    const idx = req.params[0];
    res.send(db.get(`items[${idx}]['href']`).value())
})

server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running')
});
