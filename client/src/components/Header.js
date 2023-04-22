import { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "./constants";
import { SIZES } from "./constants";
import { useAuth0 } from "@auth0/auth0-react";

// Components
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { UserContext, isAuthenticated } from "./UserContext";
import { IoPersonCircleOutline } from "react-icons/io5";
import Search from "./Search";
import LogoHeader from "./LogoHeader";

const Header = () => {
    const {user, isAuthenticated} = useContext(UserContext);
    const { loginWithRedirect } = useAuth0();

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "none",
        fontFamily: "Montserrat",
        color: COLORS.pink,
        fontSize: "1.1rem",
        fontWeight: "bold",
    }

    const inactiveStyle = {
        fontWeight: "bold",
        textDecoration: "none",
        fontFamily: "Montserrat",
        color: COLORS.white,
        color: "inherit",
        fontSize: "1.1rem",
        fontWeight: "normal",
    }

    return (
        <Outer>
        <Wrapper>
            <LogoContainer>
                <LogoHeader />
                <Title to="/">Shufflr<C>TM</C></Title>
            </LogoContainer>
            {isAuthenticated 
            ?
            <LinkWrap>
                <NavLink to="/collections" style={({isActive}) =>
                    isActive ? activeStyle : inactiveStyle}>
                    <Text>Collections</Text>
                </NavLink>
                <NavLink to="/cards" style={({isActive}) =>
                    isActive ? activeStyle : inactiveStyle}>
                    <Text>Cards</Text>
                </NavLink>
                <NavLink to="/create" style={({isActive}) =>
                    isActive ? activeStyle : inactiveStyle}>
                    <Text>Create</Text>
                </NavLink>

                <Search />

                <ProfileIcon to="/profile" style={({isActive}) =>
                    isActive ? activeStyle : inactiveStyle}>
                    <IoPersonCircleOutline size={"1.5rem"} />
                </ProfileIcon>
                <Link to="/account">
                    {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
                </Link>
            </LinkWrap>
            : 
            <LinkWrap>
                <NavLink onClick={() => loginWithRedirect()} style={({isActive}) =>
                    inactiveStyle}>
                    <Text>Collections</Text>
                </NavLink>
                <NavLink onClick={() => loginWithRedirect()} style={({isActive}) =>
                    inactiveStyle}>
                    <Text>Cards</Text>
                </NavLink>
                <NavLink onClick={() => loginWithRedirect()} style={({isActive}) =>
                    inactiveStyle}>
                    <Text>Create</Text>
                </NavLink>

                <Search />

                <ProfileIcon onClick={() => loginWithRedirect()}>
                    <IoPersonCircleOutline size={"1.5rem"} />
                </ProfileIcon>
                <Link to="/account">
                    {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
                </Link>
            </LinkWrap>
            }
            
        </Wrapper>
        </Outer>

    )
}

const Outer = styled.div`
    border-bottom: 2px solid ${COLORS.white};
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    color: ${COLORS.white};
    height: ${SIZES.headerHeight};
    max-width: ${SIZES.containerMaxWidth};
    padding: 30px;
`
const Title = styled(Link)`
    text-decoration: none;
    font-family: "Montserrat";
    color: ${COLORS.white};
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: .08rem;
    /* padding-right: 15px; */
    position: relative;
`
const C = styled.span`
    font-size: .5rem;
    font-weight: normal;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    position: absolute;
    top: 5px;
`

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
`

const LinkWrap = styled.div`
    display: flex;
    align-items: center;
`

const Text = styled.span`
    padding: 0 10px;
`

const ProfileIcon = styled(Link)`
    padding: 10px;
    text-decoration: none;
    color: ${COLORS.white};
`

export default Header;