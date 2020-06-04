import React from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  CardIcon,
  CloseIcon,
  CompassIcon,
  ExitIcon,
  SettingIcon
} from "./Icons";
import MenuItem from "./MenuItem";

function mapStoreToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () =>
      dispatch({
        type: "CLOSE_MENU"
      }),
    updataName: (name) => {
      dispatch({
        type: "UPDATE_NAME",
        name
      });
    },
    updateAvatar: (avatar) => {
      const action = {
        type: "UPDATE_AVATAR",
        avatar
      };
      console.log(
        "Menu -> mapDispatchToProps -> updateAvatar -> action",
        action
      );
      dispatch(action);
    }
  };
}

const screenHeight = Dimensions.get("window").height + StatusBar.currentHeight;

class Menu extends React.Component {
  state = {
    // 动画值
    top: new Animated.Value(screenHeight)
  };

  componentDidMount() {
    this.toggleMenu();
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    // 状态是打开，则关闭
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.top, {
        toValue: 54
      }).start();
    }

    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.top, {
        toValue: screenHeight
      }).start();
    }
  };

  handleMenu = (index) => {
    if (index === 3) {
      this.props.closeMenu();
      this.props.updataName("Stranger");
      this.props.updateAvatar(
        "http://p23.f4.n0.cdn.getcloudapp.com/items/DOuQlXJv/avatar_none.png"
      );
      AsyncStorage.clear();
    }
  };

  render() {
    return (
      // 动画组件
      <AnimatedContainer style={{ top: this.state.top }}>
        <Cover>
          <Image source={require("../assets/avatar.png")} />
          <Title>zhangneng</Title>
          <Subtitle>Designer at Design+Code</Subtitle>
        </Cover>
        <TouchableOpacity
          onPress={this.props.closeMenu}
          style={{
            position: "absolute",
            top: 120,
            left: "50%",
            marginLeft: -22,
            zIndex: 1
          }}
        >
          <ClostView>
            <CloseIcon color="#546bfb" size={40} />
          </ClostView>
        </TouchableOpacity>
        <Content>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                this.handleMenu(index);
              }}
            >
              <MenuItem icon={item.icon} title={item.title} text={item.text} />
            </TouchableOpacity>
          ))}
        </Content>
      </AnimatedContainer>
    );
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Menu);

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

// 动画容器
const AnimatedContainer = Animated.createAnimatedComponent(Container);

// 垂直居中
// justify-content: center;
// 水平居中
// align-items: center;
const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`;

const ClostView = styled.View`
  height: 44px;
  width: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  elevation: 10;
`;

const Content = styled.View`
  height: ${screenHeight};
  background: #f0f3f5;
  padding: 50px;
`;
const items = [
  {
    icon: <SettingIcon />,
    title: "Account",
    text: "settings"
  },
  {
    icon: <CardIcon />,
    title: "Billing",
    text: "payments"
  },
  {
    icon: <CompassIcon />,
    title: "Learn React",
    text: "start course"
  },
  {
    icon: <ExitIcon />,
    title: "log out",
    text: "see you soon?"
  }
];
