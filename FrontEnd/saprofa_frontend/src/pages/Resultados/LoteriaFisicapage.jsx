import React, { useEffect, useState } from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import ResultadoLoteriaFisica from '../../components/pure/Resultados/ResultadoLoteriaFisica';
import Container from '../../components/container/container';
import { getPlanPremios } from '../../services/axiosService';

const lottery = JSON.parse(sessionStorage.getItem('lottery'));
const numSorteo = lottery?.numSorteo;
const tipoLoteria = lottery?.tipoLoteria;
const idSorteo = `${tipoLoteria}${numSorteo}`;

const LoteriaFisicapage = () => {
    const [planPremios, setPlanPremios] = useState(null);

    useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await getPlanPremios(lottery.planPremios);
        setPlanPremios(response.data);
      } catch (error) {
        console.log(`Error al obtener el plan de premios: ${error}`);
      }
    };

    fetchPlan();
  }, []);

    return (
        <div>
            <EncabezadoFranjas title={"Resultados Loteria Fisica"}/>
            <Container  component={planPremios && <ResultadoLoteriaFisica idSorteo={idSorteo} planPremiosProp={planPremios}/>} />
        </div>
    );
}

export default LoteriaFisicapage;
