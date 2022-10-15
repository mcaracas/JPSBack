import React, { useEffect, useState } from 'react';
import EncabezadoFranjas from '../../components/pure/EncabezadoFranjas';
import LotteryCardList from '../../components/container/LotteryCardList';
import { getActualLotteryInfo } from '../../services/axiosService';

const ChooseLottery = () => {

    const [lotteries, setLotteries] = useState();
    useEffect(() => {
        getActualLotteryInfo()
        .then((response) => { 
            if(response.status === 200){
                // console.log(response.data);
                setLotteries(response.data);
            }else{
                throw new Error('Marchamo no insertado');
            }
        })
        .catch((error) => { 
            alert(`Algo salió mal: ${error}`);
        })
        
    }, []);


    return (
        <div>
            <EncabezadoFranjas title={'Escoja el sorteo a fiscalizar'}/>
            {lotteries && <LotteryCardList lotteries={lotteries}/>}
        </div>
    );
}

export default ChooseLottery;
