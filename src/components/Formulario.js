import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types'

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {

  //useState
  const [ error, guardarError ] = useState(false);

  //destructuring de los datos de busqueda
  const { city, country } = busqueda;

  //funcion que coloca los elementos del state
  const handleChange = e => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name] : e.target.value
    });
  }
  //cuando el usuario haga submit al formulario
  const handleSubmit = e => {
    e.preventDefault();
    //validar
    if( city.trim() === '' || country.trim() === ''){
      guardarError(true);
      return;
    }
    guardarError(false);
    
    guardarConsultar(true);

  }
  return (  
    <form
      onSubmit={handleSubmit}
    >
      {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}
      <div className='input-field col-s12'>
        <input
          type='text'
          name='city'
          id='city'
          value={city}
          onChange={handleChange}
        />
        <label htmlFor='city'>City: </label>
      </div>
      <div className='input-field col-s12'>
        <select
          name='country'
          id='country'
          value={country}
          onChange={handleChange}
        >
          <option value=''>--Select a country--</option>
          <option value="US">USA</option>
          <option value="MX">Mexico</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="PY">Paraguay</option>
          <option value="ES">Spain</option>
        </select>
        <label htmlFor='country'>Country: </label>
      </div>
      <div className='input-field col-s12'>
        <input 
          type='submit'
          value='Search Weather'
          className='waves-effect waves-light btn-large btn-block green accent-4'
        />
      </div>
    </form>
  );
}
 
Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  guardarBusqueda: PropTypes.func.isRequired,
  guardarConsultar: PropTypes.func.isRequired
}

export default Formulario;