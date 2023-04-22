import {useState} from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

//Components
import { FaPlusCircle } from "react-icons/fa";
import { COLORS, SIZES } from "./constants";

// Create Collections | Modify Existing Collections | Parent of CreateCards for Submitting Collections and Cards form data together
const CreateCollections = ({setCollectionsData, collectionsData, userCollections,selectedCollection, setSelectedCollection, setCardData, resetData}) => {
    const [createCollection, setCreateCollection] = useState(true); // creates new collection

    // Button | Toggle Create Collection with new Id vs Modify Collection
    const handleCreateCollection = () => {
        resetData();
        const collectionId = uuidv4();
        setCollectionsData({...collectionsData, _id: collectionId});
        setCreateCollection(true);
    }

    // Button | Handle Modify Collection
    const handleModifyButton = () => {
        setCreateCollection(false);
    }

    // Select Modify | Handle Collection Selection
    const handleSelect = (id, value) => {
        setSelectedCollection(value);

        if (value !== "") {
            const newCollectionData = userCollections.find(id => id._id === value);
            setCollectionsData(newCollectionData);
            setCardData(userCollections.find(id => {
                return id._id === value;
            }))
        } else {
            resetData();
        }
    }
  
    // Form | Collections Input
    const handleCollectionForm = (inputName, value) => {
        setCollectionsData(prevCollectionsData => {
            let collectionsDataCopy = {...prevCollectionsData};
            collectionsDataCopy[inputName] = value;    
            return collectionsDataCopy
        });
    };

    return (
        <>
            <Wrapper>
            <Section>
                <InputWrapper>
                    <ToggleContainer>
                        <CreateButton type="button" onClick={(ev) => {handleCreateCollection(ev)}} isActive={createCollection}>Create</CreateButton>
                        <ModifyButton type="button" onClick={(ev) => {handleModifyButton(ev)}} isActive={createCollection}>Modify</ModifyButton>
                    </ToggleContainer>
                </InputWrapper>

                {/* Edit Existing Collections */}
                { !createCollection && userCollections.length > 0 &&
                    <InputWrapper>
                        <Label htmlFor="collectionSelect">Collection:</Label>
                        <Select id="collectionSelect" onChange={(ev) => handleSelect(ev.target.id, ev.target.value)} >
                            <Option value={""} >Select Collection to Modify</Option>
                            {userCollections.map(collection => {
                                return <Option id={collection._id} value={collection._id} key={collection._id}>{collection.collectionName}</Option>
                            })}
                        </Select>
                    </InputWrapper>
                }
                <InputWrapper>
                    <Label htmlFor="collectionName">Name:</Label>
                    <Input type="text" value={collectionsData.collectionName} id="collectionName" placeholder="Collection name" onChange={(ev) => handleCollectionForm(ev.target.id, ev.target.value)} required/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="collectionDescription">Description:</Label>
                    <Input type="text" value={collectionsData.collectionDescription} id="collectionDescription" placeholder="Description" onChange={(ev) => handleCollectionForm(ev.target.id, ev.target.value)} required/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="collectionCategory">Category:</Label>
                    <Input type="text" value={collectionsData.collectionCategory} id="collectionCategory" placeholder="Category" onChange={(ev) => handleCollectionForm(ev.target.id, ev.target.value)} required/>
                </InputWrapper>
            </Section>
        </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    background: ${COLORS.altDark};
`

const Section = styled.div`
`

const ToggleContainer = styled.div`
    display: flex;
    width: 100%;
`;

const CreateButton = styled.button`
    border: none;
    color: ${COLORS.white};
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 10px 10px 0 0;
    background: ${props => props.isActive ? COLORS.lightBlue : "grey" };
    font-weight: ${props => props.isActive ? "bold" : "normal" };
`;

const ModifyButton = styled.button`
    padding: 10px 20px;
    border: none;
    color: ${COLORS.white};
    cursor: pointer;
    border-radius: 10px 10px 0 0;
    margin: 0 5px;
    background: ${props => props.isActive ? "grey" : COLORS.pink};
    font-weight: ${props => props.isActive ? "normal" : "bold" };
`

const InputWrapper = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: flex-end;
`;
const Label = styled.label`
    color: ${COLORS.white};
    text-align: right;
    padding: 0 30px 0 0;
`;
const Input = styled.input`
    color: ${COLORS.darkBackground};
    padding: 5px;
    height: 1.8rem;
    border-radius: 5px;
    border: none;
    min-width: 50px;
    width: 80%;
`;

const Select = styled.select`
    color: ${COLORS.darkBackground};
    padding: 5px;
    height: 1.8rem;
    border-radius: 5px;
    border: none;
    width: 80%;
`;
const Option = styled.option`
    height: 1.3rem;
    padding: 0 8px;
`;

export default CreateCollections;