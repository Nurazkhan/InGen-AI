import { View, Text, FlatList, Image, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../services/GlobalApi'
import { useRouter } from 'expo-router';

export default function AllUsersCreation() {

const [pageSize,setPageSize] =useState(5);
const [loading,setLoading ] =useState(false)
const [aiImageList,setAiImageList] = useState([])
const router = useRouter()
const ColumnWidth = Dimensions.get('screen').width*0.8/2
useEffect(()=>{
    setAiImageList([])
    GetAllAiImages(pageSize)
},[])

const GetAllAiImages = async(size) =>{
   
    setLoading(true)
    const result = await GlobalApi.GetAllAiImages(size)
   
    const resultData = result.data.data
    resultData?.forEach((element)=>{
        setAiImageList(prev=>[...prev,element])
    })
    setLoading(false)
}
const RenderFoot= () =>{
    if(loading){
    return <ActivityIndicator size={'large'} color="black"/>
    }
    return null
}

const onImageClick = (item) =>{
    router.push({
        pathname: 'ViewAiImage',
        params:{
            imageUrl: item?.imageUrl,
            prompt:"hidden"
        }
    })
}

  return (
    <View>
      <Text style = {{
        fontSize: 20,
        fontWeight: 'bold'
      }}>Users' Creation </Text>

      <FlatList data={aiImageList} numColumns={2} onEndReached={()=>GetAllAiImages(pageSize+5)} onEndReachedThreshold={0.7}
      ListEmptyComponent={RenderFoot}
      renderItem={({item,index})=>(
       <TouchableOpacity style={{margin:8}} onPress={()=>onImageClick(item)}>
        <Image source={{uri:item?.imageUrl}} style={{
            width: ColumnWidth,
            height: 250,
            borderRadius:15
        }} />
       </TouchableOpacity>
      )}
      />
    </View>
  )
}