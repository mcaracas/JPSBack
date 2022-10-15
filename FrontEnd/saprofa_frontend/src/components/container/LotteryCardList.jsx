import React, { useEffect, useState } from 'react';
import LotteryCard from '../pure/LotteryCard';

const LotteryCardList = ({lotteries}) => {

    //const defaultLoteryCard;
    const defaultLotteryCard1 = {
        tipoLoteria : 'LN',
        numSorteo : 4076
    }
    const defaultLotteryCard2 = {
        tipoLoteria : 'LP',
        numSorteo : 5056
    }
    const defaultLotteryCard3 = {
        tipoLoteria : 'LTT',
        numSorteo : 1776
    }
    const defaultLotteryCard4 = {
        tipoLoteria : 'NT',
        numSorteo : 3573
    }
    const defaultLotteryCard5 = {
        tipoLoteria : '3M',
        numSorteo : 2098
    }

    // const lotteryList = [defaultLotteryCard1, defaultLotteryCard2, defaultLotteryCard3, defaultLotteryCard4, defaultLotteryCard5];
    const lotteryList = lotteries;
    const [lotteryCards, setLotteryCards] = useState(lotteryList);
    useEffect(() => {
        setLotteryCards(lotteryList);
        console.log(lotteries)
    }, []);

    return (
        <div className='container'>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                { lotteryCards.map((lotteryCard, index) => {
                    return(
                            <LotteryCard
                            key={ index }
                            tipoLoteria = { lotteryCard.tipoLoteria }
                            numSorteo = { lotteryCard.numSorteo }
                            className= 'col'
                            ></LotteryCard>
                    )
                })}
            </div>
        </div>
    );
}

export default LotteryCardList;