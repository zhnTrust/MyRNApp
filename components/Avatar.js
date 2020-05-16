import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    name: state.name
  };
}

function mapDispatchToProps(dispatch) {
  return {
    upadateName: (name) =>
      dispatch({
        type: "UPDATE_NAME",
        name: name
      })
  };
}

class Avatar extends React.Component {
  state = {
    // photo:"https://share.getcloudapp.com/DOuQlXJv"
    photo:
      "https://p23.f4.n0.cdn.getcloudapp.com/items/DOuQlXJv/avatar_none.png"

    // photo:"https://share.getcloudapp.com/5zu1jZnG"
    // photo: "https://p23.f4.n0.cdn.getcloudapp.com/items/5zu1jZnG/avatar.png",
  };

  componentDidMount() {
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
        console.log(response);
        // response[0].photo有墙，我吐了！！
        this.setState({
          photo: response[0].photo
        });

        //send infomation
        this.props.upadateName(response[0].name);
      });
  }

  render() {
    return <Image source={{ uri: this.state.photo }} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
