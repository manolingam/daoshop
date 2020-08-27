import styled from "styled-components";
import illustration from "../../assets/raid__cloud-castle--trans.png";

const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-family: "Mirza", cursive;
    background: #000;

    @media (max-width: 1000px) {
        flex-direction: column;
    }
`;

const Container1 = styled.div`
    height: 675px;
    width: 95%;
    margin: 50px;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 100px 35px;
    border: 5px solid #ff3864;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center right;
    background-image: url(${illustration});

    @media (max-width: 1000px) {
        width: 100%;
    }

    @media (max-width: 480px) {
        height: auto;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: bottom right;
        padding-top: 25px;
        padding-bottom: 200px;
        justify-content: flex-start;
        margin: 0;
    }
`;

const SubContainer1 = styled.div`
    color: #ff3864;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    max-width: 600px;

    h1 {
        margin-top: 10px;
        font-size: 50pt;
    }

    p {
        line-height: 1.5;
        font-size: 20pt;
        color: white;
    }

    @media (max-width: 1000px) {
        h1 {
            font-size: 25pt;
        }

        p {
            font-size: 15pt;
            line-height: 1.2;
        }
    }
`;

const ConsultButton = styled.div`
    margin-top: 25px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 55px;
    width: 370px;
    font-family: "Mirza", cursive;
    border: 2px solid transparent;
    border-radius: 5px;
    background: #ff3864;
    font-size: 25pt;
    transition: all 0.15s linear;
    color: black;

    &:hover {
        cursor: pointer;
        background: #000;
        border: 2px solid #ff3864;
        color: #ff3864;
    }

    @media (max-width: 1000px) {
        font-size: 15pt;
    }

    @media (max-width: 480px) {
        height: 45px;
        width: 75%;
    }
`;

const Container2 = styled.div`
    height: 100%;
    width: 100%;
    background: #ff3864;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 20px;

    @media (max-width: 1000px) {
        width: 100%;
    }
`;

const SubContainer2 = styled.div`
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding: 25px;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    margin-bottom: 20px;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

const Card = styled.div`
    background: #000;
    color: #ff3864;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px 20px 20px;
    border-radius: 5px;
    height: 300px;

    h3 {
        font-size: 25pt;
        margin-bottom: 5px;
    }

    p {
        text-align: center;
        font-size: 15pt;
        color: white;
        line-height: 1.3;
    }

    @media (max-width: 1000px) {
        h3 {
            font-size: 20pt;
        }

        p {
            font-size: 15pt;
        }
    }

    @media (max-width: 408px) {
        h3 {
            font-size: 18pt;
        }

        p {
            font-size: 13pt;
        }
    }
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px;
    background: #000;
    width: 100%;

    img {
        max-width: 120px;
    }
`;

export {
    Main,
    Container1,
    SubContainer1,
    ConsultButton,
    Container2,
    SubContainer2,
    GridContainer,
    Card,
    Footer,
};
