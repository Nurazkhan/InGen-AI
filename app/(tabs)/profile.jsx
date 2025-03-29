import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import UserDetailContext from './../../context/UserDetailContext';
import {useUser,useClerk } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router';
import GlobalApi from '../../services/GlobalApi';
export default function Profile() {
  const router = useRouter()
const { userDetail,setUserDetail } = useContext(UserDetailContext);
const {signOut}= useClerk()
const{user} = useUser();

const buycredit = async(amount) =>{

const updatedResult = await GlobalApi.UpdateUserCredits(
            userDetail?.documentId,
            { credits: Number(userDetail?.credits) +amount }
          );
    
          setUserDetail(updatedResult?.data.data);
}

const handleSignOut = async () => {
  try {
    await signOut(),
    router.replace('/')
  } catch (err) {
    console.error(JSON.stringify(err, null, 2))
  }
}

  return (
    <View>
      <Text
      style={{
        fontSize:28,
        fontWeight:'bold',
        margin: 25
      }}>Profile</Text>
      <Image source={{uri: user?.imageUrl}} style={{width:100, height: 100, borderRadius: 99, alignSelf:'center'}} />
      <Text style={{fontSize: 28, fontWeight:'bold', alignSelf:'center', marginTop: 10}}>{user?.fullName}</Text>
      <Text style={{color:'grey', alignSelf:'center'}}>{userDetail?.userEmail}</Text>
      
      <TouchableOpacity onPress={()=>buycredit(10)} style={{width:'70%', height:70, backgroundColor:'black'
        , alignItems:'center', justifyContent:'center', borderRadius: 15, alignSelf:'center', margin: 25}} >
        <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color:'white'
        }}>Buy Credit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignOut} style={{width:'70%', height:70, backgroundColor:'black'
        , alignItems:'center', justifyContent:'center', borderRadius: 15, alignSelf:'center'}} >
        <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color:'white'
        }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}