import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function TextInputComponent({userInputValue}) {



  return (
    <View>
      <Text>Enter Your Prompt</Text>
      <TextInput onChangeText={(value)=>userInputValue(value)} placeholder='Enter your prompt here...' numberOfLines={5} multiline={true} textAlignVertical='top' style={{
        padding: 15,
        backgroundColor: 'lightgray',
        borderRadius: 15,
        marginTop: 15,
        minHeight: 100
      }} />
    </View>
  )
}