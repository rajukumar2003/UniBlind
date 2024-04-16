import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoaderInner = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
`;

const LoaderLineWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  animation: rotate 2s infinite linear;
`;

const LoaderLine = styled.div`
  width: 6px; 
  height: 20%; 
  background: blue;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%; 
  animation: fade 2s infinite ease-in-out;

  &:nth-child(1) { transform: rotate(45deg); delay: -1.1s; }
  &:nth-child(2) { transform: rotate(90deg); delay: -1.0s; }
  &:nth-child(3) { transform: rotate(135deg); delay: -0.9s; }
  &:nth-child(4) { transform: rotate(180deg); delay: -0.8s; }
  &:nth-child(5) { transform: rotate(225deg); delay: -0.7s; }

  @keyframes rotate {
    100% { transform: rotate(360deg); } 
  }

  @keyframes fade {
    0%, 100% { opacity: 1; } 
    50% { opacity: 0.2; }
  }
`;

const LoadingSpinner = () => {
    return (
        <LoaderContainer>
            <LoaderInner>
                <LoaderLineWrap><LoaderLine /></LoaderLineWrap>
                <LoaderLineWrap><LoaderLine /></LoaderLineWrap>
                <LoaderLineWrap><LoaderLine /></LoaderLineWrap>
                <LoaderLineWrap><LoaderLine /></LoaderLineWrap>
                <LoaderLineWrap><LoaderLine /></LoaderLineWrap>
            </LoaderInner>
        </LoaderContainer>
    );
};

export default LoadingSpinner;

