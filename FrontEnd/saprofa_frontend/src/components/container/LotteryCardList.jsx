import React, { useEffect, useState } from 'react';
import LotteryCard from '../pure/LotteryCard';

const LotteryCardList = ({lotteries}) => {

    const [lotteryCards, setLotteryCards] = useState([]);
    useEffect(() => {
        console.log("lotteries:",lotteries);
        setLotteryCards(lotteries);
    }, []);

    return (
        <div className='container'>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                { lotteryCards.map((lotteryCard, index) => {
                    return(
                            <LotteryCard
                            key={ index }
                            lottery = { lotteryCard }
                            className= 'col'
                            ></LotteryCard>
                    )
                })}
            </div>
        </div>
    );
}

export default LotteryCardList;