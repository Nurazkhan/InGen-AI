import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur';
export default function Banner() {
  return (
    <View style={{
        marginTop: 20
    }}>
      <Image source={require('./../../assets/images/banner.png')} style={{
        width: '100%',
        height: 140,
        borderRadius: 15
      }}/>

      <View style={{
        padding: 15,
        position: 'absolute'
      }}>
        <Text style={{
  fontSize: 30,
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  textShadowColor: 'rgba(0, 0, 0, 0.8)', 
  textShadowOffset: { width: 2, height: 2 }, 
  textShadowRadius: 5
}}>Turn Words</Text>
        <Text style={{
  fontSize: 30,
  color: 'aqua',
  fontWeight: 'bold',
  textAlign: 'center',
  textShadowColor: 'rgba(0, 0, 0, 0.8)', 
  textShadowOffset: { width: 2, height: 2 }, 
  textShadowRadius: 5
}}>Into ART</Text>
      </View>


      <TouchableOpacity style={{
        padding: 10,
        backgroundColor: 'white',
        position: 'absolute',
        borderRadius: 7,
        right:0,
        bottom: 0,
        margin: 25,
        paddingHorizontal: 25
      }}>
        <Text>Explore</Text>
      </TouchableOpacity>
      
    </View>
  )
}

