import React from "react";
import styled from "styled-components";

const Course = (props) => (
  <Container>
    <Cover>
      <Image source={props.image} />
      <Logo source={props.logo} resizeMode="contain" />
      <Subtitle>{props.subtitle}</Subtitle>
      <Title>{props.title}</Title>
    </Cover>
    <Content>
      <Avator source={props.avatar} />
      <Caption>{props.caption}</Caption>
      <Author>Tought by {props.author}</Author>
    </Content>
  </Container>
);

export default Course;

const Container = styled.View`
  background: white;
  height: 335px;
  margin: 10px 20px;
  border-radius: 14px;
  elevation: 10;
`;

const Cover = styled.View`
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  height: 260px;
  overflow: hidden;
  justify-content: flex-end;
`;

const Image = styled.Image`
  height: 100%;
  width: 100%;
  position: absolute;
`;

const Logo = styled.Image`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  margin-left: 20px;
`;

const Title = styled.Text`
  width: 170px;
  left: 0;
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin-top: 4px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const Content = styled.View`
  padding-left: 62px;
  justify-content: center;
  height: 75px;
`;

const Avator = styled.Image`
  border-radius: 16px;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Caption = styled.Text`
  font-size: 14px;
  color: #3c4560;
  font-weight: 500;
  margin-top: 4px;
`;

const Author = styled.Text`
  font-size: 13px;
  color: #b8bece;
  font-weight: 500;
  margin-top: 4px;
`;
