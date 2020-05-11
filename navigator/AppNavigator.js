import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Secontion: SectionScreen
});

export default createAppContainer(AppNavigator);
