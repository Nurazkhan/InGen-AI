import { View, Text,  FlatList } from 'react-native'
import React from 'react'
import Header from '../../components/home/header'
import Banner from '../../components/home/banner'
import AiFeaturedModel from '../../components/home/AiFeaturedModel'
import AiModels from '../../components/home/AiModels'
import AllUsersCreation from '../../components/home/AllUsersCreation'


export default function Home() {

 
  return (
    <FlatList nestedScrollEnabled={true} style={{padding:20, }} data = {[1]}  showsVerticalScrollIndicator={false} renderItem={({item})=>(
      <View>
        <Header />
      <Banner />
      <AiFeaturedModel />
      <AiModels type={'avatar'}/>
      <AiModels type={'style'}/>

      {/* Users Creation */}
      <AllUsersCreation />
      <View style={{height: 100}} ></View>
      </View>
      
    )}  />
      
    
  )
}