import React, { useState, createRef } from 'react';

import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Input, Avatar } from '@mui/material';


function ProfilePictureInput(props) {
    const [image, _setImage] = useState();
    const inputFileRef = createRef();

    function cleanup() {
        URL.revokeObjectURL(image && props.image);
        inputFileRef.current.value = null;
    }

    function setImage(newImage) {
        if(image) {
            cleanup();
        }
        _setImage(newImage);
    }

    function handleOnChange(event){
        const newImage = event.target.files[0];
        if(newImage) {
            setImage(URL.createObjectURL(newImage));
            console.log(image);
        }
        props.imageUpload(event);
    }
    const defaultSx = {
        width: 100,
        height: 100,
    }
    return (
        <>
            <IconButton color="inherit" aria-label="upload picture" component="label" sx={defaultSx}>
                <Input hidden id="profile-picture-user" ref={inputFileRef} accept="image/*" type="file" onChange={handleOnChange}/>
                <Avatar
                    alt='Avatar'
                    src={image} 
                    sx={defaultSx}
                />
            </IconButton>
        </> 
    );
}

export default ProfilePictureInput;
