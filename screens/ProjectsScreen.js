import React from "react";
import styled from "styled-components";
import Project from "../components/Project";
import { PanResponder, Animated } from "react-native";

import { connect } from "react-redux";

function mapStateToProps(state) {
  return { action: state.action };
}

function getNextIndex(index) {
  var nextIndex = index + 1;
  if (nextIndex > projects.length - 1) {
    return 0;
  }
  return nextIndex;
}

class ProjectScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    pan: new Animated.ValueXY(),
    //第二个的初始状态
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44),
    //第三个的初始状态
    thirdScale: new Animated.Value(0.8),
    thirdTranslateY: new Animated.Value(-50),
    index: 0,
    opacity: new Animated.Value(0)
  };

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        //解决 平移手势 和 点击手势 的冲突
        if (gestureState.dx === 0 && gestureState.dy === 0) {
          return false;
        } else {
          if (this.props.action === "openCard") {
            return false;
          } else {
            return true;
          }
        }
      },

      onPanResponderGrant: () => {
        //第二个取代第一的位置
        Animated.spring(this.state.scale, { toValue: 1 }).start();
        Animated.spring(this.state.translateY, { toValue: 0 }).start();

        //第三个取代第二个的位置
        Animated.spring(this.state.thirdScale, { toValue: 0.9 }).start();
        Animated.spring(this.state.thirdTranslateY, { toValue: 44 }).start();
        Animated.spring(this.state.opacity, { toValue: 1 }).start();
      },

      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),

      onPanResponderRelease: () => {
        const positionX = this.state.pan.x.__getValue();
        const positionY = this.state.pan.y.__getValue();

        console.log("positionY", positionY);
        console.log("positionX", positionX);
        Animated.spring(this.state.opacity, { toValue: 0 }).start();

        if (
          positionX < -150 ||
          positionX > 150 ||
          positionY < -200 ||
          positionY > 200
        ) {
          //大于则丢出（y=1000）
          Animated.timing(this.state.pan, {
            toValue: { x: 0, y: 1000 }
          }).start((obj) => {
            console.log("start end");

            console.log(obj);
            this.state.pan.setValue({ x: 0, y: 0 });

            this.state.scale.setValue(0.9);
            this.state.translateY.setValue(44);
            this.state.thirdScale.setValue(0.8);
            this.state.thirdTranslateY.setValue(-50);

            this.setState({ index: getNextIndex(this.state.index) });
          });
        } else {
          //否则恢复
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 }
          }).start();
          Animated.spring(this.state.scale, { toValue: 0.9 }).start();
          Animated.spring(this.state.translateY, { toValue: 44 }).start();

          Animated.spring(this.state.thirdScale, { toValue: 0.8 }).start();
          Animated.spring(this.state.thirdTranslateY, { toValue: -50 }).start();
        }
      }
    });
  }

  render() {
    return (
      <Container>
        <AnimatedMask style={{ opacity: this.state.opacity }} />
        <Animated.View
          style={{
            transform: [
              { translateX: this.state.pan.x },
              { translateY: this.state.pan.y }
            ]
          }}
          {...this._panResponder.panHandlers}
        >
          <Project
            title={projects[this.state.index].title}
            image={projects[this.state.index].image}
            author={projects[this.state.index].author}
            text={projects[this.state.index].text}
            canOpen={true}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY }
            ]
          }}
        >
          <Project
            title={projects[getNextIndex(this.state.index)].title}
            image={projects[getNextIndex(this.state.index)].image}
            author={projects[getNextIndex(this.state.index)].author}
            text={projects[getNextIndex(this.state.index)].text}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -3,
            justifyContent: "center",
            alignItems: "center",
            transform: [
              { scale: this.state.thirdScale },
              { translateY: this.state.thirdTranslateY }
            ]
          }}
        >
          <Project
            title={projects[getNextIndex(this.state.index + 1)].title}
            image={projects[getNextIndex(this.state.index + 1)].image}
            author={projects[getNextIndex(this.state.index + 1)].author}
            text={projects[getNextIndex(this.state.index + 1)].text}
          />
        </Animated.View>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(ProjectScreen);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`;

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: -3;
`;
const AnimatedMask = Animated.createAnimatedComponent(Mask);

const Text = styled.Text``;

const projects = [
  {
    title: "Price Tag",
    image: require("../assets/background.jpg"),
    author: "zhangneng",
    text:
      "Thanks to Design+Code, I Improved my skill and learned to do animations for my app Price Tag, a top news app in China.Thanks to Design+Code, I Improved my skill and learned to do animations for my app Price Tag, a top news app in China."
  },
  {
    title: "Price Tag",
    image: require("../assets/background.jpg"),
    author: "zhangneng1",
    text:
      "Thanks to Design+Code, I Improved my skill and learned to do animations for my app Price Tag, a top news app in China."
  },
  {
    title: "Price Tag",
    image: require("../assets/background.jpg"),
    author: "zhangneng2",
    text:
      "Thanks to Design+Code, I Improved my skill and learned to do animations for my app Price Tag, a top news app in China."
  }
];
