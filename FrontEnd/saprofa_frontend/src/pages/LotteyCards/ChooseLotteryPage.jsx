import React from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import LotteryCardList from '../../components/container/LotteryCardList';

const ChooseLottery = () => {
    return (
        <div>
            <EncabezadoFranjas title={'Escoja el sorteo a fiscalizar'}/>
            <LotteryCardList/>

        </div>
    );
}

export default ChooseLottery;
