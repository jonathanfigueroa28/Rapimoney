// En tu componente React (por ejemplo, src/App.js)
import React, { useState, useEffect } from 'react';
import $ from 'jquery'; // Importa jQuery
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Realizar solicitud HTTP al servidor Express usando jQuery AJAX
    $.ajax({
      url: 'http://localhost:3001/api/user/getusers',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        // Actualizar el estado con los datos recibidos
        setUsers(data);
      },
      error: function(error) {
        console.error('Error al obtener datos de usuarios:', error);
      }
    });
  }, []); // El segundo argumento [] indica que este efecto solo se ejecuta una vez al montar el componente

  return (
    <div>
      <h1>Usuarios</h1>
      <div>
        <h2>Formulario de registro</h2>
        <form>
          <label htmlFor="dni">DNI</label>
          <input type="text" id="dni" name="dni" />
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="lastname">Apellido</label>
          <input type="text" id="lastname" name="lastname" />
          <label htmlFor="borndate">Fecha de nacimiento</label>
          <input type="date" id="borndate" name="borndate" />
          <label htmlFor="phone">Telefono</label>
          <input type="text" id="phone" name="phone" />
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
          <label htmlFor="bank">Banco</label>
          <input type="text" id="bank" name="bank" />
          <label htmlFor="account_number">Numero de cuenta</label>
          <input type="text" id="account_number" name="account_number" />
          <button type="submit">Enviar</button>
        </form>
      </div>
      <h2>Lista de usuarios</h2>
      <table border="1">
        <thead>
          <tr>
            <th>dni</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de nacimiento</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Banco</th>
            <th>Numero de cuenta</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.dni}>
              <td>{user.dni}</td>
              <td>{user.nombres}</td>
              <td>{user.apellidos}</td>
              <td>{user.fecha_nacimiento}</td>
              <td>{user.celular}</td>
              <td>{user.correo}</td>
              <td>{user.banco}</td>
              <td>{user.numero_cci}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default App;
