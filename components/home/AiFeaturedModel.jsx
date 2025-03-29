import { View, Text, Image, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../services/GlobalApi'
import {useRouter} from 'expo-router'

export default function AiFeaturedModel() {
    const[aiModelList, setAiModelList] = useState([]);
    useEffect(()=>{
        GetAiFeaturedList()
    },[])
    const router = useRouter()

    const GetAiFeaturedList = async () =>{
        const result = await GlobalApi.GetFeaturedCategoryList();
        
        setAiModelList(result.data.data)
    }
    const OnClickAiModel=(item)=>{
      router?.push({
        pathname: 'FormInput',
        params: item
      })
    }

  return (
    <View style={{marginTop:20}}>
      <Text style={{fontSize: 25, fontWeight: 'bold'}}>Featured</Text>

      <FlatList style={{marginTop: 10}}
        data={aiModelList} numColumns={4}
      renderItem={({item,index})=>(
        <Pressable onPress={() => OnClickAiModel(item)} style={{flex:1, alignItems:'center'}}>
            <View style={{padding:12, borderRadius: 10, backgroundColor: 'white'}}>
                <Image source={{uri: item?.icon?.url}} style={{width:35, height:35}} />
            </View>
            <Text style={{fontSize:11, textAlign:'center', color: '#9d9e9d', marginTop: 8}}>{item?.Name}</Text>
        </Pressable>
      )} />
    </View>
  )
}