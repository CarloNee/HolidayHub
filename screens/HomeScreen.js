// MY CODE HERE
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput, Button } from "react-native"
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useFonts, Courgette_400Regular } from '@expo-google-fonts/courgette';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";


const HomeScreen = () => {
    // const navigation declaration
    const navigation = useNavigation();
    const [dates, setDates] = useState();


    // useEffect from https://react.dev/reference/react/useEffect
    useEffect(() => {
        navigation.setOptions({
        title: "StayFast",
        headerShown: true,
        headerTitleStyle: {
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: 40,
            fontFamily: "Courgette_400Regular",
        },
        headerStyle: {
            backgroundColor: "#45edce",
            height: 120,
        }
        });
    }, [navigation]);

    // custom button so dates can be saved for start date and end date
    const customButton = (onConfirm) => {
        return (
            <Button 
            onPress={onConfirm}
            style={{
                container: { width: "70%", narginHorizontal: "3%"},
                text: { fontSize: 18, fontFamily: "Courgette_400Regular", color: "#45edce" },
            }}
            primary
            title="Submit"
            />
        );
    };

    return (
        <View>
            <ScrollView>
                {/* put style in stylesheet section */}
                <View style={{margin: 20, borderColor: "#45edce"}}>
                    {/* Pressable section. Resource from: https://reactnative.dev/docs/pressable */}
                    {/* Location */}
                    {/* put style in stylesheet section */}
                    <Pressable style={{flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 10, borderColor: "#45edce", borderWidth: 2, paddingVertical: 15, borderRadius: 10, marginBottom: 10}}>
                        {/* Search Icon */}
                    <MaterialCommunityIcons name="map-search-outline" size={25} color="#45edce" />
                    {/* Input */}
                    <TextInput style={styles.textInputStyle} placedholder="Where are we going?"/>
                    </Pressable>

                    {/* Dates */}
                    <Pressable style={{flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 10, borderColor: "#45edce", borderWidth: 2, paddingVertical: 15, borderRadius: 10, marginBottom: 10}}>
                        {/* Calendar Icon */}
                        <MaterialCommunityIcons name="calendar-blank-outline" size={25} color="#45edce" /> 
                        {/* DatePicker from Resource: https://www.npmjs.com/package/react-date-range */}
                        <DatePicker 
                            style = {{ width: "auto", height: 30, borderRadius: 0, borderWidth: 0, borderColor: "transparent" }}
                            customStyles = {{
                                placeholderText: { fontSize: 15, flexDirection: "row", alignItems: "center", marginRight: "auto"},
                                headerStyle:{
                                    backgroundColor: "#45edce",
                                },
                                contentText: {
                                    fontSize: 15, flexDirection: "row", alignItems: "center", marginRight: "auto"
                                }
                            }}
                            selectedBgColor="#45edce"
                            customButton={(onConfirm) => customButton(onConfirm)}
                            onConfirm={(startDate, endDate) => setDates( startDate, endDate )}
                            allowFontScaling={false}
                            placeholder={"When do you want to stay?"}
                            mode={"range"}
                        />
                    </Pressable>

                    {/* No. of Guests, Rooms */}
                    <Pressable style={{flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 10, borderColor: "#45edce", borderWidth: 2, paddingVertical: 15, borderRadius: 10, marginBottom: 10}}>
                    {/* icon */}
                    <MaterialCommunityIcons name="format-list-numbered" size={25} color="#45edce" /> 
                    <TextInput placedholder="2 Rooms | 2 Adults | 2 Children" />  
                    </Pressable>

                    {/* Search */}
                    <Pressable>
                        
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({




    textInputStyle: {
        color: 'gray',
        }
});
// MY CODE ENDS HERE