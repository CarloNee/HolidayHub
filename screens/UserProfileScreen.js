// CODE I WROTE
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Switch, SafeAreaView, Alert } from 'react-native';
import { auth, db } from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = () => {
  return (
    <SafeAreaView style={styles.customHeader}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logoHeaderStyle}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

const UserProfileScreen = () => {

  const [user, setUser] = useState("");
  const [isDarkMode, setDarkMode] = useState(false);
  const [items, setItems] = useState([]);
  const [profileImageUri, setProfileImageUri] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const navigation = useNavigation();

  navigation.setOptions({
    title: '',
    headerShown: true,
    headerTitleStyle: {
      display: 'none', 
    },
    headerStyle: {
      backgroundColor: '#4C8577',
      height: 120,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: CustomHeader,
  });

  // Fetch user details from Firestore on component mount
  useEffect(() => {
    // Check if user details are already fetched
    if (items.length > 0) return;

    const fetchUserDetails = async () => {
      // Reference the "Application Users" collection in Firestore
      const userRef = collection(db, "Application Users");

      // Get the documents from the collection
      const docsSnap = await getDocs(userRef);
      
      const users = [];
      // Loop through the documents and push data to the users array
      docsSnap.forEach((doc) => {
        users.push(doc.data());
      });

      // Update the state with user data
      setItems(users);
    };

    // Call the fetchUserDetails function
    fetchUserDetails();
  }, []);

  // Set user data in state when items array is updated
  useEffect(() => {
    if (items.length > 0) {
      // Assuming the first user in the array is the current user
      setUser(items[0]);
      setProfileImageUri(items[0].profileImage); 
    }
  }, [items]);

  // Toggle dark mode state
  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  // Function to handle image upload
  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }
  
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setProfileImageUri(pickerResult.uri);
  
      // Update profile image URL in Firestore
      try {
        const userRef = doc(db, "Application Users", user.id);
        await updateDoc(userRef, {
          ProfileImageStyle: pickerResult.uri,
        });
      } catch (error) {
        console.error('Error updating profile image:', error);
      }
    }
  };

  // Function to delete user document from Firestore
  const handleDeleteAccount = async () => {
    // Show confirmation alert
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action is irreversible.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Delete user document from Firestore
              await deleteDoc(doc(db, "Application Users", user.id));

              // Delete user account from Firebase Authentication
              await auth.currentUser.delete();

              // Log out user
              auth.signOut();
            } catch (error) {
              console.error("Error deleting account:", error);
            }
          }
        }
      ]
    );
  };

  // Function to handle log out from Firebase Authentication
  const handleLogOut = async () => {
    try {
      // signout function
      await auth.signOut();

      // Navigate to the LoginScreen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ScrollView style={isDarkMode ? styles.ContainerDark : styles.ContainerLight}>

      {/* User Profile Section */}
      <View style={styles.ProfileSectionStyle}>
      {/* Profile Image Upload Section */}
      <View style={styles.ProfileImageSectionStyle}>
        {profileImageUri ? (
          <Image source={{ uri: profileImageUri }} style={styles.ProfileImageStyle} />
        ) : (
          <TouchableOpacity onPress={handleImageUpload}>
            <Text style={styles.UploadProfilePicTextStyle}>Upload Profile Image</Text>
          </TouchableOpacity>
        )}
      </View>

        {/* User Name */}
        <Text style={styles.UserNameTextStyle}>{`${user.firstName} ${user.lastName}`}</Text>

        {/* User Email */}
        <Text style={styles.EmailTextStyle}>{user.email}</Text>
      </View>

      {/* Application Settings Section */}
      <View style={isDarkMode ? styles.SettingsSectionDark : styles.SettingsSectionLight}>

        {/* App Version */}
        <View style={styles.SingularSettingSectionStyle}>
          <Text style={styles.SettingTextStyle}>App Version: 1.0.0</Text>
        </View>

        {/* Delete Account */}
        <TouchableOpacity style={styles.SingularSettingSectionStyle} onPress={handleDeleteAccount}>
          <Text style={styles.SettingTextStyle}>Delete Account</Text>
        </TouchableOpacity>

        {/* Log Out */}
        <TouchableOpacity style={styles.SingularSettingSectionStyle} onPress={handleLogOut}>
          <Text style={styles.SettingTextStyle}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  customHeader: {
    backgroundColor: '#4C8577',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoHeaderStyle: {
    width: 250,
    height: 100,
  },
  ContainerLight: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  ContainerDark: {
    flex: 1,
    backgroundColor: '#121212',
  },
  ProfileImageSectionStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  ProfileImageStyle: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  UploadProfilePicTextStyle: {
    fontSize: 18,
    color: '#4C8577',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: '#4C8577',
    borderRadius: 10,
  },
  ProfileSectionStyle: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  SettingsSectionLight: {
    backgroundColor: '#F0F0F0',
    marginTop: 20,
  },
  SettingsSectionDark: {
    backgroundColor: '#222222',
    marginTop: 20,
  },
  ProfileImageStyle: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  UserNameTextStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  EmailTextStyle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  SingularSettingSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: '#B7B7B7',
    backgroundColor: '#FFFFFF',
  },
  SettingTextStyle: {
    fontSize: 18,
    fontWeight: '500',
  },
});
// END OF CODE I WROTE
