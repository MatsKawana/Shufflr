import styled from "styled-components";
import { COLORS, SIZES } from "./constants";
import { FaDiscord, FaEnvelope, FaGithub, FaLinkedin} from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {

    return (
        <Wrapper>
            <IconContainer>
                <Mail to="mailto: mats.kawana@gmail.com"><FaEnvelope /></Mail>
                <LinkedIn to="https://linkedin.com" target="_blank"><FaLinkedin /></LinkedIn>
                <GitHub to="https://github.com" target="_blank"><FaGithub /></GitHub>
                <Discord to="https://discord.com/channels/Mats#1469" target="_blank"><FaDiscord /></Discord>
            </IconContainer>
            <FooterText>Mats Kawana 2023 © All rights reserved</FooterText>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    position: relative;
    bottom: 0;
    height: 100px;
    width: 100%;
    max-width: ${SIZES.containerMaxWidth};
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 100px;
`

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    color: ${COLORS.blue};
    padding: 10px 0;
`

const Mail = styled(Link)`
    color: ${COLORS.blue};
`
const LinkedIn = styled(Link)`
    color: ${COLORS.blue};
`
const GitHub = styled(Link)`
    color: ${COLORS.blue};
`
const Discord = styled(Link)`
    color: ${COLORS.blue};
`

const FooterText = styled.p`
    color: ${COLORS.blue};
    font-size: .8rem;
`

export default Footer;