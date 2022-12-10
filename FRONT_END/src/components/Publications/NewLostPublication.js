import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

import { Avatar, Input, Autocomplete, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Box } from '@mui/material';
import { ButtonAccept } from "../Button/ButtonComp.js";
import { Publication, NewPublication } from "./Publication.js";
import { IconButtonMoreVert, IconButtonLocation } from "../Button/IconButton.js";
import DeployalbeMenu from '../Menu/Menu';
import { DragMap } from '../Map/Map';
import DragAndDropZone from '../DragAndDrop/DragAndDropZone';
import CarouselImages from '../ImageCarousel/ImageCarousel';

function NewLostPublication(props) {
    const {pets, user} = props;

    const { post } = useFetch(process.env.REACT_APP_BACKEND_URL);

    const [reward, setReward] = useState(0)
    const [latitude, setLatitude] = useState(-17.389023);
    const [longitude, setLongitude] = useState(-66.159634);
    const [description, setDescription] = useState("");
    const [pet, setPet] = useState({});

    useEffect(() => {
        console.log(latitude);
        console.log(longitude);
    },[latitude, longitude])

    function handleSubmitPublication(){
        const dateNow = new Date();
        const publication = {
            namePet: pet.data.namePet,
            species: pet.data.specie,
            datePublication: dateNow.toISOString(),
            longitud: longitude,
            latitud: latitude,
            email: user.email,
            description: description,
            reward: parseInt(reward),
            userID: user.id,
        }

        post(`users/${user.id}/lostPetsPosts`, publication)
        .then(data => {
            console.log(data);
            if(data !== undefined){
                window.location.href = "/user";
            }
        })
        .catch(error => console.log(error));
    }

    function getPetsOptions(pets){
        return pets.map((p) => {
            return (
                {label: p.namePet, data: p}
            );
        })
    }

    function handleCoordChange(newLat, newLng){
        setLatitude(newLat);
        setLongitude(newLng);
    }

    const userProfilePicture = <>
        <Avatar 
            alt="av" 
            src={user.photo ?? "https://res.cloudinary.com/dmvbmrdak/image/upload/v1669750526/default-avatar-AE_uioe92.jpg"} 
            sx={{ width: "50px", height: "50px"}}
        ></Avatar>
    </>;
    
    const buttons = <>
        <ButtonAccept 
            disabled={description.trimStart().length === 0}
            onClick={handleSubmitPublication}
        >
            Publicar
        </ButtonAccept>
    </>

    return ( 
       <>
            <NewPublication header={userProfilePicture} footer={buttons}>
                <DragAndDropZone />
                <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows="2"
                    disableUnderline
                    type="text"
                    placeholder="¿Perdio a su mascota?"
                    sx={{ width: "100%" }}
                />
                <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px"}}>
                    <Autocomplete 
                        id="form-publication-lost-pet" 
                        disablePortal 
                        variant="outlined" 
                        options={getPetsOptions(pets)} 
                        value={pet.namePet}
                        inputValue={pet.namePet} 
                        onChange={(event, pet) => {setPet(pet)}} 
                        renderInput={
                            (params) => <TextField {...params} label="Mascota" required />
                        }
                        sx={{flexGrow: 1}}
                    />
                    <FormControl>
                        <InputLabel htmlFor="form-publication-lost-reward">Recompensa:</InputLabel>
                        <OutlinedInput
                            id="form-publication-lost-reward"
                            type='number'
                            value={reward}
                            onChange={(e) => {setReward(e.target.value)}}
                            startAdornment={<InputAdornment position="start">Bs.</InputAdornment>}
                            label="Recompensa"
                        />
                    </FormControl>
                </div>
                <div className='map-container'>
                    <p>Arrastra el marcador a la ubicacion donde perdio a su mascota:</p>
                    <DragMap lat={latitude} lng={longitude} zoom={9} onCoordChange={handleCoordChange}/>
                </div>
            </NewPublication>
       </>
    );
}

export default NewLostPublication;