// En tu componente React (por ejemplo, src/App.js)
import React, { useState, useEffect } from 'react';
import $ from 'jquery'; // Importa jQuery
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    dni: '',
    name: '',
    lastname: '',
    borndate: '',
    phone: '',
    email: '',
    bank: '',
    account_number: ''
  });
  const [classButton, setClassButton] = useState("add");
  const [textButton, setTextButton] = useState("Agregar Usuario");

  

  useEffect(() => {
    // Realizar solicitud HTTP al servidor Express usando jQuery AJAX
    $.ajax({
      url: 'http://localhost:3001/api/user/getusers',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        // Actualizar el estado con los datos recibidos
        setUsers(data);
      },
      error: function (error) {
        console.error('Error al obtener datos de usuarios:', error);
      },
    });
  }, []); // El segundo argumento [] indica que este efecto solo se ejecuta una vez al montar el componente

  const handleToggleForm = () => {
    // Cambiar el estado para mostrar u ocultar el formulario
    setShowForm(!showForm);
    setClassButton("close");
    setTextButton("Cerrar");
    if(showForm){
      setClassButton("add");
      setTextButton("Agregar Usuario");
        setFormData({
        dni: '',
        name: '',
        lastname: '',
        borndate: '',
        phone: '',
        email: '',
        bank: '',
        account_number: ''
      });
    }
  };

  const handleInputChange = (e) => {
    // Actualizar el estado del formulario al cambiar los campos
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    // Realizar validación del formulario antes de enviar al backend
    if (formData.dni && formData.name && formData.lastname && formData.phone && formData.email && formData.bank && formData.account_number) {
      // Realizar la solicitud al backend
      $.ajax({
        url: 'http://localhost:3001/api/add/adduser',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (data) {
          // Actualizar la lista de usuarios después de agregar uno nuevo
          setUsers([...users, formData]);
          // Ocultar el formulario después de enviar
          setShowForm(false);
        },
        error: function (error) {
          console.error('Error al agregar usuario:', error);
        },
      });
    } else {
      // Manejar errores o mostrar mensajes al usuario por campos no válidos
      console.error('Campos no válidos en el formulario', formData);
    }
  };
  return (
    <div>
      <h1>Usuarios</h1>
      <div>
      <button className={classButton} onClick={handleToggleForm}> {textButton} </button>
      {showForm && (
          <div>
            <h2>Formulario de registro</h2>
            <form onSubmit={handleSubmitForm}>
              <label htmlFor="dni">DNI</label>
              <input type="text" id="dni" name="dni" value={formData.dni} onChange={handleInputChange} />
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange}/>
              <label htmlFor="lastname">Apellido</label>
              <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleInputChange}/>
              <label htmlFor="borndate">Fecha de nacimiento</label>
              <input type="date" id="borndate" name="borndate" value={formData.borndate} onChange={handleInputChange}/>
              <label htmlFor="phone">Telefono</label>
              <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
              <label htmlFor="email">Email</label>
              <input type="text" id="email" name="email" value={formData.email} onChange={handleInputChange}/>
              <label htmlFor="bank">Banco</label>
              <input type="text" id="bank" name="bank" value={formData.bank} onChange={handleInputChange}/>
              <label htmlFor="account_number">Numero de cuenta</label>
              <input type="text" id="account_number" name="account_number" value={formData.account_number} onChange={handleInputChange}/>
              <button type="submit">Enviar</button>
            </form>
          </div>
        )}
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
