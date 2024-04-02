const express = require("express");
const app = express();
const PORT = 5500;
const fs = require("fs");
const path = require("path");

let database = []
//date, input or output, category

// Reading File
fs.readFile("./public/users.json", (err, data) => {
    if (err) {
        console.error('Error: ', err)
    }
    database = JSON.parse(data);
    console.log('Database connected');
});


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))

// Handling requests

app.listen(5500, () => {
    console.log("im listening 5500")
})

app.get('/', (req, res) => {
    // res.json({amo: "hello guys"})
    // console.log("yippe")
    res.sendFile("./index.html", {root: __dirname})
})
app.get('/sus', (req, res) => {
    res.json({gus: "hello girls"})
})

app.post('/gyat', (req, res) => {
    let temp = {
        "date": Date(),
        "money": req.body.money,
        "category": req.body.category,
        "description": req.body.body
    }
    database[1].purchases.push(temp)
    saveJSON()
})

function saveJSON() {
    fs.writeFile('./users.json', JSON.stringify(database, null, 2), (err) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('saved to file');
        }
    });
}