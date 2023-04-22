import styled, { keyframes } from "styled-components"
import { useEffect, useState, useContext } from "react";
import { useInView } from 'react-intersection-observer';

// Components
import { COLORS, SIZES } from "./constants";
import { UserContext } from "./UserContext";
import LogoAnimation from "./LogoAnimation"
import Footer from "./Footer";
import { HappyAnnouncement, Insert, MediaPlayer, Personalization, ContentStructure } from "./HomepageImages";

const Homepage = () => {
    const {userId, isAuthenticated, user} = useContext(UserContext);
    const {ref, inView, entry} = useInView({triggerOnce: true})
    const {ref: ref2, inView: inView2} = useInView({triggerOnce: true})
    const {ref: ref3, inView: inView3} = useInView({triggerOnce: true})
    const {ref: ref4, inView: inView4} = useInView({triggerOnce: true})

    return (
        <Wrapper>
            <LogoSection>
                <LogoAnimation />
            </LogoSection>
            { isAuthenticated && user.nickname.length > 0 
                ? <Greeting>Welcome back, {user.nickname}!</Greeting>
                : <Greeting> Hey there! </Greeting>
            }
            <BannerSection>
                <HappyAnnouncement/>
                <TextContainer>
                    <TagLine>
                        Make Learning <span style={{color: COLORS.pink}}>Fun</span> and <span style={{color: COLORS.pink}}>Effortless</span>
                    </TagLine>
                    <SubTag> A simple, easy, and fun way to use flashcards so you can focus on learning.</SubTag>
                </TextContainer>
            </BannerSection>

            <AboutTitle>Study Any Subject</AboutTitle>
            <FlashSection>
                <FlashInnerContainer>
                    <Card style={{background: COLORS.pink}}>Music</Card>
                    <Card>Art</Card>
                    <Card style={{background: COLORS.purple}}>Math</Card>
                    <Card >Chemistry</Card>
                    <Card style={{background: COLORS.orange}}>Biology</Card>
                    <Card >Geography</Card>
                    <Card style={{background: COLORS.yellow}}>Language</Card>
                    <Card>Science</Card>
                    <Card style={{background: COLORS.lightBlue}}>Trivia</Card>
                    <Card>Business</Card>
                    <Card style={{background: COLORS.yellow}}>Legal</Card>
                    <Card >Tech</Card>
                    <Card style={{background: COLORS.purple}}>Media</Card>
                    <Card >Culture</Card>
                    <Card style={{background: COLORS.lightBlue}}>Geology</Card>
                    <Card>Astrology</Card>
                    <Card style={{background: COLORS.darkBackground}}>Design</Card>
                    <Card>Creative</Card>
                    <Card style={{background: COLORS.pink}}>Physics</Card>
                    <Card>Civics</Card>
                    <Card style={{background: COLORS.orange}}>Politics</Card>
                </FlashInnerContainer>
            </FlashSection>

            <AboutTitle>Get Started</AboutTitle>
            <Section>
                <AboutPointContainer ref={ref} inView={inView}>
                    <AboutTextBox>
                        <AboutPoint>1. <Emphasis>Create</Emphasis> a Collection</AboutPoint>
                        <AboutDetail>Collections group your cards to help keep you organized in neat piles</AboutDetail>
                    </AboutTextBox>
                    <ContentStructure />
                </AboutPointContainer>

                <AboutPointContainer ref={ref2} inView={inView2}>
                    <Insert />
                    <AboutTextBox>
                        <AboutPoint>2. <Emphasis>Add</Emphasis> Cards to Your Collections</AboutPoint>
                        <AboutDetail>Cards provide study material in questions and answers format to help make studying more enjoyable</AboutDetail>
                    </AboutTextBox>
                </AboutPointContainer>

                <AboutPointContainer ref={ref3} inView={inView3}>
                    <AboutTextBox>
                        <AboutPoint>3. <Emphasis>Review</Emphasis> Your Cards</AboutPoint>
                        <AboutDetail>Using cards to study makes it easy to learn, and there's hints to reveal if you're stuck</AboutDetail>
                    </AboutTextBox>
                    <Personalization />
                </AboutPointContainer>
                
                <AboutPointContainer ref={ref4} inView={inView4}>
                    <MediaPlayer />
                    <AboutTextBox>
                        <AboutPoint>4. <Emphasis>Quiz</Emphasis> Yourself in Focus Mode</AboutPoint>
                        <AboutDetail>If you didn't get one right, you can mark it for review to revisit them again later</AboutDetail>
                    </AboutTextBox>
                </AboutPointContainer>
            </Section>

            <Footer />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    max-width: ${SIZES.containerMaxWidth};
    `

const Section = styled.div`
    background: ${COLORS.darkBackground};
    margin-top: 15px;
    padding: 30px;
    border-radius: 25px;
    margin-bottom: 50px;
    `

const LogoSection = styled.div`
    margin: 40px 0 50px 0;
`

const Greeting = styled.p`
    font-size: 1.2rem;
    text-align: left;
    padding: 15px 5px;

    opacity: 0;
    transform: translateY(10px);
    animation: slide 1s forwards .75s;
    @keyframes slide {
        to {
        opacity: 1;
        transform: translateY(0px);
        }
    }
`
const BannerSection = styled.div`
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: white 2px solid;
    border-radius: 20px;
    margin-bottom: 50px;
    padding: 0 50px;

    opacity: 0;
    transform: translateY(10px);
    animation: slide 1s forwards .75s;
    @keyframes slide {
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`

const FlashSection = styled.div`
    height: 400px;
    border: white 2px solid;
    contain: strict;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    border-radius: 20px;

    opacity: 0;
    transform: translateY(10px);
    animation: slide 1s forwards 1s;
    @keyframes slide {
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`
const FlashInnerContainer = styled.div`
    position: absolute;
    display: flex;
    width: 110%;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    align-items: center;
    transform: rotate(-25deg);
`

const Card = styled.div`
    height: 250px;
    width: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    border-radius: 15px;
    border: white 4px solid;
`

const TextContainer = styled.div`
    font-family: "Montserrat";
    max-width: 60%;
    margin-left: 50px;
`
const TagLine = styled.p`
    font-size: 3rem;
    font-weight: bold;
    letter-spacing: .2rem;
    margin-bottom: 15px;
`

const SubTag = styled.p`
    font-size: 1rem;
`

const AboutTextBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    position: relative;
    top: 30px;
    margin: 20px;
`

const AboutPointContainer = styled.div`
    display: flex;
    justify-content: center;
    border-bottom: 1px solid ${COLORS.pink};
    padding: 30px;
    height: 350px;
    contain: strict;
    opacity: 0;
    transform: translateY(30px);
    animation: ${props => props.inView 
        ? 'slide .75s forwards .03s' 
        : 'none'};

    @keyframes slide {
        to {
            opacity: 1;
            transform: translateY(0px);
        }
    }
`;

const Emphasis = styled.span`
    font-weight: bold;
    color: ${COLORS.lightBlue};
`

const AboutTitle = styled.h2`
    color: ${COLORS.white};
    font-size: 1.8rem;
    font-weight: bold;
    font-family: "Montserrat";
    margin-bottom: 15px;

    opacity: 0;
    transform: translateY(10px);
    animation: slide 1s forwards .5s;
    @keyframes slide {
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`

const AboutPoint = styled.h3`
    color: ${COLORS.white};
    margin: 15px 0;
    font-size: 1.7rem;
    letter-spacing: .1rem;
`

const AboutDetail = styled.p`
    margin: 10px 25px;
    font-size: 1.1rem;
`

export default Homepage