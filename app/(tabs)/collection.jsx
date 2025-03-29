import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import GlobalApi from '../../services/GlobalApi';
import UserDetailContext from './../../context/UserDetailContext';

export default function Collection() {
  const [loading, setLoading] = useState(false);
  const { userDetail } = useContext(UserDetailContext);
  const [imageList, setImageList] = useState([]);
  

  const ColumnWidth = Dimensions.get('screen').width * 0.8 / 2;

  const GetAllUserImages = async (email) => {
    setLoading(true);
    try {
      const result = await GlobalApi.GetAllUserImages(email);
   
      
      setImageList(result.data.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };


  useEffect(() => {
    if (userDetail?.userEmail) {
      GetAllUserImages(userDetail.userEmail);
    }
  }, [userDetail]);

  return (
    <View style={{
      alignItems:'center'
    }}>
      <Text style={{ margin: 20, fontSize: 20, fontWeight: 'bold' }}>Your Generated Images</Text>
      <FlatList showsVerticalScrollIndicator={false}
        data={imageList}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Image 
              source={{ uri: item?.imageUrl }}
              style={{
                width: ColumnWidth,
                height: 250,
                borderRadius: 15,
                margin: 8
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
