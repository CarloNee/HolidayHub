import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BookedScreen from "./screens/BookedScreen";
import SavedScreen from "./screens/SavedScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts, Courgette_400Regular } from '@expo-google-fonts/courgette';

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  // MY CODE HERE
  // Resource: https://reactnavigation.org/docs/bottom-tab-navigator
  function BottomTabNav() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? "#45edce" : "#636362" }}>
                Home
              </Text>
            ),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="home-variant"
                  size={24}
                  color="#45edce"
                />
              ) : (
                <MaterialCommunityIcons
                  name="home-variant-outline"
                  size={24}
                  color="#45edce"
                />
              ),
          }}
        />
        <Tab.Screen
          name="Booked"
          component={BookedScreen}
          options={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? "#45edce" : "#636362" }}>
                Booked
              </Text>
            ),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="clipboard-check"
                  size={24}
                  color="#45edce"
                />
              ) : (
                <MaterialCommunityIcons
                  name="clipboard-check-outline"
                  size={24}
                  color="#45edce"
                />
              ),
          }}
        />
        <Tab.Screen
          name="Saved"
          component={SavedScreen}
          options={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? "#45edce" : "#636362" }}>
                Saved
              </Text>
            ),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="tag-heart"
                  size={24}
                  color="#45edce"
                />
              ) : (
                <MaterialCommunityIcons
                  name="tag-heart-outline"
                  size={24}
                  color="#45edce"
                />
              ),
          }}
        />
        <Tab.Screen
          name="User"
          component={UserProfileScreen}
          options={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? "#45edce" : "#636362" }}>
                User
              </Text>
            ),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="account-circle"
                  size={24}
                  color="#45edce"
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-circle-outline"
                  size={24}
                  color="#45edce"
                />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  // MY CODE ENDS HERE

  // CODE FROM https://reactnavigation.org/docs/hello-react-navigation#creating-a-native-stack-navigator
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* MY CODE HERE */}
        <Stack.Screen
          name="main"
          component={BottomTabNav}
          options={{ headerShown: false }}
        />
        {/* MY CODE ENDS HERE */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// MY CODE HERE
export default StackNavigator;

const styles = StyleSheet.create({});
// MY CODE ENDS HERE
