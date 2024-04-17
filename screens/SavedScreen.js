// MY CODE HERE
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavedScreen = () => {
  // get the width and height of the screen being used so activity card can be displayed correctly. Resource: https://reactnative.dev/docs/dimensions
  const { width, height } = Dimensions.get("window");

  // declare navigation using useNavigation hook
  const navigation = useNavigation();

  const [savedActivities, setSavedActivities] = useState([]);

  // Function to retrieve saved activities from local storage
  const getSavedActivitiesFromLocal = async () => {
    // try retrieve saved activities or catch error and output the error for dev purposes
    try {
      // declare savedActivitiesJSON const, try getItem from savedActivities
      const savedActivitiesJSON = await AsyncStorage.getItem("savedActivities");
      // declare parsedSavedActivities, either parse savedActivitiesJSON or do nothing with empty array
      const parsedSavedActivities = JSON.parse(savedActivitiesJSON) || [];
      // change state of setSavedActivities
      setSavedActivities(parsedSavedActivities);
      // if error yielded, catch error and display error that was yielded
    } catch (error) {
      console.error("Error retrieving saved activities:", error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Saved Activities",
      headerShown: true,
      headerTitleStyle: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Courgette_400Regular",
      },
      headerStyle: {
        backgroundColor: "#4C8577",
        height: 120,
      },
    });

    // Retrieve saved activities from local storage when the component mounts
    getSavedActivitiesFromLocal();
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        {savedActivities.map((activity) => (
          <>
            <Pressable
              onPress={() => navigation.navigate("Activity", { activity })}
            >
              <View style={styles.ActivityCardViewContainerStyle}>
                {/* View for the image component of the ActivityItem */}
                <View>
                  <Image
                    source={{ uri: activity.image }}
                    style={{
                      height: height / 4.5,
                      width: width / 3,
                      borderTopLeftRadius: 30,
                      borderBottomLeftRadius: 30,
                    }}
                  />
                </View>

                {/* View for the text component of the ActivityItem */}
                <View style={styles.TextComponentActivityCardStyle}>
                  <View style={styles.IndividualTextComponentActivityCardStyle}>
                    <Text style={styles.TextForActNameStyle}>
                      {activity.name}
                    </Text>
                  </View>

                  {/* Description of the activity - view */}
                  <View style={styles.SecondaryTextActStyle}>
                    <Text style={styles.DescriptionTextStyle}>
                      {activity.description}
                    </Text>
                  </View>

                  {/* address of the activity - view */}
                  <View style={styles.SecondaryTextActStyle}>
                    <Text style={styles.AddressTextStyle}>
                      Address: {activity.address}
                    </Text>
                  </View>

                  {/* address of the activity - view */}
                  <View style={styles.SecondaryTextActStyle}>
                    <Text style={styles.RatingTextStyle}>
                      Rating: {activity.rating} / 5
                    </Text>
                  </View>

                  {/* Price of the activity - view */}
                  <View style={styles.SecondaryTextActStyle}>
                    <Text style={styles.PriceTextStyle}>
                      Price: {activity.price}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  ActivityCardViewContainerStyle: {
    margin: 15,
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: "#4C8577",
  },
  TextComponentActivityCardStyle: {
    padding: 10,
    justifyContent: "space-between",
  },
  IndividualTextComponentActivityCardStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  TextForActNameStyle: {
    width: "95%",
    fontSize: 20,
    color: "#ffffff",
  },
  SecondaryTextActStyle: {
    paddingTop: 10,
  },
  DescriptionTextStyle: {
    width: "65%",
    color: "#ffffff",
  },
  AddressTextStyle: {
    width: "60%",
    color: "#ffffff",
  },
  RatingTextStyle: {
    color: "#ffffff",
  },
  PriceTextStyle: {
    color: "#ffffff",
  },
});

// END OF MY CODE
