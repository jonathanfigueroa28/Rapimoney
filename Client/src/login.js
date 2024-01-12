import React, { useState } from 'react';
import './login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Realizar la solicitud al backend para iniciar sesión
      const response = await fetch('http://localhost:3001/api/login/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // Verificar si el inicio de sesión fue exitoso
      if (data.success) {
        // Almacenar el token en localStorage
        localStorage.setItem('token', data.token);
        // Actualizar el estado para reflejar que el usuario está autenticado
        onLogin();
      } else {
        // Manejar el caso de inicio de sesión fallido
        alert('Login fallido. Verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Manejar errores de red u otros problemas
      alert('Error al iniciar sesión. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default Login;
