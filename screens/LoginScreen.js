// MY CODE HERE
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Animated, Image, TextInput, Button, KeyboardAvoidingView, Pressable, Touchable } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";

const LoginScreen = () => {

  // Using useState to keep track of the input fields. Resource: https://react.dev/reference/react/useState
  const [email, submittedEmail] = useState("");
  const [password, submittedPassword] = useState("");
  const [error, setError] = useState(null);

  // Using navigate function to navigate to the register screen if the user does not have an account. Resource: https://reactnavigation.org/docs/navigating/#navigate-to-a-route-multiple-times
  const navigation = useNavigation();

  // sign in with email and password function
  const loginPress = () => {

    setError(null);
    // signinwithemailpassword from react native firebase 
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        // Display error message in an alert
        Alert.alert("Error", "Incorrect username/password", [{ text: "OK" }]);
      });
  };

  // check whether the user has an account, if they do, navigate to the home screen
  useEffect(() => {
    try {
    const viewableUser = auth.onAuthStateChanged((valUser) =>{
      if(valUser){
        navigation.navigate("Main");
      }
    })
    return viewableUser;
  } catch (error) {
    console.log(error);
  }
  }, [navigation]);
    

  return (
    // safeareaview so content stays in the screen region
    <SafeAreaView style={styles.SafeAreaViewStyle}>
      {/* KeyboardAvoidingView. Resource: https://reactnative.dev/docs/keyboardavoidingview */}

      <KeyboardAvoidingView style={{}}>
        {/* Logo View */}
        <View style={styles.LogoSloganContainerStyle}>
          <Image source={require("../assets/logo.png")} style={styles.logoImageStyle}  resizeMode="contain" />
          {/* <Text style={styles.HolidayHubLogoTextStyle}>HolidayHub</Text>
          <Text style={styles.SloganTextStyle}>Unlock Adventures, One City at a Time!</Text> */}
        </View>

        {/* Email Field */}
        <View style={styles.EmailContainerStyle}>
          <TextInput 
          // store email input as value
          value={email} 
          // once submitted, set the the text to submittedEmail
          onChangeText={(text) => submittedEmail(text)}
          placeholder="Email" placeholderTextColor={"#000000"} style={styles.EmailInputFieldStyle}></TextInput>
        </View>

        {/* Password Field */}
        <View style={styles.PasswordContainerStyle}>
          <TextInput
          // store the password input as value
          value={password} 
          // once submitted, set the the text to submittedPassword
          onChangeText={(text) => submittedPassword(text)}
          secureTextEntry={true} placeholder="Password" placeholderTextColor={"#000000"} style={styles.PasswordInputFieldStyle}></TextInput>
        </View>

        {/* Display error message if there's an error */}
        {error && <Text style={styles.ErrorTextStyle}>{error}</Text>}

        {/* Login TouchableOpacity Field */}
        <TouchableOpacity 
        onPress={loginPress}
        style={styles.LoginButtonStyle}>
          <Text style={styles.LoginTextStyle}>Login</Text>
        </TouchableOpacity>

        {/* No Account - Sign Up Field */}
        <TouchableOpacity 
        onPress={() => navigation.navigate("Register")}
        style={styles.NoAccountButtonStyle}>
          <Text style={styles.NoAccountTextStyle}>No account? Sign up here</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({

  SafeAreaViewStyle: {
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "#4E6E58"
  },
  LogoSloganContainerStyle:{ 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20
  },
  HolidayHubLogoTextStyle: { 
    fontFamily: "Spinnaker_400Regular", 
    fontSize: 50, 
    color: "#FFFFFF"
  },
  SloganTextStyle: { 
    fontFamily: "Spinnaker_400Regular", 
    fontSize: 25, 
    color: "#FFFFFF", 
    textAlign: "center"
  },
  EmailContainerStyle: {

  },
  EmailInputFieldStyle: {
    backgroundColor: "#FFFFFF", 
    borderRadius: 20, 
    padding: 20, 
    textAlign: "center", 
    fontSize: 20
  },
  PasswordContainerStyle: { 
    marginTop: 10
  },
  logoImageStyle: {
    width: 250, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 10, 
  },
  PasswordInputFieldStyle: {
    backgroundColor: "#FFFFFF", 
    borderRadius: 20, 
    padding: 20, 
    textAlign: "center", 
    fontSize: 20
  },
  LoginButtonStyle: { 
    marginTop: 50, 
    backgroundColor: "#FFFFFF", 
    margin: "auto", 
    alignItems: "center", 
    borderRadius: 20, 
    padding: 10, 
    justifyContent: "center"
  },
  LoginTextStyle: {
    fontSize: 20
  },
  NoAccountButtonStyle: { 
    margin: 20, 
    alignItems: "center"
  },
  NoAccountTextStyle: {
    color: "#ffffff", 
    fontSize: 20
  },
  ErrorTextStyle: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

// MY CODE ENDS HERE