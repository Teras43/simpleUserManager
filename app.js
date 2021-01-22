const express = require("express");
const fs = require("fs");
const port = process.env.PORT || 3000;
let allUsers;
let users = {};

const app = express();

const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: false }));

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render("userCreate");
});

app.post("/userListing", (req, res) => {
    users.id = uuidv4();
    users.name = req.body.name;
    users.email = req.body.email;
    users.age = req.body.age;
    writeJson();
    res.render("userListing");
});

app.listen(port, () => {
    console.log(`Server is running. Listening on port: ${port}`);
});

function readJson() {
    fs.readFileSync("allUsers.json", (err, data) => {
        if (err) throw err;
        allUsers = JSON.parse(data);
    });
}

function writeJson() {
    fs.writeFileSync("allUsers.json", JSON.stringify(users));
}
