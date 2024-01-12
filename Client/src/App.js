// En tu componente React (por ejemplo, src/App.js)
import React, { useState, useEffect } from 'react';
import $ from 'jquery'; // Importa jQuery
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    celular: '',
    correo: '',
    banco: '',
    numero_cci: ''
  });
  const [classButton, setClassButton] = useState("add");
  const [textButton, setTextButton] = useState("Agregar Usuario");
  const [visibleUsers, setVisibleUsers] = useState(10);

  useEffect(() => {
    $.ajax({
      url: 'http://localhost:3001/api/user/getusers',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        setUsers(data);
      },
      error: function (error) {
        console.error('Error al obtener datos de usuarios:', error);
      },
    });
  }, []); 

  const handleToggleForm = () => {
    setShowForm(!showForm);

    if (!showForm) {
      setClassButton("close");
      setTextButton("Cerrar");
    } else {
      setClassButton("add");
      setTextButton("Agregar Usuario");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (formData.dni && formData.nombres && formData.apellidos && formData.fecha_nacimiento && formData.celular && formData.correo && formData.banco && formData.numero_cci) {
      $.ajax({
        url: 'http://localhost:3001/api/user/adduser',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (data) {
          setUsers([...users, formData]);
          setShowForm(false);
          handleToggleForm();
          setFormData({
            dni: '',
            nombres: '',
            apellidos: '',
            fecha_nacimiento: '',
            celular: '',
            correo: '',
            banco: '',
            numero_cci: ''
          });
        },
        error: function (error) {
          console.error('Error al agregar usuario:', error);
        },
      });
    } else {
      console.error('Campos no válidos en el formulario', formData);
    }
  };

  const handleSeeMore = () => {
    setVisibleUsers(prevVisibleUsers => prevVisibleUsers + 10);
  };

  return (
    <div>
      <h1>Bienvenido admin</h1>
      <div>
        <button className={classButton} onClick={handleToggleForm}> {textButton} </button>
        {showForm && (
          <div>
            <h2>Formulario de registro</h2>
            <form onSubmit={handleSubmitForm}>
              <label htmlFor="dni">DNI</label>
              <input type="text" name="dni" id="dni" value={formData.dni} onChange={handleInputChange} />
              <label htmlFor="nombres">Nombres</label>
              <input type="text" name="nombres" id="nombres" value={formData.nombres} onChange={handleInputChange} />
              <label htmlFor="apellidos">Apellidos</label>
              <input type="text" name="apellidos" id="apellidos" value={formData.apellidos} onChange={handleInputChange} />
              <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
              <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleInputChange} />
              <label htmlFor="celular">Celular</label>
              <input type="text" name="celular" id="celular" value={formData.celular} onChange={handleInputChange} />
              <label htmlFor="correo">Correo</label>
              <input type="text" name="correo" id="correo" value={formData.correo} onChange={handleInputChange} />
              <label htmlFor="banco">Banco</label>
              <input type="text" name="banco" id="banco" value={formData.banco} onChange={handleInputChange} />
              <label htmlFor="numero_cci">Numero de cuenta</label>
              <input type="text" name="numero_cci" id="numero_cci" value={formData.numero_cci} onChange={handleInputChange} />
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
          {users.slice(0, visibleUsers).map(user => (
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
      {visibleUsers < users.length && (
        <button className='seemore' onClick={handleSeeMore}>Ver más</button>
      )}
    </div>
  );
};

export default App;
