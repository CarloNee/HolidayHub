import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserProfileScreen from "./screens/UserProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import SavedScreen from "./screens/SavedScreen";
import DestinationsScreen from "./screens/DestinationsScreen";
import ActivitiesScreen from "./screens/ActivitiesScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ActivityScreen from "./screens/ActivityScreen";

// my code here 
// tab createBottomTabNavigator
const Tab = createBottomTabNavigator();

// stack createNativeStackNavigator
const Stack = createNativeStackNavigator();

// Resource: https://reactnavigation.org/docs/bottom-tab-navigator
function BottomTabNav() {
  return (
    // tab Navigator
    <Tab.Navigator>
      {/* Tab Screen - Home */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          fontFamily: "Spinnaker_400Regular",
          tabBarHideOnKeyboard: true,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#4C8577" : "#636362" }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="home-variant"
                size={24}
                color="#4C8577"
              />
            ) : (
              <MaterialCommunityIcons
                name="home-variant-outline"
                size={24}
                color="#4C8577"
              />
            ),
        }}
      />
      {/* Tab Screen - Saved */}
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          fontFamily: "Spinnaker_400Regular",
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#4C8577" : "#636362" }}>
              Saved
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="tag-heart"
                size={24}
                color="#4C8577"
              />
            ) : (
              <MaterialCommunityIcons
                name="tag-heart-outline"
                size={24}
                color="#4C8577"
              />
            ),
        }}
      />
      {/* Tab Screen User */}
      <Tab.Screen
        name="User"
        component={UserProfileScreen}
        options={{
          headerShown: false,
          fontFamily: "Spinnaker_400Regular",
          tabBarHideOnKeyboard: true,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#4C8577" : "#636362" }}>
              User
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="account-circle"
                size={24}
                color="#4C8577"
              />
            ) : (
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={24}
                color="#4C8577"
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

// MY CODE ENDS HERE
const StackNavigator = () => {
  // CODE FROM https://reactnavigation.org/docs/hello-react-navigation#creating-a-native-stack-navigator
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* MY CODE HERE */}
        <Stack.Screen name="Login" component={LoginScreen} options={ {headerShown: false} }/>
        <Stack.Screen name="Register" component={RegisterScreen} options={ {headerShown: false} }/>
        <Stack.Screen name="Main" component={BottomTabNav} options={{ headerShown: false }}/>
        <Stack.Screen name="Destinations" component={DestinationsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Activities" component={ActivitiesScreen}/>
        <Stack.Screen name="Activity" component={ActivityScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Saved" component={SavedScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ headerShown: false }}/>
        {/* MY CODE ENDS HERE */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// MY CODE HERE
export default StackNavigator;

const styles = StyleSheet.create({});
// MY CODE ENDS HERE
