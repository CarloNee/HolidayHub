// MY CODE HERE
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, ScrollView, TextInput, Button, Image, Alert, Pressable, FlatList } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
// import { useFonts, Courgette_400Regular } from "@expo-google-fonts/courgette";
import { useFonts } from "@expo-google-fonts/spinnaker";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";

// Create LogoHeader for the Home Screen
const LogoHeader = () => {
    return (
      <SafeAreaView style={styles.LogoHeaderContainerStyle}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.LogoHeaderStyle}
          resizeMode="contain"
        />
      </SafeAreaView>
    );
  };

const HomeScreen = () => {

    // Initialise navigation declaration
    const navigation = useNavigation();
    // Initialise dates and setDates with useState from https://react.dev/docs/hooks-reference#usestate
    const [dates, setDates] = useState();
     

    // Initialise route and use useRoute from https://react.dev/docs/hooks-reference
    const route = useRoute();

    // Create a data array containing image URLs for the popular destinations flatlist
    // images taken from pexels.com
    const popularDestinations = [
        // taken from https://www.pexels.com/photo/boats-in-the-ocean-2191136/
        { id: "1", name: "IBIZA", image: require("../assets/ibiza.jpg")},
        // taken from https://www.pexels.com/photo/colosseum-italy-1797161/
        { id: "2", name: "ROME", image: require("../assets/rome.jpg")},
        // // taken from https://www.pexels.com/photo/blue-body-of-water-373409/
        { id: "3", name: "AYIA NAPA", image: require("../assets/cyprus.jpg")},
        // // taken from https://www.pexels.com/photo/white-and-blue-concrete-building-near-body-of-water-3727255/
        { id: "5", name: "MYKONOS", image: require("../assets/greece.jpg")},
        // // taken from https://www.pexels.com/photo/lighted-city-in-distance-near-body-of-water-164436/
        { id: "6", name: "CORNWALL", image: require("../assets/cornwall.jpg")},
        // // taken from https://www.pexels.com/photo/green-palm-trees-near-body-of-water-1030322/
        { id: "7", name: "KINGSTON", image: require("../assets/kingston.jpg")},
        // // taken from https://www.pexels.com/photo/sydney-opera-house-australia-995765/
        { id: "8", name: "SYDNEY", image: require("../assets/sydney.jpg")},
        // // taken from https://www.pexels.com/photo/the-auckland-harbour-bridge-in-new-zealand-5342976/
        { id: "9", name: "AUCKLAND", image: require("../assets/auckland.jpg")},
        // // taken from https://www.pexels.com/photo/castle-surrounded-with-trees-under-white-sky-2598721/
        { id: "10", name: "NASSAU", image: require("../assets/nassau.jpg")},
    ];

    navigation.setOptions({
        title: "", 
        headerShown: true,
        headerTitleStyle: {
          display: "none",
        },
        headerStyle: {
          backgroundColor: "#4C8577",
          height: 120,
          alignItems: "center",
          justifyContent: "center",
        },
        header: LogoHeader,
      });

    // custom button so dates can be saved for start date and end date
    const customButton = (onConfirm) => {
        return (
            <Button 
            onPress={onConfirm}
            style={{
                container: { width: "70%", narginHorizontal: "3%"},
                text: { fontSize: 18, fontFamily: "", color: "#4C8577" },
            }}
            primary
            title="Submit"
            />
        );
    };

    // defining the searchDestinations function, need destination and dates to be selected otherwise it will not execute
    const searchDestination = (destination) => {
        // code from React Native Alert Docs. Resource: https://reactnative.dev/docs/alert
        if(!route.params || !dates){
            // Alert message yieled when the alert is raised
            Alert.alert('Error', 'Please enter the following: \n -> A destination\n -> Selected dates', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        }

        if(route.params && dates){
            navigation.navigate("Activities", {
                destination: destination,  
                dates: dates,
            })
        }
    };

    return (
        <>
        <View>
            <View style={styles.ViewForPopularDestinationContainerStyle}>
                {/* Popular Destinations Slider */}
                <ScrollView style={styles} horizontal>
                    {popularDestinations.map((destination) => (
                        <View
                            key={destination.id}
                            style={styles.slide}
                            onPress={() =>
                                navigation.navigate('Activities', {
                                    destination: destination.name,
                                    dates: dates,
                                })
                            }
                        >
                            <Image source={destination.image} style={styles.SliderImageStyle} resizeMode="cover" />
                            <Text style={styles.SliderCityName}>{destination.name}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
            
            <View style={styles.SearchCityDatesContainerStyle}>
                    <Text style={styles.LookingForActivitiesTextStyle}>Looking for things to do on your trip?</Text>
                    {/* Location */}
                    <TouchableOpacity
                    onPress={() => navigation.navigate("Destinations", {
                        // Pass the return screen name to DestinationsScreen
                        returnScreen: "Home", 
                    })}
                    style={styles.DestinationSearchBoxStyle}>
                        {/* Search Icon */}
                        <MaterialCommunityIcons name="map-search-outline" size={25} color="#4C8577" />
                        {/* Implementing route.params so what is searched in the DestinationsResults, when pressed is then provided as the text in the search box on the home page, if nothing provided then placeholder text provided */}
                        {route?.params ? (
                            <Text style={styles.DestinationSearchBoxTextStyle}>{route.params.destinationName}</Text>
                        ) : (
                            <Text style={styles.DestinationSearchBoxTemplateTextStyle}>Where are we off to?</Text>
                        )}
                    </TouchableOpacity>

                    {/* Dates */}
                    <TouchableOpacity style={styles.DatesSearchBoxContainerStyle}>
                        {/* Calendar Icon */}
                        <MaterialCommunityIcons name="calendar-blank-outline" size={25} color="#4C8577" /> 
                        {/* DatePicker from Resource: https://www.npmjs.com/package/react-date-range */}
                        <DatePicker 
                            style = {styles.DatesSearchBoxPopUpContainerStyle}
                            customStyles = {{
                                placeholderText: { 
                                    fontSize: 15, 
                                    flexDirection: "row", 
                                    alignItems: "center", 
                                    marginRight: "auto", 
                                    color: "#4C8577"
                                },
                                headerStyle:{
                                    backgroundColor: "#000000",
                                },
                                contentText: {
                                    fontSize: 15, flexDirection: "row", alignItems: "center", marginRight: "auto"
                                }
                            }}
                            selectedBgColor="#4C8577"
                            customButton={(onConfirm) => customButton(onConfirm)}
                            onConfirm={(startDate, endDate) => setDates( startDate, endDate )}
                            allowFontScaling={false}
                            placeholder={"When do you want to visit?"}
                            placeholderTextColor="#000000"
                            mode={"range"}
                        />
                    </TouchableOpacity>

                    {/* Search Button */}
                    <TouchableOpacity 
                        onPress = {() => searchDestination(route?.params.destinationName)}
                        style={styles.SearchButtonContainerStyle}>
                    {/* icon */}
                    <Text style={styles.SearchButtonTextStyle}>Search</Text>
                    </TouchableOpacity>
            </View>
        </View>
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({

    LogoHeaderContainerStyle: {
        backgroundColor: "#4C8577",
        alignItems: "center",
        justifyContent: "center",
    },
    LogoHeaderStyle: {
        width: 250, 
        height: 100, 
    },
    ViewForPopularDestinationContainerStyle: {
        margin: 10, 
        borderColor: "#4C8577" 
    },
    slide: {
        width: 300,
        height: 200,
        marginRight: 10,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        borderRadius: 10,
        overflow: "hidden",
    },
    SliderImageStyle: {
        width: "100%",
        height: "100%",
    },
    SliderCityName: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 40,
        fontSize: 35,
        fontWeight: "bold",
        fontFamily: "",
        color: "#4C8577",
    },
    PopularDestinationsTextStyle: { 
        margin: 15, fontSize: 40, 
        marginTop: 10, 
        fontWeight: "500", 
        fontFamily: "", 
        color: "#4C8577", 
        textAlign: "center" 
    },
    PopularDestinationCityCardStyle: {
        width: 150,
        height: 150,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 5,
    },
    PopularDestinationCityCardImageStyle: { width: 100, 
        height: 100,
        width: 120,
        borderRadius: 10 
    },
    PopularDestinationCityCardTextStyle: {
        color: "#000000",
        fontSize: 25,
        fontWeight: "bold",
        marginVertical: 7,
        fontFamily: "",
        textAlign: "center",
        fontSize: 20,
    },
    LookingForActivitiesTextStyle: {
        textAlign: "center", 
        margin: 10,
        fontSize: 30,
        fontFamily: "", 
        fontWeight: "bold",
        color: "#4C8577", 
    },
    SearchCityDatesContainerStyle: {
        margin: 10, 
        borderColor: "#4C8577"
    },
    DestinationSearchBoxStyle: {
        flexDirection: "row", 
        alignItems: "center", 
        gap: 10, 
        paddingHorizontal: 10, 
        borderColor: "#4C8577", 
        borderWidth: 2, 
        paddingVertical: 15, 
        borderRadius: 25, 
        marginBottom: 5 
    },
    DestinationSearchBoxTextStyle: { 
        fontSize: 18 
    },
    DestinationSearchBoxTemplateTextStyle: { 
        fontSize: 18, 
        color: "#4C8577" 
    },
    DatesSearchBoxContainerStyle: {
        flexDirection: "row", 
        alignItems: "center", 
        gap: 10, 
        paddingHorizontal: 10, 
        borderColor: "#4C8577", 
        borderWidth: 2, 
        paddingVertical: 15, 
        borderRadius: 25, 
        marginBottom: 5 
    },
    DatesSearchBoxPopUpContainerStyle: { 
        width: "auto", 
        height: 30, 
        borderRadius: 0, 
        borderWidth: 0, 
        borderColor: "transparent" 
    },
    SearchButtonContainerStyle: { 
        paddingHorizontal: 10, 
        borderColor: "#4C8577", 
        borderWidth: 2, 
        paddingVertical: 15, 
        borderRadius: 25, 
        marginBottom: 5, 
        backgroundColor: "#4C8577" 
    },
    SearchButtonTextStyle: { 
        textAlign: "center", 
        fontSize: 20, 
        fontWeight: "500", 
        fontFamily: "", 
        color: "#ffffff" 
    },

});
// MY CODE ENDS HERE