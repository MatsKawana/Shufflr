import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";

// Components
import PageHeader from "./PageHeader";
import Footer from "./Footer";
import { Logic } from "./PageImages";
import Loader from "./Loader";

const Profile = () => {
    const {userData} = useContext(UserContext);

    return (
        <>
        {!userData 
        ? <Wrapper><p>Login or Create an Account</p></Wrapper> 
        : <Wrapper>
            <PageHeader pageName={'profile'}/>
            <ProfileContainer>
                <div style={{display: "flex"}}>
                    <Image src={userData[0].picture} alt={userData[0].name} />
                    <ProfileDetails>
                        <ProfileText>Name: {userData[0].name}</ProfileText>
                        {/* <ProfileText>Username: {userData[0].nickname}</ProfileText> */}
                        <ProfileText>Email: {userData[0].email}</ProfileText>
                    </ProfileDetails>
                </div>
                <Logic />
            </ProfileContainer>
            <Footer />
        </Wrapper>
        }
        </>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    padding: 30px;
`
const Image = styled.img`
    border-radius: 50%;
    max-height: 100px;
    aspect-ratio: 1;
`

const ProfileContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding-top: 30px;
`

const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
`

const ProfileText = styled.p`
    color: white;
`

export default Profile;