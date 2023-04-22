import {useState, useEffect} from "react";
import styled from "styled-components";
import { COLORS } from "./constants";
import { FaMinusCircle } from "react-icons/fa";


const CreateCards = ({cardData, setCardData, index}) => {
    const [value, setValue] = useState('');
    const editorChange = (ev) => setValue(ev.target.value);
    const [file, setFile] = useState('');

    // Button | Remove Card
    const handleRemoveCard = (index) => {
        if (cardData.cards.length > 1) {
            const cardRemovedArr = [...cardData.cards];
            cardRemovedArr.splice(index, 1);
            setCardData({...cardData, cards:cardRemovedArr});
        }
    }

    // Form | Card Input
    const handleCardForm = (inputName, value, index="") => {
        setCardData(prevCardData => {
            const cardsDataCopy = {...prevCardData};
            cardsDataCopy.cards[index][inputName] = value;
            cardsDataCopy.cards[index].review = false;
            return cardsDataCopy;
        });
    };

    return (
        <Wrapper>
            <Header>
                <DeleteCardBtn type="button" onClick={()=>{handleRemoveCard(index)}}>
                    <FaMinusCircle size={"20px"}/>
                </DeleteCardBtn>
                <CardTitle>Card {index + 1}</CardTitle>
            </Header>

            <InputWrapper>
                <Label htmlFor="cardQuestion">Question:</Label>
                <Textarea rows="5" value={cardData.cards[index].cardQuestion} id="cardQuestion" placeholder="Your question" onChange={(ev) => handleCardForm(ev.target.id, ev.target.value, index)} required/>
            </InputWrapper>

            <InputWrapper>
                <Label htmlFor="cardAnswer">Answer:</Label>
                <Textarea rows="5" value={cardData.cards[index].cardAnswer} id="cardAnswer" placeholder="Your answer" onChange={(ev) => handleCardForm(ev.target.id, ev.target.value, index)} required/>
            </InputWrapper>

            <InputWrapper>
                <Label htmlFor="cardHint" >Hint:</Label>
                <Input type="text" value={cardData.cards[index].cardHint} id="cardHint" placeholder="Hint" onChange={(ev) => handleCardForm(ev.target.id, ev.target.value, index)}/>
            </InputWrapper>
            
            {/* <InputWrapper>
                <Label htmlFor="cardTag">Tags:</Label>
                <Input type="text" value={cardData.cards[index].cardTag} id="cardTag" placeholder="Tags" onChange={(ev) => handleCardForm(ev.target.id, ev.target.value, index)}/>
            </InputWrapper> */}

        </Wrapper>
    )
}

const Wrapper = styled.div`
    border-bottom: 1px solid white;
`
const Header = styled.div`
    display: flex;
    position: relative;
    margin-top: 20px;
`

const DeleteCardBtn = styled.button`
    border: none;
    background: none;
    color: ${COLORS.pink};
    cursor: pointer;

    &:hover {
        color: ${COLORS.lightBlue};
    }
`

const CardTitle = styled.p`
    text-align: center;
    color: ${COLORS.pink};
    font-weight: bold;
    font-size: 1.5rem;
    display: inline;
    position: relative;
    left: 50%;
`

const InputWrapper = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;

const Label = styled.label`
    color: ${COLORS.white};
    text-align: right;
    padding: 0 30px 0 0;
`;

const Input = styled.input`
    color: ${COLORS.darkBackground};
    height: 1.3rem;
    padding: 5px;
    height: 1.8rem;
    border-radius: 5px;
    border: none;
    width: 80%;
`;

const Textarea = styled.textarea`
    resize: none;
    padding: 5px;
    border-radius: 5px;
    border: none;
    width: 80%;
`

export default CreateCards;