const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const dbPath = '../rapimoney-db.db';

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al abrir la base de datos', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

router.post('/adduser', (req, res) => {
  // Obtener datos del cuerpo de la solicitud
  const userData = req.body;

  // Realizar validación en el backend antes de guardar en la base de datos
  if (
    userData.dni &&
    userData.name &&
    userData.lastname &&
    userData.email &&
    userData.borndate &&
    userData.phone &&
    userData.bank &&
    userData.account_number
  ) {
    // Construir la consulta SQL de inserción
    const insertQuery = `
      INSERT INTO clientes (dni, nombres, apellidos, fecha_nacimiento, celular, correo, banco, numero_cci)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Parámetros para la consulta preparada
    const params = [
      userData.dni,
      userData.name,
      userData.lastname,
      userData.borndate,
      userData.phone,
      userData.email,
      userData.bank,
      userData.account_number,
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
