const express = require('express');
const router = express.Router();

let isAuthenticated = false;

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '123') {
    isAuthenticated = true;
    res.json({ success: true, message: 'Inicio de sesión exitoso' });
  } else {
    isAuthenticated = false;
    res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }
});

router.post('/logout', (req, res) => {
  isAuthenticated = false;
  res.json({ success: true, message: 'Cierre de sesión exitoso' });
});

const checkAuth = (req, res, next) => {
  if (isAuthenticated) {
    next();
    res.status(401).json({ success: false, message: 'No autorizado' });
  }
};

router.get('/protected', checkAuth, (req, res) => {
  res.json({ success: true, message: 'Ruta protegida. Solo accesible para usuarios autenticados.' });
});

module.exports = router;
