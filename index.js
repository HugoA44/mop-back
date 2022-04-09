require("dotenv").config();
const express = require("express");
const cors = require("cors");
var bcrypt = require("bcryptjs");

// set port, listen for requests
const PORT = process.env.PORT;

console.log(PORT);

const app = express();
const db = require("./models");
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

const User = db.user;
function initial (){
  User.create({
    id: 1,
    username: "Hugo",
    email: "hugoaunette44@gmail.com",
    password: bcrypt.hashSync("root", 8),
  })
}

var corsOptions = {
  origin: `http://localhost:${PORT}`,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MOP." });
});
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/travel.routes')(app);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
