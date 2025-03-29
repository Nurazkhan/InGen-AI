import { View, Text, FlatList, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../services/GlobalApi'
import {useRouter} from 'expo-router'
export default function AiModels({type}) {

  const router = useRouter()
const[aiModelList, setAiModelList]=useState()

useEffect(()=>{
    GetAiModels()
},[])


const GetAiModels= async () =>{
    const result = await GlobalApi.GetAiModels(type)
    console.log(result.data.data)
    setAiModelList(result.data.data)
}

const OnClickAiModel=(item)=>{
  router?.push({
    pathname: 'FormInput',
    params: item
  })
}

  return (
    <View>
      <Text
      style={{
        fontSize:20,
        fontWeight: 'bold',
        marginTop: 10
      }}
      >{type?.toUpperCase()}</Text>

      <FlatList data={aiModelList} horizontal ={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}
      renderItem={({item,index})=>(
        <Pressable onPress={() => OnClickAiModel(item)} style={{
            marginRight: 20
        }}>
            <Image source={{uri: item?.banner?.url}} style={{
                width: 140,
                height:180,
                marginTop: 10,
                borderRadius: 15
            }} />
            <Text style={{
                position: 'absolute',
                bottom: 10,
                color: 'white',
                fontWeight: 'bold',
                width: '100%',
                textAlign: 'center'
            }}>{item?.Name}</Text>
        </Pressable>
      )} />
    </View>
  )
}