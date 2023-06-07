import React, { useEffect, useState } from 'react';
import LotteryCard from '../pure/LotteryCard';
import { useNavigate } from 'react-router-dom';

const LotteryCardList = ({lotteries}) => {
    const navigate = useNavigate();
    const [lotteryCards, setLotteryCards] = useState([]);
    useEffect(() => {
        const usuario = sessionStorage.getItem('name');
        if(!usuario){
			sessionStorage.clear();
            navigate('/');
        }
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