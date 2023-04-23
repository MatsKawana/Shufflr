import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

import { UserContext } from "./UserContext";
import { COLORS } from "./constants";
import { Link } from "react-router-dom";

const Search = () => {
    const [searchStatus, setSearchStatus] = useState(false);
    const [userCollections, setUserCollections] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const {userId} = useContext(UserContext);

    // Fetch Collections and Cards
    useEffect(() => {
        if(userId){ 
            fetch(`${process.env.REACT_APP_BASE_URL}/collections/${userId}`)
            .then(res => res.json())
            .then((data) => {
                if (data.status === 400) {
                    throw new Error(data.message);
                }
                setUserCollections(data.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [userId]);

    // Expand Search Bar for input
    const handleClick = () => {
        setSearchStatus(!searchStatus);
    }

    return ( 
        <>
            { userId && userCollections &&
            <SearchContainer searchStatus={searchStatus}>
                {userCollections && searchStatus && 
                    <>
                    <SearchInput 
                        type="text" 
                        value={searchValue}
                        onChange={(ev) => setSearchValue(ev.target.value)}
                        placeholder="search" />
                    
                    <SuggestionUl>
                    {searchValue.length > 2 && 
                        userCollections.filter(collection => {
                            const searchTerm = searchValue.toLowerCase();
                            const searchResult = collection.collectionName.toLowerCase();
                            return (searchResult.includes(searchTerm));
                        }).map(collection => {
                            const index = collection.collectionName.toLowerCase().indexOf(searchValue.toLowerCase()) // returns position index
                            const prePrediction = collection.collectionName.slice(0, index + searchValue.length)
                            const prediction = collection.collectionName.slice(index + searchValue.length, collection.collectionName.length)
                                return (
                                    <SuggestionLi to={`/cards/${collection._id}`} onClick={() => setSearchValue("")} key="collection.id">
                                        {collection.collectionName}
                                    </SuggestionLi>
                                )
                        })
                    }
                    </SuggestionUl>
                    </>
                }
                    <FaSearch 
                        onClick={() => handleClick()}
                        style={searchStatus === true ? {color:COLORS.altDark} : {color:"white"}}
                        />
                        
                </SearchContainer>
            }
        </>
    )
}

const SearchContainer = styled.div`
    background: ${props => props.searchStatus ? "white" : "none"};
    border-radius: 15px;
    padding: 5px 15px 2px 15px;
`

const SearchInput = styled.input`
    border: none;
    contain: strict;
    padding: 0;
    margin: 0;
    outline: none;
    width: 100px;
`

const SuggestionUl = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    transform: translate(-10px, 5px);
    min-width: 130px;
`

const SuggestionLi = styled(Link)`
    color: black;
    list-style: none;
    font-size: .8rem;
    padding: 5px 10px;
    background: ${COLORS.white};
    text-decoration: none;

    &:hover {
        background: ${COLORS.lightBlue};
        color: ${COLORS.white}
    }
`

const Prediction = styled.span`
    
`

export default Search;