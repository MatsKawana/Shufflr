import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {COLORS, COLORSARRAY} from "./constants";
import { UserContext } from "./UserContext";
import { 
    FaBookmark,
    FaRegBookmark,
} from "react-icons/fa";


const CardItem = ({collectionId, cardId, cardQuestion, cardAnswer, cardHint, cardTag, review, setReviewChanged}) => {
    const [isFlipped, setIsFlipped] = useState(true);
    const [showHint, setShowHint] = useState(false);
    const [randomColorIndex, setRandomColorIndex] = useState(null);
    const [toReview, setToReview] = useState(review);
    const {userId} = useContext(UserContext);

    const questionLength = cardQuestion.length; // max 130
    const answerLength = cardAnswer.length; // max 270

    useEffect(() => {
        setRandomColorIndex(Math.floor(Math.random() * COLORSARRAY.length));
    }, [])


    // Flip Card
    const flipCard = () => {
        setIsFlipped(!isFlipped);
        setShowHint(false);
    }

    // Handle Show Hint Click
    const handleHintClick = () => {
        setShowHint(!showHint);
    }

    // Handle Review Toggle
    const handleReviewClick = (cardId) => {

        // Add card to review:
        fetch(`${process.env.REACT_APP_BASE_URL}/review/${collectionId}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userId, cardId: cardId, review: !toReview })
        })
        .then((res) => res.json())
        .then(data => {
            console.log(data.message);
            setToReview((prevToReview) => !prevToReview);
            setReviewChanged(prevState => !prevState);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <Wrapper >
            <CardContainer
                onClick={()=>{flipCard()}}
                isFlipped={!isFlipped}
            >
                <CardFront style={{background:COLORSARRAY[randomColorIndex]}} questionLength={questionLength}>
                    <QuestionTop>
                        <FrontLabel>Question</FrontLabel>
                        <Review>
                        {toReview 
                        ? <FaBookmark 
                        onClick={(ev) => {
                            handleReviewClick(cardId);
                            ev.stopPropagation(); 
                            ev.preventDefault();
                        } }
                            /> 
                        : <FaRegBookmark onClick={(ev) => {
                            handleReviewClick(cardId);
                            ev.stopPropagation(); 
                            ev.preventDefault();
                        }}/>
                        }
                        </Review>
                    </QuestionTop>
                    
                    <Question>{cardQuestion}</Question>
                    
                    <SubContainer>
                        <Hint 
                            showHint={showHint}
                            onClick={(ev)=> {handleHintClick()
                            ev.stopPropagation(); 
                            ev.preventDefault();
                            }}
                        >{cardHint}</Hint>
                        <Tag>{cardTag}</Tag>
                    </SubContainer>
                </CardFront>

                <CardBack answerLength={answerLength}>
                    <BackLabel>Answer</BackLabel>
                    <Answer>{cardAnswer}</Answer>
                </CardBack>
            </CardContainer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 20px;
    opacity: 0;
    transform: translateY(10px);
    animation: slide 1s forwards;
    @keyframes slide {
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`

const Question = styled.h1`
    padding: 30px 0;
`
const Review = styled.p`
    color: ${COLORS.white};
    position: absolute;
    top: 20px;
    right: 20px;
`
const QuestionTop = styled.div`

`
const FrontLabel = styled.p`
    position: absolute;
    top: 20px;
    left: 20px;
    color: ${COLORS.white}
`

const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
    bottom: 15px;
`
const BackLabel = styled.p`
    position: absolute;
    top: 20px;
    left: 20px;
`

const Answer = styled.h2`
    padding: 40px 5px;
`

const Hint = styled.button`
    filter: ${(props) => props.showHint === false ? "blur(4px)" : "none"};
    background: none;
    border: none;
    color: ${COLORS.white};
    cursor: pointer;
`

const Tag = styled.p``

const CardContainer = styled.div`
    width: 500px;
    height: 300px;
    border-radius: 18px;
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
    /* position: relative; */
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${props => props.questionLength > 130 ? `flex-start` : `space-between`};
    outline: white 10px solid;
    border-radius: 20px;
    height: 100%;
    width: 100%;
    padding: 15px;
    contain: strict;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;  
    }
    `

const CardBack = styled.div`
    position: absolute;
    backface-visibility: hidden;
    transform: rotateY(180deg);
    outline: white 10px solid;
    width: 100%;
    height: 300px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${props => props.answerLength > 270 ? `flex-start` : `center`};
    padding: 15px;
    background: ${COLORS.darkBackground};
    contain: strict;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;  
    }
`

export default CardItem;