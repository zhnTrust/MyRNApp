import React from "react";
import {
  Animated,
  Easing,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import Card from "../components/card";
import Course from "../components/Course";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Menu from "../components/Menu";
import ModalLogin from "../components/ModalLogin";

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU"
      }),
    openLogin: () =>
      dispatch({
        type: "OPEN_LOGIN"
      })
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
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
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5
      }).start();

      StatusBar.setBarStyle("light-content", true);
      StatusBar.setTranslucent(false);
      StatusBar.setBackgroundColor("#546bfb");
    }
    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }
  };

  handleAvatar = () => {
    if (this.props.name !== "Stranger") {
      this.props.openMenu();
    } else {
      this.props.openLogin();
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
            opacity: this.state.opacity
          }}
        >
          <ScrollView>
            <TitleBar>
              <TouchableOpacity
                onPress={this.handleAvatar}
                style={{ position: "absolute", top: 0, left: 20 }}
              >
                <Avatar />
              </TouchableOpacity>
              <Title>Welcome back,</Title>
              <Name>{this.props.name}</Name>
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
              {cards.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.props.navigation.push("Section", {
                      section: card
                    });
                  }}
                >
                  <Card
                    title={card.title}
                    image={card.image}
                    caption={card.caption}
                    logo={card.logo}
                    subtitle={card.subtitle}
                  />
                </TouchableOpacity>
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
        <ModalLogin />
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

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
    text: "Framer X"
  },
  {
    image: require("../assets/avatar.png"),
    text: "Fragme"
  },
  {
    image: require("../assets/avatar.png"),
    text: "Studio"
  },
  {
    image: require("../assets/avatar.png"),
    text: "Framer X"
  },
  {
    image: require("../assets/avatar.png"),
    text: "Framer X"
  },
  {
    image: require("../assets/avatar.png"),
    text: "Framer X"
  }
];

const cards = [
  {
    title: "React Native For Designers",
    image: require("../assets/background.jpg"),
    caption: "React Native",
    logo: require("../assets/avatar.png"),
    subtitle: "1 of 12 sections"
  },
  {
    title: "Styled Components",
    image: require("../assets/background.jpg"),
    caption: "React Native",
    logo: require("../assets/avatar.png"),
    subtitle: "2 of 12 sections"
  },
  {
    title: "Props and Icons",
    image: require("../assets/background.jpg"),
    caption: "React Native",
    logo: require("../assets/avatar.png"),
    subtitle: "3 of 12 sections"
  },
  {
    title: "Static data and loop",
    image: require("../assets/background.jpg"),
    caption: "React Native",
    logo: require("../assets/avatar.png"),
    subtitle: "4 of 12 sections"
  }
];

const courses = [
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/background.jpg"),
    logo: require("../assets/avatar.png"),
    author: "zhangneng",
    avatar: require("../assets/avatar.png"),
    caption: "Design and interative prototype"
  },
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/background.jpg"),
    logo: require("../assets/avatar.png"),
    author: "zhangneng",
    avatar: require("../assets/avatar.png"),
    caption: "Design and interative prototype"
  },
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/background.jpg"),
    logo: require("../assets/avatar.png"),
    author: "zhangneng",
    avatar: require("../assets/avatar.png"),
    caption: "Design and interative prototype"
  },
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/background.jpg"),
    logo: require("../assets/avatar.png"),
    author: "zhangneng",
    avatar: require("../assets/avatar.png"),
    caption: "Design and interative prototype"
  }
];
