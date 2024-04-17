// MY CODE HERE
import { StyleSheet, SafeAreaView, Text, View, Image, TextInput, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, {useEffect, useState } from 'react';
import DestinationResults from './DestinationResults';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const DestinationsScreen = () => {

    // intialize state for destination name as well as use empty string for destination name at start
    const [destinationName, setDestinationName] = useState("");

    // implementation for getting the cities data from Firestore and console.log the data to the console
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (items.length > 0) return;
    
        const getDatafromFB = async () => {
            const dataRef = collection(db, "cities");
    
            const docSnap = await getDocs(dataRef);
    
            const citiesData = [];
    
            docSnap.forEach((doc) => {
                citiesData.push(doc.data());
            });
    
            setItems(citiesData);
        };
    
        getDatafromFB();
    }, []);
  
  return (
    // Search Bar Area View
    <SafeAreaView>
        <View style={styles.SearchBarAreaViewStyle}>
            <TextInput value={destinationName} onChangeText={(text) => setDestinationName(text)} placeholder="Destination Name" />
            <AntDesign name="search1" size={24} color="#4C8577" />
        </View>

        {/* Pass props directly to the DestinationResults component */}
        <DestinationResults
            data={items}
            destinationName={destinationName}
            setDestinationName={setDestinationName}>
        </DestinationResults>
    </SafeAreaView>
  )
}

export default DestinationsScreen

const styles = StyleSheet.create({

    SearchBarAreaViewStyle: { 
        margin: 10, 
        padding: 10, 
        alignItems: "center", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        borderColor: "#4C8577", 
        borderWidth: 3, 
        borderRadius: 15 
    },
    
})

// MY CODE ENDS HERE