import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosinstance";

const uploadImage=async(imageFile)=>{
    const formdata=new FormData();

    //Append image file to form data
    formdata.append('image',imageFile);
    try{
        const response=await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formdata,{
            headers:{
                'Content-Type':'multipart/form-data', //set header for file upload
            },
        });
        return response.data;  //return response data
    }
    catch(error){
        console.log('Error uploading the image: ',error);
        throw error;
    }
}

export default uploadImage;