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
  const users = [
    { dni: 1, name: 'Usuario 1', lastname: 'Apellido 1', borndate: '01/01/2000', phone: '991210393', email: 'example@hotmail.com', bank: 'banco xd', account_number: '123456789' },
    { dni: 2, name: 'Usuario 2', lastname: 'Apellido 2', borndate: '01/01/2000', phone: '991210393', email: 'example2@gmail.com', bank: 'banco interesante', account_number: '123456789' },
    // ... otros usuarios
  ];
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
