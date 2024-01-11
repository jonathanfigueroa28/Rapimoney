const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const dbPath = '../rapimoney-db.db';

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al abrir la base de datos', err.message);
  } else {
    console.log('Conexión exitosa a base de datos');
  }
});

router.get('/getusers', (req, res) => {
  // Aquí debes obtener los datos de usuarios desde tu base de datos o alguna otra fuente
  db.all('SELECT * FROM clientes', (err, users) => {
    if (err) {
      console.error('Error al ejecutar la consulta', err.message);
    } else {
      console.log('Filas recuperadas:', users);
      res.json(users);
    }
  });
 
});

module.exports = router;
