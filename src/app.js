const express = require("express");
const requests = require('requests');
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = 8000;

const root_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(express.static(root_path));

app.set('view engine', "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);



app.get("/", (req, res) => {
    // res.send("hello subham");
    res.render('index');
});

app.get("/about", (req, res) => {
    // res.send("hello subham");
    res.render('about');
});

app.get("/weather", (req, res) => {
    // res.send("hello subham");
    res.render('weather');

});
app.get("/*", (req, res) => {
    // res.send("hello subham");
    res.render('404');
});


app.listen(port, () => {
    console.log(`Lostening to the port ${port}`);
});