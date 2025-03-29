import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import React, { useCallback, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { useSSO } from '@clerk/clerk-expo'
import Colors from './../../constants/Colors'
export default function index() {
  useWarmUpBrowser()
 console.log('hi')
  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO()

  const onPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri({scheme: 'myapp',path: '/(tabs)/home'}),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        await setActive({ session: createdSessionId });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])


  return (
    <View>
      <Image source={require('./../../assets/images/logren.png')} 
      style= {{
        width: '100%',
        height: '79%'
      }}
      />

      <View style={styles.loginContainer}>
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center'
        }}> Welcome to NGen</Text>

        <Text style={{
          color: Colors.GRAY,
          textAlign: 'center',
          marginTop: 10
        }}>Create AI Art Just Ons Click</Text>

<TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
  <Text style = {{
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }}>Continue</Text>
</TouchableOpacity>

<Text style={{
  color: Colors.GRAY,
  textAlign: 'center',
  marginTop: 10
}}> By continuing you agree with our terms and conditions</Text>
      </View>




    </View>
  )
}

const styles = StyleSheet.create({
  loginContainer:{
    padding: 25,
    marginTop: - 20,
    backgroundColor:'white',
    height: '20%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonContainer:{
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    padding: 20,
    borderRadius: 40,
    marginTop: 20
  }
});

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}
WebBrowser.maybeCompleteAuthSession()