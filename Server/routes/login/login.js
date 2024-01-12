const express = require('express');
const router = express.Router();

// Estado de autenticación (simulado)
let isAuthenticated = false;

// Ruta de login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Lógica de autenticación (simplificada)
  if (username === 'admin' && password === '123') {
    isAuthenticated = true;
    res.json({ success: true, message: 'Inicio de sesión exitoso' });
  } else {
    isAuthenticated = false;
    res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }
});

// Ruta de logout
router.post('/logout', (req, res) => {
  isAuthenticated = false;
  res.json({ success: true, message: 'Cierre de sesión exitoso' });
});

// Middleware para verificar el estado de autenticación
const checkAuth = (req, res, next) => {
  if (isAuthenticated) {
    next(); // Continuar si el usuario está autenticado
  } else {
    res.status(401).json({ success: false, message: 'No autorizado' });
  }
};

// Ejemplo de una ruta protegida
router.get('/protected', checkAuth, (req, res) => {
  res.json({ success: true, message: 'Ruta protegida. Solo accesible para usuarios autenticados.' });
});

module.exports = router;
