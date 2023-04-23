import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { NavLink, Link, useNavigate } from "react-router-dom";

// Components
import { COLORS, COLORSARRAY, SIZES } from "./constants";
import { UserContext } from "./UserContext";
import Loader from "./Loader";
import { 
    FaBookmark,
    FaRegBookmark,
    FaPlay,
    FaTrash,
} from "react-icons/fa";


const CollectionItem = ({collectionName, collectionDescription, collectionCategory, collectionColor, cards, collectionId, isDeleted, setIsDeleted}) => {
    const [background, setBackground] = useState('');
    const [stackAngle, setStackAngle] = useState('');
    const [deletePrompt, setDeletePrompt] = useState(false);
    const [deleteResponse, setDeleteResponse] = useState('');
    const {userId} = useContext(UserContext);
    const navigate = useNavigate();
    const cardNum = cards.length;

    useEffect(() => {
        const randomColor = COLORSARRAY[Math.floor(Math.random() * COLORSARRAY.length)];
        setBackground(randomColor);

        // Get Random Stack Angles
        if (cards) {
            const stackAngleData = cards.map(card => {
                return (Math.floor(Math.random() * 11) - 5); // random number betwee -5 and 5
            })
            setStackAngle(stackAngleData)
        }
    }, [])

    // Handle Delete Collection Click
    const handleDeleteCollection = (ev) => {
        fetch(`${process.env.REACT_APP_BASE_URL}/collections/${collectionId}`, {
            method: "DELETE",
            headers: { Accept: "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({userId: userId})
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 400) {
                throw new Error(data.message);
            }
            setDeleteResponse(data.message);
            setIsDeleted(true);
            setTimeout(() => {
                window.scrollTo({top: 0, behavior: 'smooth'});
            },500);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    return (
        <>
        {!stackAngle 
        ? <Loader/>
        : <>
        <Wrapper>
            <CollectionStack to={`/cards/${collectionId}`}>
                <TopContainer>
                    <Text>{collectionCategory}</Text>
                    <IconContainer>
                        {/* <BookmarkButton>
                            <FaBookmark onClick={(ev, collectionId) => {
                                ev.stopPropagation(); 
                                ev.preventDefault();
                            }}/>
                        </BookmarkButton> */}
                        { !deletePrompt 
                        ? <TrashButton>
                            <FaTrash onClick={(ev) => {
                                ev.stopPropagation(); 
                                ev.preventDefault();
                                setDeletePrompt(true);
                            }}/>
                        </TrashButton>
                        : <ConfirmDeleteContainer>
                            <CancelDeleteBtn type="button" onClick={(ev) => {
                                setDeletePrompt(false);
                                ev.stopPropagation(); 
                                ev.preventDefault();
                            }}>x</CancelDeleteBtn>
                            <ConfirmDeleteBtn type="button" onClick={(ev) => {
                                ev.stopPropagation(); 
                                ev.preventDefault();
                                handleDeleteCollection();
                            }}>✓</ConfirmDeleteBtn>
                        </ConfirmDeleteContainer>
                        }
                    </IconContainer>
                </TopContainer>
                <MainTextContainer background={background}>
                    <Title>{collectionName}</Title>
                    <Description>{collectionDescription}</Description>
                    <CardNum>{cardNum} Cards</CardNum>
                </MainTextContainer>
                <BottomContainer>
                    <PlayButton 
                        onClick={(ev) => {
                            ev.stopPropagation(); 
                            ev.preventDefault(); 
                            navigate(`/focus/${collectionId}`)
                        }} >
                        <FaPlay 
                            size={"25px"} />
                    </PlayButton>
                    <p>{deleteResponse}</p>
                </BottomContainer>
                {stackAngle.map((angle, index) => {
                    return (<BgCard style={{transform: `rotate(${angle}deg)`}} key={index}></BgCard>)
                    }
                )}
            </CollectionStack>
        </Wrapper>
        </>}
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 500px;
    width: 100%;
    position: relative;
    text-align: center;
`

const CollectionStack = styled(Link)`
    text-decoration: none;
    position: relative;
    outline: 15px solid white;
    border-radius: 15px;
    width: 80%;
    height: 80%;
    background: #fff;
    z-index: 3;
    box-shadow: 3px 5px 10px 5px black;
`

const BgCard = styled.div`
    width: 105%;
    height: 105%;
    position: absolute;
    background: grey;
    border-radius: 15px;
    box-shadow: 3px 3px 10px 5px rgba(44, 44, 44, 0.6);
    top: 0;
    z-index: -1000;
`

const MainTextContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: ${(props) => props.background};
    height: 100%;
    position: relative;
    border-radius: 15px;
    padding: 0 30px;
`

const Title = styled.h1`
    color: ${COLORS.white};
`

const CardNum = styled.p`
    padding: 10px;
    font-size: .8rem;
`

const Description =styled.h2`
    color: ${COLORS.white};
    font-style: italic;
    margin-top: 20px;
    font-size: 1.1rem;
`

const Text = styled.p`
    color: ${COLORS.white};
`

const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    color: ${COLORS.white};
    position: absolute;
    top: 10px;
    left: 30px;
    width: 90%;
    padding-top: 15px;
    z-index: 1000;
`

const BottomContainer = styled.div`
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    color: ${COLORS.white};
    position: absolute;
    bottom: 20px;
    left: 30px;
    width: 90%;
    border-top: 1px solid white;
    padding-top: 15px;
`

const IconContainer = styled.div`
    display: flex;
    gap: 15px;
`

const PlayButton = styled.button`
    border: none;
    background: none;
    color: white;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
        filter: drop-shadow(0px 0px 10px ${COLORS.white});
    }
`
const TrashButton = styled.button`
    border: none;
    background: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
        filter: drop-shadow(0px 0px 10px ${COLORS.white});
    }
`
const BookmarkButton = styled.button`
    border: none;
    background: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
        filter: drop-shadow(0px 0px 10px ${COLORS.white});
    }
`
const ConfirmDeleteContainer = styled.div`
    display: flex;
    background: white;
    border-radius: 15px;
    padding: 0 5px;
`

const ConfirmDeleteBtn = styled.button`
    border:none;
    background: none;
    color: green;
    font-size: 1rem;
    padding: 0 8px;
    cursor: pointer;
`
const CancelDeleteBtn = styled.div`
    border: none;
    background: none;
    padding: 0 5px;
    color: ${COLORS.background};
    font-size: 1rem;
    cursor: pointer;
`

export default CollectionItem;