// MY CODE HERE
import { StyleSheet, Text, View, Pressable, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const DestinationResults = ({data, destinationName, setDestinationName}) => {

    const navigation = useNavigation();
    const route = useRoute(); 

    // Sort data by the most activities first
    const sortedData = [...data].sort((a, b) => {
      const lengthA = a.activities?.length || 0;
      const lengthB = b.activities?.length || 0;
      return lengthB - lengthA;
    });

  return (
    <View style={{padding: 10}}>
      <FlatList data={sortedData} renderItem={({item}) => {

        // if the typed destination is the same as the place on the DestinationsScreen array, then show results
        if (item.place.toLowerCase().includes(destinationName.toLowerCase())){
            // If input is empty, then show no results
            // if(destinationName === ""){
            //     return null;
            // } 
            // If input is not empty, then show results
            return (
                <>
                {/* Pressable that will contain the image, the destination and amount of activities found in that destination */}
                <Pressable 
                  onPress={() => {setDestinationName(item.place);
                  navigation.navigate("Home", {
                      destinationName: item.place})    
                  }}
                  style={styles.CityPressableSectionStyle}>
                  {/* View for the image, with rounded corners */}
                  <View>
                      <Image style={styles.CityImageStyle} source = {{uri:item.locationImage}} />
                  </View>
                  {/* View for the text parts, the place and activities (taking the length as it is an array) */}
                  <View style={styles.TextForCityViewStyle}>
                    <Text style={styles.TextForCityNameStyle}>{item.place}</Text>
                    {/* check whether activities exist for a city in the database and display number through length method or display 0 */}
                    <Text>{item.activities?.length || 0} Activities</Text>
                  </View>
                </Pressable>
                </>
            )
        }
      }}/>
    </View>
  )
}

export default DestinationResults

const styles = StyleSheet.create({
  ResultsTextStyle: {
    padding: 1,
    fontSize: 15
  },
  CityPressableSectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    flex: 1,
    borderRadius: 15,
    overflow: "hidden"
  },
  CityImageStyle: {
    flex: 1,
    width: "40%",
    aspectRatio: 1,
  },
  TextForCityViewStyle: {
    marginLeft: 10,
    flex: 1,
  },
  TextForCityNameStyle: {
    fontSize: 20
  },
})

// MY CODE ENDS HERE