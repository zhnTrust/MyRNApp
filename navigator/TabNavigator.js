import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Section: SectionScreen
});

const CoursesStack = createStackNavigator({
  Courses: CourseScreen
});

const ProjectStack = createStackNavigator({
  Projects: ProjectScreen
});

const TabNavigator = createBottomTabNavigator({
  HomeStack,
  CoursesStack,
  ProjectStack
});

export default TabNavigator;
