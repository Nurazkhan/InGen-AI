import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ToastAndroid,
} from "react-native";

import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import TextInputComponent from "../components/home/FormInput/TextInputComponent";
import ImageUploadComponent from "../components/home/FormInput/ImageUploadComponent";
import GlobalApi from "../services/GlobalApi";
import UserDetailContext from "./../context/UserDetailContext";
import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";
export default function FormInput() {
  const [userInput, setUserInput] = useState();
  const [userImage, setUserImage] = useState();
  const [loading, setLoading] = useState(false);
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const [aiModel, setAiModel] = useState();
  const [generatedImage, setGeneratedImage] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();
  let aiImage;

  useEffect(() => {
    // console.log("Params: ", params)
    setAiModel(params);
    navigation.setOptions({
      headerShown: true,
      headerTitle: params?.Name,
    });
  }, []);

  const onGenerate = async () => {
    if(userDetail.credits <= 0){
        ToastAndroid.show('You Dont Have Enough Credits', ToastAndroid.LONG)
        return ;
    }


    if (
      aiModel?.userImageUpload == 'true'
    ) {
       
        ImagetoImage();
        
    } else {
       
      
        TexttoImage();
    }
  };

  const TexttoImage = async () => {
    setLoading(true);
    
    const data = {
      aiModelName: aiModel?.AIModelName,
      inputPrompt: userInput,
      defaultPrompt: aiModel?.defaultPrompt,
    };
    try {
      const result = await GlobalApi.AIGenerateImage(data);
      // console.log("r0",result[0]) wrong
      // console.log("r",result) wrong
      // console.log("rd", result?.data) wrong
      // console.log("rd0", result?.data[0]) // just link
      aiImage = result?.data[0];

      // console.log('ui',userImage)
      // to update creadit
      const updatedResult = await GlobalApi.UpdateUserCredits(
        userDetail?.documentId,
        { credits: Number(userDetail?.credits) - 1 }
      );

      // console.log("urd",updatedResult?.data)
      setUserDetail(updatedResult?.data.data);
      UploadImageAndSave(aiImage)
     
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const ImagetoImage = async () => {
    try {
      setLoading(true);
      // console.log(userImage) user uploaded image filepath
      // upload image to cloudinary
      const cld = new Cloudinary({
        cloud: {
          cloudName: "dzpylikkn",
        },
        url: {
          secure: true,
        },
      });

      const options = {
        upload_preset: "aifnocza",
        unsigned: true,
      };

      await upload(cld, {
        file: userImage,
        options: options,
        callback: async (error, response) => {
          //   console.log(response?.url) user image in cloudinary

          const data = {
            defaultPrompt: aiModel?.defaultPrompt,
            userImageUrl: response?.url,
            aiModelName: aiModel?.AIModelName,
          };
          const result = await GlobalApi.AIGenerateImage(data);
          console.log("ImagetoAiImage",result?.data); 
          const aiGenImage =  Array.isArray(result?.data) ? result?.data : [result?.data];
        //   console.log(aiGenImage[0])
          UploadImageAndSave(aiGenImage[0])
    
          const updatedResult = await GlobalApi.UpdateUserCredits(
            userDetail?.documentId,
            { credits: Number(userDetail?.credits) - 1 }
          );
    
          setUserDetail(updatedResult?.data.data);
    
          setLoading(false);
          router.push({
            pathname: "ViewAiImage",
            params: {
              imageUrl: aiGenImage[0],
              prompt: aiModel?.Name,
            },
          });
        },
      });
      //generate image

     
    } catch (e) {
      console.log(e);
    }
  };

  const UploadImageAndSave = async(aiImage)=>{
 
 //upload to cloudinary
 const cld = new Cloudinary({
    cloud: {
      cloudName: "dzpylikkn",
    },
    url: {
      secure: true,
    },
  });

  const options = {
    upload_preset: "aifnocza",
    unsigned: true,
  };

  await upload(cld, {
    file: aiImage,
    options: options,
    callback: async (error, response) => {
    console.log(response?.url) //user image in cloudinary

    const saveImageData = {
        imageUrl: response?.url,
        userEmail: userDetail?.userEmail,
      };
      const SaveImageResult = await GlobalApi.AddAiImageRecord(saveImageData);
      router.replace({
        pathname: "ViewAiImage",
        params: {
          imageUrl: response?.url,
          prompt: userInput,
        },
      });
    },
  });
 
    // save image url
 

  
  }
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <View>
        {/*Text Input*/}
        {aiModel?.userImageUpload == "true" ? (
          <ImageUploadComponent
            uploadedImage={(value) => setUserImage(value)}
          />
        ) : (
          <TextInputComponent userInputValue={(value) => setUserInput(value)} />
        )}
        <Text
          style={{
            color: "gray",
            marginTop: 10,
          }}
        >
          NOTE: 1 Credit will use to generate AI image
        </Text>

        <TouchableOpacity
          onPress={() => onGenerate()}
          disabled={loading}
          style={{
            padding: 15,
            backgroundColor: "black",
            borderRadius: 15,
            marginVertical: 15,
          }}
        >
          {loading ? (
            <ActivityIndicator size={"large"} color={"white"} />
          ) : (
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              Generate
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
