// MY CODE HERE
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; 

const ActivityScreen = () => {
    // initialise route using useRoute
    const route = useRoute();

    // initialise navigation using useNavigation
    const navigation = useNavigation();

    // declare const activity = route.params
    const activity = route.params?.activity;

    // State to track whether the activity is saved
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            title: activity.name,
            headerShown: true,
            headerTitleStyle: {
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: 20,
                fontFamily: "Courgette_400Regular",
            },
            headerTintColor: "#ffffff",
            headerStyle: {
                backgroundColor: "#4C8577",
            },
            headerRight: () => (
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => handleSaveActivity(activity)}
                >
                    <Text style={styles.saveButtonText}>
                        {isSaved ? <AntDesign name="heart" size={24} color="white" /> : <AntDesign name="hearto" size={24} color="white" />}
                    </Text>
                </TouchableOpacity>
            ),
        });
    }, [activity.name, navigation, isSaved]);

  // Function to handle saving or removing the activity
  const handleSaveActivity = async () => {
    try {
      // Get the current saved activities from local storage
      const savedActivitiesJSON = await AsyncStorage.getItem('savedActivities');
      const savedActivities = JSON.parse(savedActivitiesJSON) || [];

      if (isSaved) {
        // Remove the activity from savedActivities
        const updatedSavedActivities = savedActivities.filter(
          (savedActivity) => savedActivity.id !== activity.id
        );
        await AsyncStorage.setItem('savedActivities', JSON.stringify(updatedSavedActivities));
        setIsSaved(false);
      } else {
        // Save the activity to savedActivities
        savedActivities.push(activity);
        await AsyncStorage.setItem('savedActivities', JSON.stringify(savedActivities));
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  };

  useEffect(() => {
    // Check if the current activity is already saved
    const checkIfSaved = async () => {
      try {
        const savedActivitiesJSON = await AsyncStorage.getItem('savedActivities');
        const savedActivities = JSON.parse(savedActivitiesJSON) || [];
        setIsSaved(savedActivities.some((saved) => saved.id === activity.id));
      } catch (error) {
        console.error('Error checking saved activity:', error);
      }
    };

    checkIfSaved();
  }, [activity.id]);

    return (
        <SafeAreaView edges={[]}>
            <ScrollView contentContainerStyle={styles.FullSectionScrollViewStyle}>

                {/* Horizontal scroll of images */}
                <View style={styles.HorizontalImageContainerStyle}>
                    <FlatList
                        horizontal
                        data={activity.images.slice(0, 5)}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={styles.SingularImageStyle} resizeMode="cover" />
                        )}
                    />
                </View>

                {/* Display activity details */}
                <Text style={styles.ActivityTitleTextStyle}>{activity.name}</Text>
                <Text style={styles.DescriptionTextStyle}>{activity.description}</Text>
                <Text>Address: {activity.address}</Text>
                <Text>Rating: {activity.rating} / 5</Text>
                <Text>Price: {activity.price}</Text>
                {/* Save Button */}
                <TouchableOpacity
                    onPress={handleSaveActivity}
                    style={styles.SaveButtonContainerStyle}
                    >
                    <Text style={styles.SaveButtonTextStyle}>
                        {isSaved ? 'Remove from Saved' : 'Save Activity'}
                    </Text>
                </TouchableOpacity>

                {/* Display OpenStreetMap using WebView */}
                <View style={styles.MapContainerViewStyle}>
                    <WebView
                        style={styles.MapStyle}
                        source={{
                            html: `
                                <iframe
                                    width="100%"
                                    height="100%"
                                    frameborder="0"
                                    scrolling="no"
                                    marginheight="0"
                                    marginwidth="0"
                                    src="https://www.openstreetmap.org/export/embed.html?bbox=${activity.longitude}%2C${activity.latitude}%2C${activity.longitude}%2C${activity.latitude}&amp;layer=mapnik"
                                >
                                </iframe>
                            `,
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    FullSectionScrollViewStyle: {
        padding: 10,
    },
    HorizontalImageContainerStyle: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    SingularImageStyle: {
        width: 300,
        height: 200,
        marginRight: 10,
        borderRadius: 10,
    },
    ActivityTitleTextStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    DescriptionTextStyle: {

    },
    MapContainerViewStyle: {
        marginTop: 20,
        height: 300,
        borderRadius: 10,
        overflow: 'hidden',
    },
    MapStyle: {
        flex: 1,
    },
    CommentsSectionStyle: {
        marginTop: 20,
    },
    CommentsHeaderTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    saveButton: {
        marginRight: 15,
    },
    saveButtonText: {
        color: "#ffffff",
        fontSize: 16,
    },
});

export default ActivityScreen;
// MY CODE ENDS HERE