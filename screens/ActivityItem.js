// MY CODE HERE
import { Pressable, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ActivityItem = ({ activity, dates, description, handleSaveActivity }) => {

    // get the width and height of the screen being used so activity card can be displayed correctly. Resource: https://reactnative.dev/docs/dimensions
    const { width, height } = Dimensions.get('window');
    
    // declare navigation using useNavigation hook
    const navigation = useNavigation();

    // Return the ActivityItem component, which will contain the different data
    return (
        <Pressable onPress={() => navigation.navigate("Activity", { activity })}>
            <View style={styles.ActivityCardViewContainerStyle}>
                {/* View for the image component of the ActivityItem */}
                <View>
                    {/* put style in stylesheet component */}
                    <Image source={{ uri: activity.image }} style={{ height: height / 4.5, width: width / 3, borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }} />

                </View>

                {/* View for the text component of the ActivityItem */}
                <View style={styles.TextComponentActivityCardStyle}>
                    <View style={styles.IndividualTextComponentActivityCardStyle}>
                        <Text style={styles.TextForActNameStyle}>{activity.name}</Text>
                    </View>

                    {/* Description of the activity - view */}
                    <View style={styles.SecondaryTextActStyle}>
                        <Text style={styles.DescriptionTextStyle}>{activity.description}</Text>
                    </View>

                    {/* address of the activity - view */}
                    <View style={styles.SecondaryTextActStyle}>
                        <Text style={styles.AddressTextStyle}>Address: {activity.address}</Text>
                    </View>

                    {/* address of the activity - view */}
                    <View style={styles.SecondaryTextActStyle}>
                        <Text style={styles.RatingTextStyle}>Rating: {activity.rating} / 5</Text>
                    </View>

                    {/* Price of the activity - view */}
                    <View style={styles.SecondaryTextActStyle}>
                        <Text style={styles.PriceTextStyle}>Price: {activity.price}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export default ActivityItem;

const styles = StyleSheet.create({
    
    ActivityCardViewContainerStyle: { 
        margin: 15, 
        flexDirection: "row", 
        borderRadius: 30, 
        backgroundColor: "#4C8577" 
    },
    TextComponentActivityCardStyle: { 
        padding: 10, 
        justifyContent: "space-between" 
    },
    IndividualTextComponentActivityCardStyle: { 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between" 
    },
    TextForActNameStyle: { 
        width: "95%", 
        fontSize: 20, 
        fontWeight: "500",
        color: "#ffffff" 
    },
    SecondaryTextActStyle: { 
        paddingTop: 10 
    },
    DescriptionTextStyle: { 
        width: "65%", 
        color: "#ffffff" 
    },
    AddressTextStyle: { 
        width: "60%", 
        color: "#ffffff" 
    },
    RatingTextStyle: { 
        color: "#ffffff"
    },
    PriceTextStyle: { 
        color: "#ffffff"
    },

});

// MY CODE ENDS HERE