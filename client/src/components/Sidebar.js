import { useEffect, useState, useContext, useRef} from "react";
import styled from "styled-components";
import { FaFolder, FaFolderOpen, FaAngleRight, FaAngleLeft} from "react-icons/fa";
import autoAnimate from '@formkit/auto-animate'
import { COLORS, SIZES } from "./constants";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [allCards, setAllCards] = useState(null);
    const {userId} = useContext(UserContext);
    const [isFolderOpen, setIsFolderOpen] = useState([]);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [hoverAnswer, setHoverAnswer] = useState(null);

    useEffect(() => {
        if (userId) {
            fetch(`${process.env.REACT_APP_BASE_URL}/api/collections/${userId}`)
                .then(res => res.json())
                .then((data) => {
                    if (data.status === 400) {
                        throw new Error(data.message);
                    }
                    setAllCards(data.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        }, [isFolderOpen, userId]);

    const hover = (cardAnswer) => {
        setHoverAnswer(cardAnswer);
    }
    
    const hoverOff = () => {
        setHoverAnswer(null);
    }

    //Auto Animate
    const parent = useRef(null)
    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    // Toggle Folder
    const toggleFolder = (index) => {
        setIsFolderOpen(previousState => {
            const newState = [...previousState];
            newState[index] = !previousState[index];
            return newState;
        });
    }

    return (
        <>
        { userId && allCards && <>
        <Wrapper isSideBarOpen={isSideBarOpen}>
            <HeaderContainer>
                <Header>Collections</Header>
            </HeaderContainer>
            <Container ref={parent}>
            { allCards.map((collection, index) => {
                return (
                    <div key={collection._id}>
                        <FolderContainer>
                            {!isFolderOpen[index]
                                ? <FaFolder onClick={() => {toggleFolder(index)}}/>
                                : <FaFolderOpen onClick={() => {toggleFolder(index)}}/>
                            }
                            <Collection to={`/cards/${collection._id}`}>{collection.collectionName}</Collection>
                        </FolderContainer>
                        {isFolderOpen[index] && collection.cards.map(card => {
                            return <Card 
                                onMouseLeave={()=> hoverOff()} 
                                onMouseOver={(()=> hover(card.cardAnswer))} 
                                key={card.cardId}>
                                    <span style={{color: COLORS.pink, paddingRight: "5px"}}>|</span> 
                                    {card.cardQuestion}
                                    {hoverAnswer === card.cardAnswer && 
                                    <CardAnswer>
                                        {card.cardAnswer}
                                    </CardAnswer>}
                                </Card>
                        })}
                    </div>
                )
            })}
            </Container>
        </Wrapper>
        <SidebarButtonContainer>
                {
                    isSideBarOpen
                    ? <FaAngleLeft onClick={() => {setIsSideBarOpen(prevState => !prevState)}} style={{fontSize:"1.7rem", marginTop: "1rem", color: COLORS.white}}/> 
                    : <FaAngleRight onClick={() => {setIsSideBarOpen(prevState => !prevState)}} style={{fontSize:"1.7rem", marginTop: "1rem", color: COLORS.white}}/>
                }
        </SidebarButtonContainer>
        </>
        }
    </>
    )
}

const SidebarButtonContainer = styled.div`
`

const CardAnswer = styled.p`
    position: absolute;
    font-size: .8rem;
    z-index: 1000;
    background: ${COLORS.white};
    padding: 15px;
    border-radius: 10px;
    color: ${COLORS.blue};
    text-indent: 0;
    transform: translateY(10px);
    max-width: 450px;
`

const Wrapper = styled.div`
    border-radius: 15px;
    padding: 15px;
    color: ${COLORS.white};
    background: ${COLORS.darkBackground};
    flex-direction: column;
    overflow: auto;
    width: 400px;
    font-family: "Monteserrat";
    display: ${props => props.isSideBarOpen ? "flex" : "none"};
`
const Container = styled.div`

`
const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
`

const Header = styled.div`
    padding: 10px 0;
    margin: 0 0 10px 0;
    border-bottom: white 2px solid;
`

const FolderContainer = styled.div`
    display: flex;
    gap: 6px;
    padding: 5px 0 0 3px;
`

const Collection = styled(Link)`
    text-decoration: none;
    color: ${COLORS.white};
    &:hover {
        color: ${COLORS.pink};
    }
`

const Card = styled.div`
    font-size: .85rem;
    padding-left: 10px;
    text-indent: -8px;
    margin-left: 8px;
    cursor: pointer;
    &:hover {
        color: ${COLORS.pink};

    }
`

export default Sidebar;