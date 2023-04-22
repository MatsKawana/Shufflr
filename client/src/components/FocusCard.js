import { useState } from "react";
import styled from "styled-components";
import { COLORS, COLORSARRAY } from "./constants";
import { Link } from "react-router-dom";


const FocusCard = ({cardId, cardQuestion, cardAnswer, handleNext, handleReview, isDisabled}) => {
    const [isFlipped, setIsFlipped] = useState(true);
    const randomColorIndex = Math.floor(Math.random() * COLORSARRAY.length);

    // Flip Card
    const flipCard = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <>
            <Wrapper>
                <CardContainer
                    onClick={()=>{flipCard()}}
                    isFlipped={!isFlipped}
                >
                    <CardFront style={{background:COLORSARRAY[randomColorIndex]}}>
                        <FrontLabel>Question</FrontLabel>
                        <Question>{cardQuestion}</Question>
                    </CardFront>

                    <CardBack>
                        <BackLabel>Answer</BackLabel>
                        <Answer>{cardAnswer}</Answer>

                        <ButtonContainer>
                            <NavButton type="button" style={{backgroundColor:COLORS.pink, color: COLORS.white}} disabled={isDisabled} onClick={() => {handleReview(cardId)}}>Review</NavButton>
                            <NavButton type="button" style={{backgroundColor:COLORS.lightBlue, color: COLORS.white}}disabled={isDisabled} onClick={() => {handleNext(cardId)}}>Next</NavButton>
                        </ButtonContainer>
                    </CardBack>
                </CardContainer>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    padding: 10px;
`

const Question = styled.h1`
    font-size: 2.5rem;
`

const Answer = styled.h2``

const CardContainer = styled.div`
    width: 800px;
    height: 400px;
    border-radius: 20px;
    position: relative;
    display: flex;
    align-items: center;
    transform-style: preserve-3d;
    cursor: pointer;
    transform: ${({ isFlipped }) =>
        isFlipped 
        ? 'rotateY(180deg)'
        : 'rotateY(0deg)'};
        transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.05) translateY(-10px) ${({ isFlipped }) =>
        isFlipped 
        ? 'rotateY(180deg)'
        : 'rotateY(0deg)'};
        transition: transform 0.2s 0.08s ease-in-out;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
`
const CardFront = styled.div`
    position: absolute;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: white 8px solid;
    border-radius: 20px;
    height: 100%;
    width: 100%;
    padding: 20px;
    `

const FrontLabel = styled.p`
    position: absolute;
    top: 5px;
    left: 5px;
    color: ${COLORS.white};
`

const CardBack = styled.div`
    position: absolute;
    backface-visibility: hidden;
    transform: rotateY(180deg);
    width: 800px;
    height: 400px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background: ${COLORS.background};
`

const BackLabel = styled.p`
    position: absolute;
    top: 20px;
    left: 20px;
`

const ButtonContainer = styled.div`
    position: absolute;
    bottom: 10px;
`

const NavButton = styled.button`
    border: none;
    padding: 15px 25px;
    margin: 5px 25px;
    border-radius: 5px;
    font-family: "Montserrat";
    font-weight: bold;

    &:hover {
        box-shadow: 0px 0px 5px ${COLORS.white};
    }
`

export default FocusCard;