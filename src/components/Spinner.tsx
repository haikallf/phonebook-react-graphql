import styled from "@emotion/styled";
import React from "react";

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.1);
`;
const SpinnerCore = styled.div`
  border: 10px solid #f3f3f3;
  border-top: 10px solid #000000;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;

  @keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

interface SpinnerProps {
  text: String;
}

const Spinner: React.FC<SpinnerProps> = ({ text }) => {
  return (
    <SpinnerContainer>
      <SpinnerCore />
      <p>{text}</p>
    </SpinnerContainer>
  );
};

export default Spinner;
