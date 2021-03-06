import React from 'react';
import Styled from 'styled-components';
export const ProgressBarLi = Styled.li`
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  width: 90px;
  height: 90px;
  font-size: 16px;
  background-color:${(props) => props.theme.main};
  border-radius: 50%;
  float: left;
  margin-top: 9%;
`;
export const BarLi = Styled.li`
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 150px;
  height: 10px;
  background-color: ${(props) => props.theme.main};
  float: left;
  margin-top: 16.5%;
`;

export const ProgressBarLiTwo = Styled.li`
list-style-type: none;
display: flex;
justify-content: center;
align-items: center;
color: black;
width: 90px;
height: 90px;
font-size: 16px;
background-color:${(props) => props.themeTwo.main};
border-radius: 50%;
float: left;
margin-top: 9%;
`;
export const BarLiTwo = Styled.li`
list-style-type: none;
display: flex;
justify-content: center;
align-items: center;
color: white;
width: 150px;
height: 10px;
background-color: ${(props) => props.themeTwo.main};
float: left;
margin-top: 16.5%;
`;

export const ProgressBarLiThree = Styled.li`
list-style-type: none;
display: flex;
justify-content: center;
align-items: center;
color: black;
width: 90px;
height: 90px;
font-size: 16px;
background-color:${(props) => props.themeThree.main};
border-radius: 50%;
float: left;
margin-top: 9%;
`;
export const BarLiThree = Styled.li`
list-style-type: none;
display: flex;
justify-content: center;
align-items: center;
color: white;
width: 150px;
height: 10px;
background-color: ${(props) => props.themeThree.main};
float: left;
margin-top: 16.5%;
`;
