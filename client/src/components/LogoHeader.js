import { TbRectangleVerticalFilled } from "react-icons/tb";
import { COLORS, COLORSARRAY } from "./constants";
import styled from "styled-components";

const LogoHeader = () => {

    return (
        <Wrapper>
            <TbRectangleVerticalFilled size={"10px"} style={{
                color: COLORS.pink,
                transform: "scale(1.3, 1)"
            }}/>
            <TbRectangleVerticalFilled size={"10px"} style={{
                color: COLORS.lightBlue,
                transform: "scale(1.3, 1)"
            }}/>
            <TbRectangleVerticalFilled size={"10px"} style={{
                color: COLORS.yellow,
                transform: "scale(1.3, 1)"
            }}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 50px;
    width: 15px;
    display: flex;
    flex-direction: column;
    transform: translateY(10px);
`

export default LogoHeader;