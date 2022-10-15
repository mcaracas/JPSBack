import FranjaLogo from './FranjaLogo'
import FranjaPrincipal from './Franja'
import FranjaRoja from './FranjaR'
import React from 'react';
import PropTypes from 'prop-types'

const EncabezadoFranjas = ({title}) => {
    return (
        <div>
      <FranjaLogo/>
      <FranjaPrincipal/>
      <FranjaRoja title={title}/>
        </div>
    );
}

FranjaRoja.propTypes = {
  title: PropTypes.string,
};


export default EncabezadoFranjas;
