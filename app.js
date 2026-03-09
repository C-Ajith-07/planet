const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3010;


const planets = JSON.parse(fs.readFileSync("data.json", "utf-8"));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));


app.get("/", (req, res) => {
    // const planet = planets.find(p => p.name == "Mercury");
    // console.log(planet);
    
    res.render("home", { planet:planets[0], planets });
});

app.get("/:name", (req, res) => {
    const planetName = req.params.name;
    console.log(planetName);
    
    console.log(req.params);
    
    const planet = planets.find(p => p.name.toLowerCase() == planetName.toLowerCase());
    console.log(planet == undefined);
    if(planet == undefined){
        res.send("invalid planet data");
    }else{
        res.render("home", { planet, planets });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


