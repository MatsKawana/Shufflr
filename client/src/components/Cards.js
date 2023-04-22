import styled from "styled-components";
import { UserContext } from "./UserContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Component
import CardItem from "./CardItem";
import PageHeader from "./PageHeader";
import Footer from "./Footer";
import { COLORS, SIZES } from "./constants";
import Filterbar from "./Filterbar";
import Loader from "./Loader"

const Cards = () => {
    const {collectionId} = useParams();
    const {userId} = useContext(UserContext);
    const [userCards, setUserCards] = useState(null);
    const [allCards, setAllCards] = useState([]);
    const [copyCards, setCopyCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState(null);
    const [flipAll, setFlipAll] = useState(null);  // TODO
    const [filter, setFilter] = useState({
        collection: "all",
        category: "all",
        reviewOnly: false,
    })
    const [isLoaded, setIsLoaded] = useState(false);
    const [reviewChanged, setReviewChanged] = useState(false);

    // Fetch Collections and Cards
    useEffect(() => {

        // Selected Collection Only
        if (collectionId) {
            fetch(`/cards/${collectionId}`)
            .then(res => res.json())
            .then((data) => {
                if (data.status === 400) {
                    throw new Error(data.message);
                }
                setUserCards(data.data);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            })

        // All Collections
        } else if (userId !== null) {
            fetch(`/collections/${userId}`)
            .then(res => res.json())
            .then((data) => {
                if (data.status === 400) {
                    throw new Error(data.message);
                }
                setAllCards(data.data);
                setCopyCards(data.data);
                setFilteredCards(data.data);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [collectionId, reviewChanged]);

    // TODO: Flip All to Cards Button
    const flipAllCards = () => {
        
    }

    // Filter Cards     
    let filteredCopy = [...copyCards];

    // Handle Filter
    const handleFilter = (val, id) => {
        setFilter({...filter, [id]:val});
    }

    useEffect(() => {
        if (filter.collection !== "all") {
            filteredCopy = filteredCopy.filter(collection => collection.collectionName === filter.collection);
            }

        if (filter.category !== "all") {
            filteredCopy = filteredCopy.filter(collection => collection.collectionCategory === filter.category);
            }

        if (filter.reviewOnly !== false) {
            filteredCopy = filteredCopy.map(collection => {
                const filteredCards = collection.cards.filter(card => card.review === true);
                return {
                  ...collection,
                  cards: filteredCards
                };
              });
            }

        setFilteredCards(filteredCopy);
    }, [filter.collection, filter.category, filter.reviewOnly])

    return (
        <>
          {!isLoaded ? (
            <Loader />
          ) : (
            <Wrapper>
              <PageHeader pageName={"cards"} />
      
              {/* Cards for Selected Collection ---------- */}
              {userCards && collectionId && (
                <>
                  <Title>{userCards.collectionName}</Title>
                  <Description>{userCards.collectionDescription}</Description>
                  <CardContainer>
                    {userCards.cards.map((card) => (
                      <CardItem
                        collectionId={collectionId}
                        cardId={card.cardId}
                        cardQuestion={card.cardQuestion}
                        cardAnswer={card.cardAnswer}
                        cardHint={card.cardHint}
                        cardTag={card.cardTag}
                        review={card.review}
                        reviewChanged={reviewChanged}
                        setReviewChanged={setReviewChanged}
                        key={card.cardId}
                      />
                    ))}
                  </CardContainer>
                </>
              )}
      
              {/* ALL CARDS ----------------------------- */}
              {allCards && !collectionId && (
                <>
                  <Title>All Cards</Title>
                  {allCards.length !== 0 ? (
                    <Filterbar
                      allCards={allCards}
                      filteredCards={filteredCards}
                      filter={filter}
                      setFilter={setFilter}
                      handleFilter={handleFilter}
                    />
                  ) : (
                    <div style= {{display: "flex", alignItems:"center", justifyContent:"center"}}>
                        <CreateLink to="/create">Create your first collection </CreateLink>
                    </div>
                  )}
                  <CardContainer>
                    {filteredCards.map((collection) => (
                      <React.Fragment key={collection._id}>
                        <CollectionLabel collectionId={collection._id}>
                          {collection.collectionName}
                        </CollectionLabel>
                        {collection.cards.map((card, index) => (
                          <CardItem
                            collectionId={collection._id}
                            cardId={card.cardId}
                            cardQuestion={card.cardQuestion}
                            cardAnswer={card.cardAnswer}
                            cardHint={card.cardHint}
                            cardTag={card.cardTag}
                            review={card.review}
                            reviewChanged={reviewChanged}
                            setReviewChanged={setReviewChanged}
                            key={card.cardId}
                          />
                        ))}
                      </React.Fragment>
                    ))}
                  </CardContainer>
                </>
              )}
              <Footer />
            </Wrapper>
          )}
        </>
      );
    }

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: ${SIZES.containerMaxWidth};
`

const Title = styled.h1`
    color: ${COLORS.white};
    margin-bottom: 30px;
    text-align: center;
`

const Description = styled.h2`
    color: ${COLORS.pink};
    text-align: center;
    margin-bottom: 30px;
`

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
`

const Message = styled(Link)`
    color: white;
    text-decoration: none;
    padding: 15px;
    border-radius: 10px;
    background: ${COLORS.blue};
`

const CollectionLabel = styled.div`
    color: ${COLORS.white};
    border-bottom: 2px solid ${COLORS.white};
    font-size: 1.2rem;
    margin: 5px;
    position: relative;
    width: 100%;
`

const CreateLink = styled(Link)`
    color: ${COLORS.white};
    background: ${COLORS.pink};
    border-radius: 20px;
    width: 250px;
    text-align: center;
    font-family: "Montserrat";
    font-size: 1.2rem;
    padding: 10px 20px;
    text-decoration: none;
    margin: 30px;
    cursor: pointer;
`

export default Cards;