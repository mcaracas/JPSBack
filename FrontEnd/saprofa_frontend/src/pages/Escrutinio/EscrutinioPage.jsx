import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import Container from '../../components/container/container';
import Escrutinio from '../../components/pure/forms/Escrutinio';


const EscrutinioPage = () => {
    return (
        <div>
            <EncabezadoFranjas title={"Escrutinio"} />
            <Container component={<Escrutinio />} />
        </div>
    );
}

export default EscrutinioPage;
