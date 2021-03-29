import React from 'react';
import PropTypes from 'prop-types';

const Clima = ({datos}) => {

  //destructuring de los datos
  const { name, main } = datos;

  //evitar que cargue
  if(!name) return null;

  const kelvin = 273.15;

 return (  
    <div className='card-panel white col s12'>
      <div className='black-text'>
        <h2>{name}'s weather is: </h2>
        <p className='temperatura'>{parseInt(main.temp - kelvin, 10).toFixed(2)} <span> &#x2103;</span></p>
        <p>Max Temperature: {parseInt(main.temp_max - kelvin, 10).toFixed(2)} <span> &#x2103;</span></p>
        <p>Min Temperature: {parseInt(main.temp_min - kelvin, 10).toFixed(2)} <span> &#x2103;</span></p>
      </div>
    </div>
  );
}
 
Clima.propTypes = {
  datos: PropTypes.object.isRequired
}

export default Clima;