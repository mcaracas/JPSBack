import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import Pruebas3MonazosForm from '../../components/pure/forms/Pruebas3MonazosForm';
import Container from '../../components/container/container';

const Pruebas3MonazosPage = () => {
    return (
        <div>
            <EncabezadoFranjas title={"Pruebas 3 Monazos"} />
            <Container component={<Pruebas3MonazosForm />} />
        </div>
    );
}

export default Pruebas3MonazosPage;
