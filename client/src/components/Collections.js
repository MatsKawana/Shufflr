import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";
import { COLORS, SIZES } from "./constants";

// Components
import CollectionItem from "./CollectionItem";
import PageHeader from "./PageHeader";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Loader from "./Loader";


// Homepage for Users
const Collections = () => {
    const {userId} = useContext(UserContext);
    const [userCollections, setUserCollections] = useState({});
    const [isDeleted, setIsDeleted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Fetch All Collections
    useEffect(() => {
        setIsDeleted(false);
        fetch(`${process.env.REACT_APP_BASE_URL}/api/collections/${userId}`)
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400) {
                throw new Error(data.message);
            }
            setUserCollections(data.data);
            setIsLoaded(true);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [isDeleted, userId]);

    return ( 
        <>
            { !isLoaded
            ? <Wrapper>
                <Loader />
            </Wrapper>
            : <Wrapper> 
                <PageHeader pageName={'collections'}/>
                <CardContainer>
                { userCollections.length > 0 
                ? <>
                    { userCollections.map(collection => {
                        return <CollectionItem 
                            collectionId={collection._id}
                            collectionName={collection.collectionName}
                            collectionDescription={collection.collectionDescription}
                            collectionCategory={collection.collectionCategory}
                            collectionColor={collection.collectionColor}
                            cards={collection.cards}
                            isDeleted={isDeleted}
                            setIsDeleted={setIsDeleted}
                            key={collection._id}  
                        />
                    })}
                </>
                : <CreateLink to="/create">Create your first collection</CreateLink>
                }
                </CardContainer>
                <Footer />
            </Wrapper>
        }
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CardContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: ${COLORS.darkBackground};
    border-radius: 20px;
    max-width: 1000px;
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

export default Collections;