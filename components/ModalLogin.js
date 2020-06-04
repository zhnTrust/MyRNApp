import React from "react";
import styled from "styled-components";
import { BoxShadow } from "react-native-shadow";
import {
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Animated,
  Dimensions,
  AsyncStorage
} from "react-native";
import { EmailIcon, PasswordIcon } from "./Icons";
import { BlurView } from "expo-blur";
import Success from "./Success";
import Loading from "./Loading";
import { connect } from "react-redux";
import firebase from "./FireBase";
import { saveState } from "./AsyncStorage";

const shadowOptLoginBtn = {
  width: 230,
  height: 50,
  color: "#c2cbff",
  border: 20,
  radius: 10,
  opacity: 0.2,
  x: 0,
  y: 10,
  style: { marginVertical: 0 }
};

const screenHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    closeLogin: () =>
      dispatch({
        type: "CLOSE_LOGIN"
      }),
    updateName: (name) => {
      dispatch({
        type: "UPDATE_NAME",
        name
      });
    },
    updateAvatar: (avatar) => {
      dispatch({
        type: "UPDATE_AVATAR",
        avatar
      });
    }
  };
}

function getFocusColor(isFocus) {
  return isFocus ? "#4775f2" : "#bfbfbf";
}

class ModalLogin extends React.Component {
  state = {
    email: "",
    password: "",
    emailColor: "#bfbfbf",
    passwordColor: "#bfbfbf",
    isSuccessful: false,
    isLoading: false,
    top: new Animated.Value(screenHeight),
    scale: new Animated.Value(1.3),
    translateY: new Animated.Value(0)
  };

  componentDidUpdate() {
    if (this.props.action === "openLogin") {
      Animated.timing(this.state.top, { toValue: 0, duration: 0 }).start();
      //由大到小，弹性效果
      Animated.spring(this.state.scale, { toValue: 1 }).start();
      Animated.timing(this.state.translateY, {
        toValue: 0,
        duration: 0
      }).start();
    }

    if (this.props.action === "closeLogin") {
      // 0.5秒后消失并恢复大小
      setTimeout(() => {
        Animated.timing(this.state.top, {
          toValue: screenHeight,
          duration: 0
        }).start();
        Animated.spring(this.state.scale, { toValue: 1.3 }).start();
      }, 500);

      //先下落0.5秒
      Animated.timing(this.state.translateY, {
        toValue: 1000,
        duration: 500
      }).start();
    }
  }

  handleLogin = () => {
    const email = this.state.email;
    const password = this.state.password;

    console.log(email, password);
    //显示加载
    this.setState({
      isLoading: true
    });

    //模拟请求成功在2秒后
    setTimeout(() => {
      //关闭加载 显示成功
      this.setState({ isLoading: false });
      this.setState({ isSuccessful: true });

      // Alert.alert("Congrats", "you've logged successfully!");

      //保存并显示
      // this.storeName(email);
      this.fetchUser();
      //无缝衔接，
      this.props.updateName(email);

      //消失提示框
      setTimeout(() => {
        this.props.closeLogin();
        this.setState({ isSuccessful: false });
      }, 1000);
    }, 2000);

    //请求（可惜此路有墙）
    //   firebase
    //     .auth()
    //     .signInWithEmailAndPassword(email, password)
    //     .catch((error) => {
    //       Alert.alert("Error", error.message);
    //       console.log("error:", error.message);
    //     })
    //     .then((response) => {
    //       console.log("response:", response);
    //       //消失提示框
    //       this.setState({ isLoading: false });
    //       if (response) {
    //         //显示成功框
    //         this.setState({ isSuccessful: true });
    //         //消失提示框，删除成功动画
    //         setTimeout(() => {
    //           this.props.closeLogin();
    //           this.setState({ isSuccessful: false });
    //         }, 1000);
    //       }
    //     });
  };

  fetchUser = () => {
    fetch(
      "https://uifaces.co/api?limit=1&gender[]=female&from_age=10&o_age=18&emotion[]=happiness",
      {
        headers: {
          "X-API-KEY": "d35c3ae4252f5481a83c741e62bb3e"
        }
      }
    )
      .then((response) => response.json())
      .then((response) => {
        const user = response[0];
        console.log("ModalLogin -> fetchUser -> user", user);

        const name = user.name;
        const avatar = user.photo;
        // const name = "zhn";
        // const avatar =
        //   "http://p23.f4.n0.cdn.getcloudapp.com/items/5zu1jZnG/avatar.png";

        saveState({ name, avatar });
        this.props.updateName(name);
        this.props.updateAvatar(avatar);
      });
  };

  focusEmial = () => {
    this.setState({
      emailColor: getFocusColor(true),
      passwordColor: getFocusColor(false)
    });
  };

  focusPassword = () => {
    this.setState({
      emailColor: getFocusColor(false),
      passwordColor: getFocusColor(true)
    });
  };

  tapBackground = () => {
    Keyboard.dismiss();
    this.props.closeLogin();
  };

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <TouchableWithoutFeedback onPress={this.tapBackground}>
          <BlurView
            tint="default"
            intensity={100}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
        </TouchableWithoutFeedback>
        <AnimatedModal
          style={{
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY }
            ]
          }}
        >
          <Logo source={require("../assets/avatar.png")} />
          <Text>Start Learning. Access Pro Content.</Text>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
            onFocus={this.focusEmial}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            onFocus={this.focusPassword}
          />
          <EmailIconView>
            <EmailIcon size={32} color={this.state.emailColor} />
          </EmailIconView>
          <PasswordIconView>
            <PasswordIcon size={28} color={this.state.passwordColor} />
          </PasswordIconView>
          <BoxShadow setting={shadowOptLoginBtn}>
            <TouchableOpacity onPress={this.handleLogin}>
              <Button>
                <ButtonText>Log In</ButtonText>
              </Button>
            </TouchableOpacity>
          </BoxShadow>
        </AnimatedModal>
        <Success isActive={this.state.isSuccessful} />
        <Loading isActive={this.state.isLoading} />
      </AnimatedContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Modal = styled.View`
  width: 280px;
  height: 370px;
  background: white;
  border-radius: 10px;

  align-items: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  elevation: 20;
`;

const AnimatedModal = Animated.createAnimatedComponent(Modal);

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;

const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  color: #b8bece;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 230px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 44px;
`;

const Button = styled.View`
  margin-top: 20px;
  background: #5263ff;
  width: 230px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
`;

const EmailIconView = styled.View`
  position: absolute;
  top: 173px;
  left: 31px;
  width: 32px;
  height: 32px;
`;

const PasswordIconView = styled.View`
  position: absolute;
  top: 238px;
  left: 33px;
  width: 28px;
  height: 28px;
`;
