import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { COLORS } from "./constants";


const LogoAnimation = () => {

    const [cards, setCards] = useState([
        {isFlipped: false, front: "W", timeoutId: null, back: "S"},
        {isFlipped: false, front: "e", timeoutId: null, back: "h"},
        {isFlipped: false, front: "l", timeoutId: null, back: "u"},
        {isFlipped: false, front: "c", timeoutId: null, back: "f"},
        {isFlipped: false, front: "o", timeoutId: null, back: "f"},
        {isFlipped: false, front: "m", timeoutId: null, back: "l"},
        {isFlipped: false, front: "e", timeoutId: null, back: "r"},
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Colors back of cards
    const colorsArray = [ 
        COLORS.blue,
        COLORS.darkBackground,
        COLORS.pink,
        COLORS.purple,
        COLORS.orange,
        COLORS.yellow,
        COLORS.lightBlue
    ]

    // Automaticall Flip Cards
    useEffect(() => {
            if (currentIndex < cards.length) {
                const flipAuto = setTimeout(() => {
                    const updateCards = [...cards];
                    updateCards[currentIndex] = {
                        ...updateCards[currentIndex], isFlipped: true
                    };
                    setCards(updateCards);
                    setCurrentIndex(currentIndex + 1);
                }, 400);
                return (() => clearTimeout(flipAuto))
                }
    }, [currentIndex])

    // Flip Cards | Set Individual Flipback Counter
    const flipCard = (index) => {
        setCards((cards) => {
            const cardsCopy = [...cards];
            clearTimeout(cardsCopy[index].timeoutId);
            cardsCopy[index].isFlipped = false;
            cardsCopy[index].timeoutId = setTimeout(() => {
                cardsCopy[index].isFlipped = true;
                cardsCopy[index].timeoutId = null;
                setCards(cardsCopy);
            }, 1000);
            return cardsCopy;
        });
    };

    return (
        <Wrapper>
            <Banner>
                {cards.map((card, index) => {
                    return (<CardContainer
                        key={index} 
                        onClick={()=>{flipCard(index)}}
                        isFlipped={card.isFlipped}>
                        <CardFront>
                            {card.front}
                        </CardFront>
                        <CardBack style={{background:colorsArray[index]}}>
                            {card.back}
                        </CardBack>
                        </CardContainer>)
                    })
                }
        
            </Banner>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Banner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 800px;
    color: white;
    font-size: 3rem;
    font-family: "Montserrat";
    font-weight: 800;
`

const CardContainer = styled.div`
    width: 80px;
    height: 100px;
    border-radius: 8px;
    background: ${COLORS.background};
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px white solid;
    cursor: pointer;
    transform-style: preserve-3d;
    transform: ${({ isFlipped }) =>
        isFlipped 
        ? 'rotateY(180deg)'
        : 'rotateY(0deg)'};
        transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.1) translateY(-10px) ${({ isFlipped }) =>
        isFlipped 
        ? 'rotateY(180deg)'
        : 'rotateY(0deg)'};
        transition: transform 0.2s ease-in-out;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
    /*  Interesting Syntax
    &:not(:hover) {
        transform: rotateX(0deg);
        transition: transform 0.2s linear .05s;
    } */
`

const CardFront = styled.div`
    position: absolute;
    backface-visibility: hidden;
    `

const CardBack = styled.div`
    position: absolute;
    backface-visibility: hidden;
    transform: rotateY(180deg);
    width: 80px;
    height: 100px;
    border-radius: 8px;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: white 3px solid;
`

export default LogoAnimation;