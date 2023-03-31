import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import PlanPremios from '../../components/pure/PlanPremios';
import Container from '../../components/container/container';

const PlanPremiosPage = () => {
    return (
        <>
            <EncabezadoFranjas></EncabezadoFranjas>
            <Container component={<PlanPremios></PlanPremios>}></Container>
        </>
    );
}

export default PlanPremiosPage;
