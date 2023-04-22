import { useContext, useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./UserContext";
import autoAnimate from '@formkit/auto-animate'

// Components
import PageHeader from "./PageHeader";
import { COLORS } from "./constants";
import FocusCard from "./FocusCard";
import Loader from "./Loader";
import { Balloons } from "./PageImages";
import Footer from "./Footer";


const Focus = () => {
    const [userCollection, setUserCollection] = useState();
    const [collectionCards, setCollectionCards] = useState();
    const [activePosition, setActivePosition] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);
    const {collectionId} = useParams();
    const {userId} = useContext(UserContext);

    // Fetch Collections and Cards | Randomize Cards Order
    useEffect(() => {
        fetch(`/cards/${collectionId}`)
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400) {
                throw new Error(data.message);
            }
            const cards = data.data.cards;
            const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
            setUserCollection(collectionId);
            setCollectionCards(shuffledCards);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [userId]);

    // Handle Next Click
    const handleNext = (cardId) => {
        setActivePosition(prevPosition => prevPosition + 1);
        setIsDisabled(activePosition+1 === collectionCards.length);

        // Review card from review:
        fetch(`/review/${collectionId}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userId, cardId: cardId, review: false })
        })
        .then((res) => res.json())
        .then(data => {
            console.log(data.message);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // Handle Review
    const handleReview = (cardId) => {
        setActivePosition((prevPosition) => prevPosition + 1);
        setIsDisabled(activePosition + 1 === collectionCards.length);


        // Add card to review:
        fetch(`/review/${collectionId}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userId, cardId: cardId, review: true })
        })
        .then((res) => res.json())
        .then(data => {
            console.log(data.message);
        })
        .catch((error) => {
            console.log(error);
        });
    }

     // Auto Animate
     const parent = useRef(null)
     useEffect(() => {
         parent.current && autoAnimate(parent.current);
     }, [parent])

    return (
        <>
            {!userId && <Wrapper><p>Login or Create an Account</p></Wrapper>}
            { !userCollection
            ? <Loader />
            : <>
                {!isDisabled 
                ? <>
                <PageHeader pageName={'focus'}/>
                <Wrapper>    
                    <CollectionTitle> {userCollection.collectionName}</CollectionTitle>
                        <CardsInfo>{`${activePosition + 1} of ${collectionCards.length}`}</CardsInfo>
                        <CardContainer>
                        {collectionCards.map((card, index) => {
                            return index === activePosition &&
                            <FocusCard 
                                key={card.cardId}
                                cardQuestion={card.cardQuestion}
                                cardId={card.cardId}
                                cardAnswer={card.cardAnswer}
                                handleNext={handleNext}
                                handleReview={handleReview}
                                isDisabled={isDisabled}
                            />
                        })}
                        </CardContainer>
                        <Footer />
                        </Wrapper>
                    </>
                    : <Wrapper>
                    <FinishedCard>
                        Congrats, You've Completed Your Collection!
                        <Balloons/>
                        <BackLink to={`/collections`}>Back to Collections </BackLink>
                    </FinishedCard>
                    <Footer />
                </Wrapper>
                }
            </>
            }
        </>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CollectionTitle = styled.h1`
    margin-bottom: 30px;
`

const CardContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const CardsInfo = styled.h2`
    margin-bottom: 15px;
`

const FinishedCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    font-size: 1.5rem;
    color: ${COLORS.white};
    margin: 15px;
`

const BackLink = styled(Link)`
    background: ${COLORS.lightBlue};
    color:${COLORS.white};
    text-decoration: none;
    padding: 20px;
    border-radius: 5px;
    &:hover {
        background: ${COLORS.pink};
        color:${COLORS.white};
    }
`

export default Focus;