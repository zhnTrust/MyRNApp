import React from "react";
import {
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import styled from "styled-components";
import Card from "../components/card";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU",
      }),
  };
}

class HomeScreen extends React.Component {
  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
  };

  componentDidMount() {
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setBarStyle("dark-content", true);
    StatusBar.setHidden(false);
    StatusBar.setTranslucent(true);
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5,
      }).start();

      StatusBar.setBarStyle("light-content", true);
      StatusBar.setTranslucent(false);
      StatusBar.setBackgroundColor("#546bfb");
    }
    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1,
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }
  };

  render() {
    return (
      <RootView>
        <Menu />
        {/* <StatusBarView /> */}
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity,
          }}
        >
          <ScrollView>
            <TitleBar>
              <TouchableOpacity
                onPress={this.props.openMenu}
                style={{ position: "absolute", top: 0, left: 20 }}
              >
                <Avatar source={require("../assets/avatar.png")} />
              </TouchableOpacity>
              <Title>Welcome back,</Title>
              <Name>Zhangneng</Name>
              <NotificationIcon
                style={{ position: "absolute", right: 20, top: 5 }}
              />
            </TitleBar>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ paddingLeft: 12, paddingTop: 10 }}
            >
              {logos.map((logo, index) => (
                <Logo key={index} image={logo.image} text={logo.text} />
              ))}
            </ScrollView>
            <Subtitle>Continue Learning</Subtitle>
            <ScrollView
              horizontal={true}
              style={{ paddingBottom: 30 }}
              showsHorizontalScrollIndicator={false}
            >
              {cards.map((map, index) => (
                <Card
                  key={index}
                  title={map.title}
                  image={map.image}
                  caption={map.caption}
                  logo={map.logo}
                  subtitle={map.subtitle}
                />
              ))}
            </ScrollView>
            <Subtitle>Continue Learning</Subtitle>
            {courses.map((course, index) => (
              <Course
                key={index}
                title={course.title}
                subtitle={course.subtitle}
                image={course.image}
                logo={course.logo}
                avatar={course.avatar}
                author={course.author}
                caption={course.caption}
              />
            ))}
          </ScrollView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const StatusBarView = styled.View`
  background-color: #546bfb;
  height: ${StatusBar.currentHeight};
`;

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform: uppercase;
`;

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const logos = [
  {
    image: require("../assets/avatar.png"),
    text: "Framer X",
  },
  {
    image: require("../assets/avatar.png"),
    text: "Fragme",
  },
  {
    image: require("../assets/avatar.png"),
    text: "Studio",
  },
  {
    image: require("../assets/avatar.png"),
    text: "Framer X",
  },
  {
    image: require("../assets/avatar.png"),
    text: "Framer X",
  },
  {
    image: require("../assets/avatar.png"),
    text: "Framer X",
  },
];

const cards = [
  {
    title: "React Native For Designers",
    image: require("../assets/avatar.png"),
    caption: "React Native",
    logo: require("../assets/avatar.png"),
    subtitle: "1 of 12 sections",
  },
  {
    title: "Styled Components",
    image: require("../assets/avatar.png"),
    caption: "React Native",
    logo: require("../assets/avatar.png"),
    subtitle: "2 of 12 sections",
  },
  {
    title: "Props and Icons",
    image: require("../assets/avatar.png"),
    caption: "React Native",
    logo: require("../assets/avatar.png"),
    subtitle: "3 of 12 sections",
  },
  {
    title: "Static data and loop",
    image: require("../assets/avatar.png"),
    caption: "React Native",
    logo: require("../assets/avatar.png"),
    subtitle: "4 of 12 sections",
  },
];

const courses = [
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/avatar.png"),
    logo: require("../assets/avatar.png"),
    author: "zhangneng",
    avatar: require("../assets/avatar.png"),
    caption: "Design and interative prototype",
  },
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/avatar.png"),
    logo: require("../assets/avatar.png"),
    author: "zhangneng",
    avatar: require("../assets/avatar.png"),
    caption: "Design and interative prototype",
  },
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/avatar.png"),
    logo: require("../assets/avatar.png"),
    author: "zhangneng",
    avatar: require("../assets/avatar.png"),
    caption: "Design and interative prototype",
  },
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/avatar.png"),
    logo: require("../assets/avatar.png"),
    author: "zhangneng",
    avatar: require("../assets/avatar.png"),
    caption: "Design and interative prototype",
  },
];
