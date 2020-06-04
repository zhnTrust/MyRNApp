import React from "react";
import { StatusBar, TouchableOpacity, Linking } from "react-native";
import { WebView } from "react-native-webview";
import styled from "styled-components";
import { CloseIcon } from "../components/Icons";

class SectionScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  componentDidMount() {
    StatusBar.setBarStyle("light-content");
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor("white", true);
  }

  render() {
    const { navigation } = this.props;
    const section = navigation.getParam("section");
    const currentHeight = StatusBar.currentHeight;

    return (
      <Container>
        {/* <StatusBar
          animated={true}
          hidden={false}
          backgroundColor={"transparent"}
          translucent={true}
          barStyle={"light-content"}
          showHideTransition={"slide"}
        /> */}
        <Cover>
          <Image source={section.image} />
          <Wrapper style={{ top: 20 + currentHeight }}>
            <Logo source={section.logo} />
            <Subtitle>{section.subtitle}</Subtitle>
          </Wrapper>
          <Title>{section.title}</Title>
          <Caption>{section.caption}</Caption>
        </Cover>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: currentHeight,
            right: 20,
            marginTop: 20
          }}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        >
          <CloseView>
            <CloseIcon size={32} color="#4775f2" />
          </CloseView>
        </TouchableOpacity>
        <Content>
          <WebView
            source={{ html: htmlContent + htmlStyle }}
            scalesPageToFit={false}
            scrollEnabled={false}
            ref="webview"
            onNavigationStateChange={(event) => {
              console.log(event);
              if (event.url !== "about:blank") {
                this.refs.webview.stopLoading();
                Linking.openURL(event.url);
              }
            }}
          />
        </Content>
      </Container>
    );
  }
}

export default SectionScreen;

const htmlContent = `
  <h2>This is a title</h2>
  <p>This <strong>is</strong> a <a href="http://bing.com">link</a></p>
  <img src="https://p23.f4.n0.cdn.getcloudapp.com/items/E0uzG7NJ/background.jpg"/>
`;

const htmlStyle = `
  <style>
    *{
      font-family:-apple-system, Roboto;
      margin:0;
      padding:0;
    }
    img{
      width:100%;
      border-radius:10px;
      margin-top:20px;
    }
  </style>
`;

const Content = styled.View`
  background-color: white;
  height: 100%;
  padding: 20px;
`;

const Container = styled.View`
  flex: 1;
`;
const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;

  align-content: center;
  justify-content: center;
  elevation: 5;
`;

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  left: 20px;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;
