import styled from "styled-components";
import { COLORS } from "./constants";
import { 
    FaBookmark,
    FaRegBookmark,
} from "react-icons/fa";



const Filterbar = ({allCards, filter, setFilter, handleFilter, filteredCards}) => {
    return (
        <Wrapper>
            <InputWrapper>
                <Label>Collections:</Label>
                <Select onChange={(ev) => handleFilter(ev.target.value, ev.target.id)} id="collection">
                    <option value="all" id="all">Select</option>
                    {filteredCards.map(card => {
                        return <option 
                            value={card.collectionName}
                            id={card.collectionName}
                            key={card._id}
                        >
                            {card.collectionName}
                        </option>
                    })}
                </Select>
            </InputWrapper>
            <InputWrapper>
                <Label>Category:</Label>
                <Select onChange={(ev) => handleFilter(ev.target.value, ev.target.id)} id="category">
                    <option value="all" id="all">Select</option>
                    {Array.from(new Set(filteredCards.map(card => card.collectionCategory))).map(category => { // remove duplicates
                        return <option 
                            value={category}
                            id={category}
                            key={category}
                        >
                            {category}
                        </option>
                    })}
                </Select>
            </InputWrapper>
            <ReviewWrapper>
                { filter.reviewOnly 
                ? <FaBookmark style={{color:COLORS.lightBlue}} onClick={ev => setFilter(prevValue => ({...prevValue, reviewOnly: !prevValue.reviewOnly}))} />
                : <FaRegBookmark onClick={ev => setFilter(prevValue => ({...prevValue, reviewOnly: !prevValue.reviewOnly}))} />
                }
            <Label>Review</Label>
            </ReviewWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    gap: 10px;
    color: ${COLORS.white};
`

const InputWrapper = styled.div`
    padding: 5px 10px;
    display: flex;
    flex-direction: column;    
`

const Label = styled.label`
    padding: 0 10px 5px 0;
`

const Select = styled.select`
    width: 180px;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: .8rem;
`

const ReviewWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    position: relative;
    bottom: -10px;
`

export default Filterbar;