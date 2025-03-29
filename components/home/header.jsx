import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import {useUser} from '@clerk/clerk-expo'
import UserDetailContext from '../../context/UserDetailContext';
export default function Header() {
    const{user} = useUser();
    const {userDetail,setUserDetail} = useContext(UserDetailContext)
    
  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
       
    }}>
      <Text style={{
        fontSize: 30,
        fontWeight: 'bold'
      }}>INGEN AI</Text>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
      }}>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            borderWidth: 0.4,
            borderRadius: 99,
            paddingHorizontal: 10,
            paddingVertical: 4
        }}>
            <Image source={require('./../../assets/images/credit.png')} style={{
                width: 25,
                height: 25
            }}/>
            <Text>{userDetail?.credits}</Text>
        </View>
        <Image source={{uri:user?.imageUrl}} width={40} height={40} style={{
            borderRadius: 30
        }}  />
      </View>
    </View>
  )
}