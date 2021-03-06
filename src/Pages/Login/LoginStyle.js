import React from 'react';
import styled from 'styled-components';

export const Formbody = styled.div`
  background: linear-gradient(to top right, #66ff99 0%, #339966 100%);
`;

export const FormGroup = styled.div`
  color: white;
  width: 300px;
  margin: 70px auto;
`;

export const Label = styled.label`
  margin-bottom: 0.5em;
  color: Black;
`;

export const Input = styled.input`
  padding: 0.5em;
  color: black;
  background: white;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
`;

export const Message = styled.label`
  margin-bottom: 0.5em;
  color: palevioletred;
`;

export const Button = styled.button`
  background-color: #ba4e3b;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  width: 200px;
  font-size: 16px;
  opacity: 0.9;
  font-weight: bold;
`;
export const Wrapper = styled.div`
  &:hover ${Button} {
    opacity: 1;
  }
`;
