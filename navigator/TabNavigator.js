import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import styled from "styled-components";
import CourseScreen from "../screens/CoursesScreen";
import HomeScreen from "../screens/HomeScreen";
import ProjectScreen from "../screens/ProjectsScreen";
import SectionScreen from "../screens/SectionScreen";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Section: SectionScreen
  },
  {
    mode: "modal"
  }
);

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

HomeStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  var routeName = navigation.state.routes[navigation.state.index].routeName;
  if (routeName == "Section") {
    tabBarVisible = false;
  }
  return {
    tabBarVisible: tabBarVisible,
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name="ios-home"
        size={26}
        color="green"
        color={focused ? activeColor : inactiveColor}
      />
    )
  };
};

const CoursesStack = createStackNavigator({
  Courses: CourseScreen
});

CoursesStack.navigationOptions = {
  tabBarLabel: "Course",
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-albums"
      size={26}
      color="green"
      color={focused ? activeColor : inactiveColor}
    />
  )
};

const ProjectStack = createStackNavigator({
  Projects: ProjectScreen
});

ProjectStack.navigationOptions = {
  tabBarLabel: "Project",
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-folder"
      size={26}
      color="green"
      color={focused ? activeColor : inactiveColor}
    />
  )
};

const TabNavigator = createBottomTabNavigator({
  HomeStack,
  CoursesStack,
  ProjectStack
});

export default TabNavigator;

const IconView = styled.Image`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`;
