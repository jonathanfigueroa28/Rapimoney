const express = require('express');
const app = express();
const cors = require('cors');


// * in cors
var corsOptions = {
  origin: "http://localhost:3000",
}
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});
app.use('/api/user', require('./routes/users/users')); 


  
  app.listen(3001, () => {
    console.log(`Servidor Express escuchando en el puerto ${3001}`);
  });