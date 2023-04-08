import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import Container from '../../components/container/container';
import VerificaMontosAcumulados from '../../components/pure/forms/verificaMontoAcumulados';

const VerificaMontosAcumuladosPage = () => {
    return (
        <div>
            <EncabezadoFranjas title={'Verifica Montos Acumulados'} />
            <Container component={<VerificaMontosAcumulados></VerificaMontosAcumulados>}/>
        </div>
    );
}

export default VerificaMontosAcumuladosPage;
