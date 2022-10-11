import React, { useEffect, useState } from 'react';
import LotteryCard from '../pure/LotteryCard';

const LotteryCardList = () => {

    //const defaultLoteryCard;
    const defaultLotteryCard1 = {
        name : 'Loteria Nacional',
        id : 'LN4076'
    }
    const defaultLotteryCard2 = {
        name : 'Loteria Popular',
        id : 'LP5056'
    }
    const defaultLotteryCard3 = {
        name : 'Lotto',
        id : 'LT1776'
    }
    const defaultLotteryCard4 = {
        name : 'Nuevos Tiempos',
        id : 'NT3573'
    }
    const defaultLotteryCard5 = {
        name : '3 Monazos',
        id : '3M2098'
    }

    const lotteryList = [defaultLotteryCard1, defaultLotteryCard2, defaultLotteryCard3, defaultLotteryCard4, defaultLotteryCard5];

    const [lotteryCards, setLotteryCards] = useState(lotteryList);
    useEffect(() => {
        setLotteryCards(lotteryList);
    }, []);

    return (
        <div className='container'>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                { lotteryCards.map((lotteryCard, index) => {
                    return(
                        <div className="col">
                            <LotteryCard
                            key={ index }
                            name = { lotteryCard.name }
                            id = { lotteryCard.id }
                            ></LotteryCard>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default LotteryCardList;