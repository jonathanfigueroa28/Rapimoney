const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");


// * in cors
var corsOptions = {
  origin: "http://localhost:3000",
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});
app.use('/api/user', require('./routes/users/users')); 
app.use('/api/login', require('./routes/login/login'));


  
  app.listen(3001, () => {
    console.log(`Servidor Express escuchando en el puerto ${3001}`);
  });