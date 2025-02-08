import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export const useOCR = () => {
    const [image, setImage] = useState("");
    const [extractedText, setExtractedText] = useState("");

    // Function to capture an image using the camera
    const pickImageCamera = async () => {
        console.log("beginning of pickImageCamera")
        
        /*
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            base64: true,
            allowsMultipleSelection: false,
        });
        */

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            performOCR(result.assets[0]);
            setImage(result.assets[0].uri);
        }
    };

    // Function to perform OCR on an image
    const performOCR = (file: any) => {
        let myHeaders = new Headers();
        myHeaders.append("apikey", "CTgSFiBHenGEBFAC5RQpaxAntktMS6Xm");
        myHeaders.append("Content-Type", "multipart/form-data");

        let requestOptions = {
            method: "POST",
            redirect: "follow" as RequestRedirect,
            headers: myHeaders,
            body: file,
        };

        fetch("https://api.apilayer.com/image_to_text/upload", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setExtractedText(result["all_text"]);
            })
            .catch((error) => console.log("error", error));

        console.log(extractedText)
    };

    return {
        image,
        extractedText,
        pickImageCamera,
    };
};
