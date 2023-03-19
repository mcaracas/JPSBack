import React, { useEffect, useState } from 'react';
import LotteryCard from '../pure/LotteryCard';

const LotteryCardList = ({lotteries}) => {

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