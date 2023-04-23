import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";

// Components
import PageHeader from "./PageHeader";
import CreateCollections from "./CreateCollections";
import CreateCards from "./CreateCards";
import Footer from "./Footer";
import { COLORS, SIZES } from "./constants";
import { v4 as uuidv4 } from 'uuid';
import { FaPlusCircle } from "react-icons/fa";
import autoAnimate from '@formkit/auto-animate'
import Loader from "./Loader";


// Parent of CreactCollections & CreateCards | Controls In/Out Data
const Create = () => {
    const {userId} = useContext(UserContext);
    const [userCollections, setUserCollections] = useState([]);
    const [formData, setFormData] = useState(); // collections and cards data combined
    const [selectedCollection, setSelectedCollection] = useState(null); // Modify, Collection Selected
    const [submitResponse, setSubmitResponse] = useState('');

    // collections data from form
    const [collectionsData, setCollectionsData] = useState({
            _id: uuidv4(),
            collectionName:"",
            collectionDescription:"",
            collectionCategory:"",
            collectionColor:"",
        }); 

    // cards data from form
    const [cardData, setCardData] = useState({
            cards:[
                {
                    cardId: uuidv4(),
                    cardQuestion: "",
                    cardAnswer: "",
                    cardHint: "",
                    cardTag: "",
                    review: false,
                },
            ]
        }); 

    // GET | Collections and Cards of User
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/collections/${userId}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === 400) { 
                throw new Error(data.message) 
            }
            setUserCollections(data.data);
        })
        .catch(error => { console.log(error) })
    }, [selectedCollection]);

    // POST | Collection from FormData on Submit
    const handleSubmit = (ev) => {
        ev.preventDefault();

        fetch(`${process.env.REACT_APP_BASE_URL}/api/addcollections/${userId}`, {
            method: "POST",
            headers: { Accept: "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({data: formData})}
        )
        .then(res => res.json())
        .then(data => { 
            setSubmitResponse(data.message) 
            console.log(data.message);
            resetData();
            })
        .catch(error => { console.log(error) });
    }

    // PATCH | Save Changes to Modified Collection
    const handleModifySubmit = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/collections/${selectedCollection}`, {
            method: "PATCH",
            headers: {Accept: "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({data: formData, userId: userId})
        })
        .then(res => res.json())
        .then(data => { 
            setSubmitResponse(data.message);
            resetData();
        })
        .catch(error => {console.log(error)})
    }

    // Button | Add New Card
    const handleAddCard = () => {
        const cardId = uuidv4();
        let cardLengthArray = [...cardData.cards];
        cardLengthArray.push({cardId});
        setCardData({ ...cardData, cards: cardLengthArray });
    }

    // Auto Animate
    const parent = useRef(null)
    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    // Form | Form Input - Combine Collection and Card Data
    useEffect(() => {
        setFormData(prevFormData => {
          return {...prevFormData, ...collectionsData, ...cardData};
        });
      }, [setCollectionsData, collectionsData, setCardData, cardData]);

    // Reset Data
    const resetData = () => {
        setTimeout(() => {
            setCollectionsData({
                _id: uuidv4(),
                collectionName:"",
                collectionDescription:"",
                collectionCategory:"",
                collectionColor:"",
            });

            setCardData({
                cards:[
                    {
                        cardId: uuidv4(),
                        cardQuestion: "",
                        cardAnswer: "",
                        cardHint: "",
                        cardTag: "",
                    },
                ]
            });
            setSelectedCollection("");
            setSubmitResponse("");
        }, 500);
    }

    return (
        <>
            <Wrapper>
                <PageHeader pageName={'create'}/>
                <Form onSubmit={handleSubmit}>

                    <CreateCollections 
                        userCollections={userCollections}
                        setCollectionsData={setCollectionsData}
                        collectionsData={collectionsData}
                        selectedCollection={selectedCollection} 
                        setSelectedCollection={setSelectedCollection}
                        setCardData={setCardData}
                        resetData={resetData}
                    />

                    <SectionTitle>Cards</SectionTitle>
                    <CardsSection ref={parent}>
                        { cardData.cards && cardData.cards.length > 0 && cardData.cards.map((card, index ) => {
                            return <CreateCards 
                                userCollections={userCollections}
                                cardData={cardData} 
                                setCardData={setCardData} 
                                index={index} 
                                key={card.cardId}/>
                            })
                        }
                        <BottomButtons>
                            <AddCardSection>
                                <AddCardBtn type="button" onClick={(ev)=>{ handleAddCard() }}><FaPlusCircle size={"20px"}/></AddCardBtn>
                                <p>Add Cards</p>
                            </AddCardSection>
                            <p>{submitResponse}</p>
                            { !selectedCollection 
                                ? <SubmitButton type="submit">Create</SubmitButton>
                                : <ModifyButton type="button" onClick={()=> handleModifySubmit()}>
                                    Modify
                                </ModifyButton>
                            }
                        </BottomButtons>
                    </CardsSection>

                </Form>
                <Footer/>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: ${SIZES.containerMaxWidth};
`
const SectionTitle = styled.h2`
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
    border-bottom: white solid 2px;
    padding: 5px 0;
`

const CardsSection = styled.div`
    background: ${COLORS.darkBackground};
    padding: 20px;
    border-radius: 0 0 20px 20px;
`

const Form = styled.form`
    width: 100%;
`;

const BottomButtons = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`

const AddCardSection = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
`

const AddCardBtn = styled.button`
    border: none;
    background: none;
    color: ${COLORS.lightBlue};
    margin: 10px 10px 10px 0;
    cursor: pointer;

    &:hover {
        color: ${COLORS.yellow};
    }
`

const SubmitButton = styled.button`
    background: ${COLORS.pink};
    color: ${COLORS.white};
    border: none;
    border-radius: 10px;
    width: 100px;
    padding: 4px 10px;
    cursor: pointer;

    &:hover {
        background: ${COLORS.lightBlue};
        color: ${COLORS.white};
    }
`;

const ModifyButton = styled.button`
    background: ${COLORS.blue};
    color: ${COLORS.white};
    border: none;
    border-radius: 10px;
    width: 100px;
    padding: 4px 10px;
    cursor: pointer;

    &:hover {
        background: ${COLORS.lightBlue};
        color: ${COLORS.white};
    }
`


export default Create;