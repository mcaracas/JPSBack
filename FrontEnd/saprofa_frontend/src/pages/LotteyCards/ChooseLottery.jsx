import React from 'react';
import LotteryCardList from '../../components/container/LotteryCardList';
import FranjaPrincipal from '../../components/pure/Franja';
import FranjaLogo from '../../components/pure/FranjaLogo';
import FranjaRoja from '../../components/pure/FranjaR';

const ChooseLottery = () => {
    return (
        <div>
            <FranjaLogo/>
            <FranjaPrincipal/>
            <FranjaRoja title={'Escoja el sorteo a fiscalizar'}/>
            <LotteryCardList/>

        </div>
    );
}

export default ChooseLottery;
