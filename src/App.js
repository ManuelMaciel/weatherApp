import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {
  
  //useState
  const [ busqueda, guardarBusqueda ] = useState({
    city: '',
    country: ''
  })
  const [ consultar, guardarConsultar] = useState(false);
  const [ datos, guardarDatos ] = useState({});
  const [ error, guardarError ] =  useState(false);
  //destructuring de busqueda
  const { city, country } = busqueda;

  useEffect(() => {
    
    //cuando detecte un cambio en consultar se ejecuta el llamado a la API
    const consultarAPI = async () => {
      if(consultar){
        const appId = 'fdca5e9da4b6cc725f50a5ddcfd0fb87';
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;
        const respuesta = await fetch(URL);
        const resultado = await respuesta.json();
        guardarDatos(resultado)
        guardarConsultar(false)
        //verifica si hubo error en la consulta
        if(resultado.cod === '404'){
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    }
    consultarAPI();
    
    //eslint-disable-next-line
  }, [consultar]);
  
  let componente;
  if(error){
    componente= <Error mensaje='No hay resultados'/>
  } else {
    componente = <Clima 
                    datos={datos}
                  />
  }

  return (
    <Fragment>
      <Header 
        titulo='Weather App React'
      />

      <div className='contenedor-form'>
        <div className='container'>
          <div className='row'>
          <div className='col m6 s12'>
              <Formulario 
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className='col m6 s12'>
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
