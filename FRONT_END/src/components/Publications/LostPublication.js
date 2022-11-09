import React, { useState, useEffect } from 'react';

import {Input, Autocomplete, Avatar, TextField, InputAdornment, OutlinedInput, InputLabel, FormControl, Box } from "@mui/material";

import { ButtonAccept } from "../Button/ButtonComp.js";
import { Publication } from "./Publication.js";
import { IconButtonLike, IconButtonComment, IconButtonShare } from "../Button/LittleButtons.js";
import { color } from '@mui/system';

function NewLostPublication(props) {
    const {pets, user} = props;

    const [reward, setReward] = useState(0)
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [pet, setPet] = useState({})

    const userProfilePicture = <Avatar alt="av" src="https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000" sx={{ width: "50px", height: "50px"}}>  </Avatar>
    const buttons = <ButtonAccept disabled={description.trimStart().length === 0 && location.trimStart().length === 0}>Publicar</ButtonAccept>

    useEffect(() => {
        console.log(description);
        console.log(pet);
    },[description, pet])

    function getPetsOptions(pets){
        return pets.map((p) => {
            return (
                {label: p.namePet, data: p}
            );
        })
    }

    return ( 
       <>
            <Publication header={userProfilePicture} footer={buttons}>
                <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows="2"
                    disableUnderline
                    type="text"
                    placeholder="¿Perido a su mascota?"
                    sx={{ width: "100%" }}
                />
                <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px"}}>
                    <Autocomplete 
                        id="form-publication-lost-pet" 
                        disablePortal 
                        variant="outlined" 
                        options={getPetsOptions(pets)} 
                        inputValue={pet.namePet} 
                        onInputChange={(event, newPet) => {setPet(newPet)}} 
                        renderInput={
                            (params) => <TextField {...params} label="Mascota" required />
                        }
                        sx={{flexGrow: 1}}
                    />
                    <TextField 
                        id="form-publication-lost-location" 
                        label="Localizacion" 
                        variant="outlined" 
                        value={location}
                        onChange={(e) => {setLocation(e.target.value)}} 
                        required
                        sx={{flexGrow: 6}} 
                    />
                    <FormControl>
                        <InputLabel htmlFor="form-publication-lost-reward">Recompensa:</InputLabel>
                        <OutlinedInput
                            id="form-publication-lost-reward"
                            value={reward}
                            onChange={(e) => {setReward(e.target.value)}}
                            startAdornment={<InputAdornment position="start">Bs.</InputAdornment>}
                            label="Recompensa"
                        />
                    </FormControl>
                </div>
                
            </Publication>
       </>
    );
}

function LostPublication(props) {

    const header = <div style={{display: "flex"}}>
        <Avatar 
            alt="av" 
            src="https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000" 
            sx={{ width: "50px", height: "50px"}}
        >  
        </Avatar>
        <div style={{display: "flex", flexDirection: "column" , paddingLeft: "20px"}}>
            <Box sx={{color: "text-secondary"}}>Roberto Silvaa rocabado</Box>
            <Box sx={{fontSize: "14px", color: "text.disabled"}}>17 de Octubre de 2022</Box>
        </div>
    </div>
    
    const footer = <div style={{display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: "10px"}}>
        <IconButtonLike />
        <IconButtonComment />
        <IconButtonShare />
        <Box sx={{color: "success.main", fontSize: "16px"}}>Bs. 1000</Box>
        <Box sx={{color: "info.main", fontSize: "16px"}}>Parque Fidel Anze</Box>
    </div>
    return ( 
        <>
            <Publication header={header} footer={footer}>
                <Box sx={{fontSize: "16px"}}>
                Mi mascota se perido porfa ayuda a quien pueda encontrarle, es un perrito de medio año pug se perdio por la Av. Circunvalacion junto a los pollos panchita, le gusta mucho esos pollos
                </Box>
            </Publication>
        </>
    );
}


export { NewLostPublication, LostPublication } ;