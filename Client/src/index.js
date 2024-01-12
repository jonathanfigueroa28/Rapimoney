import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';  
import './index.css';
import App from './App';
import Login from './login';
import reportWebVitals from './reportWebVitals';

const Root = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <React.StrictMode>
      {isLoggedIn ? <App onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(<Root />);
reportWebVitals();
