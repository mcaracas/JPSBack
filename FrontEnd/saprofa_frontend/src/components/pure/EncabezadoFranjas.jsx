import FranjaLogo from './header/FranjaLogo'
import FranjaPrincipal from './header/Franja'
import FranjaRoja from './header/FranjaR'
import React from 'react';
import PropTypes from 'prop-types'

const EncabezadoFranjas = ({ title }) => {
  return (
    <div>
      <FranjaLogo />
      <FranjaPrincipal />
      <FranjaRoja title={title} />
    </div>
  );
}

FranjaRoja.propTypes = {
  title: PropTypes.string,
};


export default EncabezadoFranjas;
