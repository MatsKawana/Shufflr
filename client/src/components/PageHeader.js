import styled from "styled-components";
import { COLORS, PAGEHEADER } from "./constants";
import { Friends, VerticalAddCard, Stars, PlusFile, Space } from "./PageImages";

const PageHeader = ({pageName}) => {
    const ImageComponent = PAGEHEADER[pageName].image;

    return (
        <Wrapper>
            <TextContainer>
                <Title>{PAGEHEADER[pageName].title}</Title>
                <Description>{PAGEHEADER[pageName].description}</Description>
            </TextContainer>
            <Image>
                {pageName === "collections" && <Friends />}
                {pageName === "cards" && <Stars />}
                {pageName === "create" && <PlusFile />}
                {pageName === "focus" && <Space />}
            </Image>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 200px;
    margin: 0 10px 30px 0;
    padding: 0 20px;
    border-bottom: white 1px solid;
    position: relative;
    contain: strict;
`
const TextContainer = styled.div`
    width: 60%;
`

const Title = styled.h1`
    font-size: 2.5rem;
`

const Description = styled.p`
    color: ${COLORS.lightBlue};
    margin-top: 30px;
    z-index: 1001;
`

const Image = styled.div`
    position: absolute;
    top: 0;
    right: 30px;
`

export default PageHeader;