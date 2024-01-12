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
router.post('/searchuser', (req, res) => {
  // Aquí debes obtener los datos de usuarios desde tu base de datos o alguna otra fuente
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
  // Obtener datos del cuerpo de la solicitud
  const userData = req.body;

  // Realizar validación en el backend antes de guardar en la base de datos
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
    // Construir la consulta SQL de inserción
    const insertQuery = `
      INSERT INTO clientes (dni, nombres, apellidos, fecha_nacimiento, celular, correo, banco, numero_cci)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Parámetros para la consulta preparada
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

    // Ejecutar la consulta preparada
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
    // Enviar respuesta de error al frontend si los datos no son válidos
    res.status(400).json({ success: false, message: 'Datos de usuario no válidos' });
  }
});


module.exports = router;
