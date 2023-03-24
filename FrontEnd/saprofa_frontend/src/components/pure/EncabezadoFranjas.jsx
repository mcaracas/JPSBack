import FranjaLogo from './header/FranjaLogo'
import FranjaPrincipal from './header/Franja'
import FranjaRoja from './header/FranjaR'
import React from 'react';
import PropTypes from 'prop-types'
import Sidebar from '../container/sidebar';

const EncabezadoFranjas = ({ title }) => {
  return (
    <div>
      <FranjaLogo />
      <FranjaPrincipal /> 
      {/* <Sidebar></Sidebar> */}
      <FranjaRoja title={title} />
    </div>
  );
}

FranjaRoja.propTypes = {
  title: PropTypes.string,
};


export default EncabezadoFranjas;
