

import FranjaLogo from './FranjaLogo'
import FranjaPrincipal from './Franja'
import FranjaRoja from './FranjaR'
import React from 'react';

const EncabezadoFranjas = ({titulo}) => {
    return (
        <div>
      <FranjaLogo/>
      <FranjaPrincipal/>
      <FranjaRoja titulo={titulo}/>
        </div>
    );
}

export default EncabezadoFranjas;
