import {useRef,useState} from 'react'
import { LuUser,LuUpload,LuTrash } from 'react-icons/lu';
const ProfilePhotoSelector=({image,setImage})=>{
    const inputref=useRef(null);
    const [previewUrl,setPreviewUrl]=useState(null);
    const handleImageChange=(event)=>{
        const file=event.target.files[0];
        if(file){
            // update the image site
            setImage(file)

            // Generate preview URL from the file
            const preview=URL.createObjectURL(file)
            setPreviewUrl(preview)
        }
    }

    const handleRemoveImage=()=>{
        setImage(null);
        setPreviewUrl(null)
    }

    const onChooseFile=()=>{
        inputref.current.click()
    }
 return <div className="flex justify-center mb-6">

 </div>
}

export default ProfilePhotoSelector