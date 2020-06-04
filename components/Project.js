import React from "react";
import styled from "styled-components";
import {
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from "react-native";

import { connect } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

function mapStateToProps(state) {
  return {
    action: state.action
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openCard: () =>
      dispatch({
        type: "OPEN_CARD"
      }),
    closeCard: () =>
      dispatch({
        type: "CLOSE_CARD"
      })
  };
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

class Project extends React.Component {
  state = {
    cardWidth: new Animated.Value(290),
    cardHeight: new Animated.Value(450),
    titleTop: new Animated.Value(20),
    opacity: new Animated.Value(0),
    textHeight: new Animated.Value(100)
  };

  openCard = () => {
    if (!this.props.canOpen) return;
    //放大卡片 宽高
    Animated.spring(this.state.cardWidth, { toValue: screenWidth }).start();
    Animated.spring(this.state.cardHeight, {
      toValue: screenHeight
    }).start();
    //调整标题和关闭按钮
    Animated.spring(this.state.titleTop, { toValue: 40 }).start();
    Animated.spring(this.state.opacity, { toValue: 1 }).start();
    //打开文本
    Animated.spring(this.state.textHeight, { toValue: 1000 }).start();

    //将事件发送到redux
    this.props.openCard();

    // StatusBar.setHidden(true);
  };

  closeCard = () => {
    Animated.spring(this.state.cardWidth, { toValue: 290 }).start();
    Animated.spring(this.state.cardHeight, {
      toValue: 450
    }).start();
    Animated.spring(this.state.titleTop, { toValue: 20 }).start();
    Animated.spring(this.state.opacity, { toValue: 0 }).start();
    Animated.spring(this.state.textHeight, { toValue: 100 }).start();
    // StatusBar.setHidden(false);

    //将事件发送到redux
    this.props.closeCard();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.openCard}>
        <AnimatedContainer
          style={{
            width: this.state.cardWidth,
            height: this.state.cardHeight
          }}
        >
          <Cover>
            <Image source={this.props.image} />
            <AnimatedTitle style={{ top: this.state.titleTop }}>
              {this.props.title}
            </AnimatedTitle>
            <Author>{this.props.author}</Author>
          </Cover>
          <AnimatedText style={{ height: this.state.textHeight }}>
            {this.props.text}
          </AnimatedText>
          <AnimatedLinearGradient
            colors={["rgba(255,255,255, 0)", "rgba(255,255,255, 1)"]}
            style={{
              position: "absolute",
              top: 310,
              width: "100%",
              height: this.state.textHeight
            }}
          />
          <Animated.View
            style={{
              position: "absolute",
              top: this.state.titleTop,
              right: 20,
              opacity: this.state.opacity
            }}
          >
            <TouchableOpacity onPress={this.closeCard}>
              <CloseView>
                <Ionicons name="ios-close" size={32} color="#546bfb" />
              </CloseView>
            </TouchableOpacity>
          </Animated.View>
        </AnimatedContainer>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);

const Container = styled.View`
  width: 290px;
  height: 450px;
  background: white;
  border-radius: 10px;

  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  elevation: 20;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Cover = styled.View`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 300px;
`;

const AnimatedTitle = Animated.createAnimatedComponent(Title);

const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`;

const AnimatedText = new Animated.createAnimatedComponent(Text);

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);
