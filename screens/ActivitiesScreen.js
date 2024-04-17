// MY CODE HERE
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActivityItem from './ActivityItem';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const ActivitiesScreen = () => {
    // initialise the route. Resource: 
    const route = useRoute();

    // initialise the navigation. Resource:
    const navigation = useNavigation();

    // intialise the savedActivities state. Resource:
    const [savedActivities, setSavedActivities] = useState([]);

    // Callback function to handle saving activities
    const handleSaveActivity = (activity) => {
        if (!savedActivities.some((saved) => saved.id === activity.id)) {
        setSavedActivities([...savedActivities, activity]);
        }
    };
    
    useEffect(() => {
        // Access the destination from the route.params object and display it in the header
        // Use a default title if destination is not available
        const destination = route.params?.destination || 'Activities'; 
        navigation.setOptions({
            title: destination,
            headerShown: true,
            headerTitleStyle: {
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: 30,
                fontFamily: "Courgette_400Regular",
            },
            headerTintColor: "#ffffff",
            headerStyle: {
                backgroundColor: "#4C8577",
                height: 100,
            }
        });
    }, [navigation, route.params?.destinationName]);

    const [items, setItems] = useState([]);

    useEffect(() => {
        if (items.length > 0) return;
    
        const getDatafromFirebase = async () => {
            // Create a reference to the "cities" collection in Firestore
            const citiesRef = collection(db, "cities");
            
            // filter cities based on the "place" field
            const q = query(citiesRef, where("place", "==", route.params.destination));
    
            const querySnapshot = await getDocs(q);
            
            // Create a new array to store data
            const citiesData = []; 
            
            // Update the state with the new array
            querySnapshot.forEach((doc) => {
                citiesData.push(doc.data());
            });
    
            setItems(citiesData); 
        };
    
        getDatafromFirebase();
        // Re-run the query when the location changes
    }, [route.params.location]); 

    return (
        <ScrollView>
            <View>
                {items.map((item) =>
                    item.activities.map((activity, index) => (
                        <Pressable
                            key={index}
                            onPress={() => navigation.navigate("Activity", { activity })} 
                        >
                            {/* Render the Activity Item so they appear as content underneath the Header for the City searched */}
                            <ActivityItem dates={route.params.dates} activity={activity} handleSaveActivity={handleSaveActivity} />
                        </Pressable>
                    ))
                )}
            </View>
        </ScrollView>
    );
    
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
    
});

// MY CODE ENDS HERE
