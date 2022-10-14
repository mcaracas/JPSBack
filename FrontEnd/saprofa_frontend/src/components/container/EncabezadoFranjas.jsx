

import FranjaLogo from '../../components/pure/FranjaLogo'
import FranjaPrincipal from '../../components/pure/Franja'
import FranjaRoja from '../../components/pure/FranjaR'
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
