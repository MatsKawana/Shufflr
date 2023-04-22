import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import { COLORS } from "./constants";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <Text>Log Out</Text>
    </Button>
  );
};

const Button = styled.button`
    background: ${COLORS.pink};
    color: ${COLORS.white};
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 1.1rem;
    font-family: "Montserrat";
    &:hover {
      background: ${COLORS.lightBlue};
      color: ${COLORS.darkBackground};
    }
`

const Text = styled.span`
    padding: 0 5px;
`

export default LogoutButton;