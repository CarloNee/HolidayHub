// MY CODE HERE
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, TextInput, KeyboardAvoidingView, Pressable, Alert} from 'react-native'
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = () => {

  // Using useState to keep track of the input fields. Resource: https://react.dev/reference/react/useState
  const [email, submittedEmail] = useState("");
  const [password, submittedPassword] = useState("");
  const [firstName, submittedFirstName] = useState("");
  const [lastName, submittedLastName] = useState("");

  const registerUser = () => {
    if (email.length === 0 || password.length === 0 || firstName.length === 0 || lastName.length === 0) {
      // code from React Native Alert Docs. Resource: https://reactnative.dev/docs/alert
      // Alert message yieled when the alert is raised
      Alert.alert('Error', 'Please enter all the details', [
          {
              text: 'Cancel',
              style: 'cancel',
          },
      ]); 
    }
    // create user, auth exported from firebase, email stored in the above email const and password stored in the above password const
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // get userEmail and userUid from the userCredential
      const userUid = auth.currentUser.uid;
      const user = userCredential._tokenResponse.email;

      // setDoc. Resource: https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document
      setDoc(doc(db, "Application Users", `${userUid}`),{
        firstName: firstName,
        lastName: lastName,
        email: email,
        profileImage: null,
      })
    })
  }

  // Using navigate function to navigate to the register screen if the user does not have an account. Resource: https://reactnavigation.org/docs/navigating/#navigate-to-a-route-multiple-times
  const navigation = useNavigation(); 
  
  return (

    // safeareaview so content stays in the screen region
    <SafeAreaView style={styles.SafeAreaViewStyle}>
      {/* KeyboardAvoidingView. Resource: https://reactnative.dev/docs/keyboardavoidingview */}
      <KeyboardAvoidingView style={{}}>

        {/* Logo View */}
        <View style={styles.LogoSloganContainerStyle}>
          <Image source={require("../assets/logo.png")} style={styles.logoImageStyle}  resizeMode="contain" />
        </View>

        {/* First Name Field */}
        <View style={styles.NameContainerStyle}>
          <TextInput
            value={firstName}
            onChangeText={(text) => submittedFirstName(text)}
            placeholder="First Name" placeholderTextColor={"#000000"}
            style={styles.FirstNameFieldStyle}
          />
            <TextInput
            value={lastName}
            onChangeText={(text) => submittedLastName(text)}
            placeholder="Last Name" placeholderTextColor={"#000000"}
            style={styles.LastNameFieldStyle}
          />
        </View>

        {/* Email Field */}
        <View style={styles.EmailFieldStyle}>
          <TextInput 
          // store email input as value
          value={email} 
          // once submitted, set the the text to submittedEmail
          onChangeText={(text) => submittedEmail(text)}
          placeholder="Email" placeholderTextColor={"#000000"} style={styles.EmailButtonStyle}></TextInput>
        </View>

        {/* Password Field */}
        <View style={styles.PasswordFieldStyle}>
          <TextInput
          // store the password input as value
          value={password} 
          // once submitted, set the the text to submittedPassword
          onChangeText={(text) => submittedPassword(text)}
          secureTextEntry={true} placeholder="Password" placeholderTextColor={"#000000"} style={styles.PasswordButtonStyle}></TextInput>
        </View>

        {/* Register Touchable Opacity Field */}
        <TouchableOpacity 
        onPress = {registerUser}
        style={styles.RegisterButtonFieldStyle}>
          <Text style={styles.RegisterButtonTextStyle}>Register</Text>
        </TouchableOpacity>

        {/* No Account - Sign Up Field */}
        <TouchableOpacity 
        onPress={() => navigation.navigate("Login")}
        style={{ margin: 20, alignItems: "center"}}>
          <Text style={styles.AccountTextStyle}>Got an account? Log in here</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({

  SafeAreaViewStyle: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "#4E6E58"
  },
  logoImageStyle: {
    width: 250,
    height: 100,
    marginBottom: 10, 
  },
  LogoContainerStyle: { 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 20
  },
  LogoTextStyle: { 
    fontFamily: "Courgette_400Regular", 
    fontSize: 50, 
    color: "#FFFFFF"
  },
  SloganTextStyle: { 
    fontFamily: "Courgette_400Regular", 
    fontSize: 25, 
    color: "#FFFFFF", 
    textAlign: "center"
  },
  NameContainerStyle: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20
  },
  FirstNameFieldStyle: { 
    backgroundColor: "#FFFFFF", 
    borderRadius: 20, 
    padding: 20, 
    textAlign: "center", 
    fontSize: 20 
  },
  LastNameFieldStyle: {
    backgroundColor: "#FFFFFF", 
    borderRadius: 20, 
    padding: 20, 
    textAlign: "center", 
    fontSize: 20 
  },
  EmailFieldStyle: { 
    marginTop: 10 
  },
  EmailButtonStyle: { 
    backgroundColor: "#FFFFFF", 
    borderRadius: 20, 
    padding: 20, 
    textAlign: "center", 
    fontSize: 20 
  },
  PasswordFieldStyle: { 
    marginTop: 10 
  },
  PasswordButtonStyle: {
    backgroundColor: "#FFFFFF", 
    borderRadius: 20, 
    padding: 20, 
    textAlign: "center", 
    fontSize: 20 
  },
  RegisterButtonFieldStyle: { 
    marginTop: 20, 
    backgroundColor: "#FFFFFF", 
    margin: "auto", 
    alignItems: "center", 
    borderRadius: 20, 
    padding: 10, 
    justifyContent: "center" 
  },
  RegisterButtonTextStyle: {
    fontSize: 20 
  },
  AccountTextStyle: {
    color: "#ffffff", 
    fontSize: 20 
   },

});

// MY CODE ENDS HERE