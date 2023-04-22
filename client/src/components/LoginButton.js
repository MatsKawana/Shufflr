import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import { COLORS } from "./constants";


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>
      <Text>Log In</Text>
    </Button>;
};

const Button = styled.button`
    background: ${COLORS.lightBlue};
    color: ${COLORS.white};
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 1.1rem;
    font-family: "Montserrat";
    &:hover {
        background: ${COLORS.pink};
        color: ${COLORS.darkBackground};
    }
`

const Text = styled.span`
    padding: 0 5px;
`

export default LoginButton;