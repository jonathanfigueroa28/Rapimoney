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
  db.all('SELECT * FROM clientes', (err, users) => {
    if (err) {
      console.error('Error al ejecutar la consulta', err.message);
    } else {
      console.log('Filas recuperadas:', users);
      res.json(users);
    }
  });
 
});
router.post('/searchuser', (req, res) => {
  const Datos = req.body;
  db.all(`SELECT * FROM clientes WHERE ${Datos.tipo} like '${Datos.busqueda}%'`, (err, users) => {
    if (err) {
      console.error('Error al ejecutar la consulta', err.message);
    } else {
      console.log('Filas recuperadas:', users);
      res.json(users);
    }
  });
 
});
router.post('/adduser', (req, res) => {
  const userData = req.body;

  if (
    userData.dni &&
    userData.nombres &&
    userData.apellidos &&
    userData.correo &&
    userData.fecha_nacimiento &&
    userData.celular &&
    userData.banco &&
    userData.numero_cci
  ) {
    const insertQuery = `
      INSERT INTO clientes (dni, nombres, apellidos, fecha_nacimiento, celular, correo, banco, numero_cci)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      userData.dni,
      userData.nombres,
      userData.apellidos,
      userData.fecha_nacimiento,
      userData.celular,
      userData.correo,
      userData.banco,
      userData.numero_cci
    ];

    db.run(insertQuery, params, function (err) {
      if (err) {
        console.error('Error al insertar usuario en la base de datos', err.message);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
      } else {
        console.log(`Usuario insertado con ID: ${this.lastID}`);
        res.json({ success: true, message: 'Usuario agregado correctamente' });
      }
    });
  } else {
    res.status(400).json({ success: false, message: 'Datos de usuario no válidos' });
  }
});


module.exports = router;
