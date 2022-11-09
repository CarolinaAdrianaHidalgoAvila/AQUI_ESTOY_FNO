import React, { useState, useEffect } from 'react';

import {Input, Autocomplete, Avatar, TextField, InputAdornment, OutlinedInput, InputLabel, FormControl, Box } from "@mui/material";

import useFetch from '../../hooks/useFetch';

import { ButtonAccept } from "../Button/ButtonComp.js";
import { Publication, NewPublication } from "./Publication.js";
import { IconButtonMoreVert } from "../Button/LittleButtons.js";
import DeployalbeMenu from '../Menu/Menu';

function NewLostPublication(props) {
    const {pets, user} = props;

    const { post } = useFetch("http://localhost:5500/api/");

    const [reward, setReward] = useState(0)
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [pet, setPet] = useState({})

    useEffect(() => {
        console.log(description);
        console.log(reward);
        console.log(location);
        console.log(pet);
        const date = new Date("2014-08-19T01:11:54Z");
        console.log(date.toISOString())
    },[description, pet, reward, location])

    function handleSubmitPublication(){
        const dateNow = new Date();
        const publication = {
            namePet: pet.data.namePet,
            species: pet.data.specie,
            datePublication: dateNow.toISOString(),
            location: location,
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

    const userProfilePicture = <>
        <Avatar 
            alt="av" 
            src="https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000" 
            sx={{ width: "50px", height: "50px"}}
        ></Avatar>
    </>;
    
    const buttons = <>
        <ButtonAccept 
            disabled={description.trimStart().length === 0 && location.trimStart().length === 0}
            onClick={handleSubmitPublication}
        >
            Publicar
        </ButtonAccept>
    </>

    return ( 
       <>
            <NewPublication header={userProfilePicture} footer={buttons}>
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
                        value={pet.namePet}
                        inputValue={pet.namePet} 
                        onChange={(event, pet) => {setPet(pet)}} 
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
                            type='number'
                            value={reward}
                            onChange={(e) => {setReward(e.target.value)}}
                            startAdornment={<InputAdornment position="start">Bs.</InputAdornment>}
                            label="Recompensa"
                        />
                    </FormControl>
                </div>
                
            </NewPublication>
       </>
    );
}

function LostPublication(props) {
    const { publication, user } = props;

    const { delete_ } = useFetch("http://localhost:5500/api/");

    function getLocalDate(dateString){
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString("es-mx", options);
    }

    function handleDeletePublication(userId, pubId){
        delete_(`users/${userId}/lostPetsPosts/${pubId}`)
        .then(data => {
            //console.log(data);
            alert("Publicacion Borrada!")
            window.location.href = "/user";
        })
        .catch(error => alert(error));
    }

    const header = <div style={{display: "flex"}}>
        <Avatar 
            alt="av" 
            src="https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000" 
            sx={{ width: "50px", height: "50px"}}
        >  
        </Avatar>
        <div style={{display: "flex", flexDirection: "column" , paddingLeft: "20px"}}>
            <Box sx={{color: "text-secondary"}}>{user.firstName} {user.lastName}</Box>
            <Box sx={{fontSize: "14px", color: "text.disabled"}}>{getLocalDate(publication.datePublication)}</Box>
        </div>
    </div>
    
    const footer = <div style={{display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: "10px"}}>
        <DeployalbeMenu 
            buttonType={<IconButtonMoreVert />}
            options={[
                { label: "Borrar", onClick: () => {handleDeletePublication(user.id, publication.id)} },
            ]}
        />
        <Box sx={{color: "success.main", fontSize: "16px"}}>Bs. {publication.reward}</Box>
        <Box sx={{color: "info.main", fontSize: "16px"}}>{publication.location}</Box>
        <Box sx={{color: "warning.main", fontSize: "16px"}}>{publication.namePet} - {publication.species}</Box>
    </div>
    return ( 
        <>
            <Publication header={header} footer={footer}>
                <Box sx={{fontSize: "16px"}}>
                    {publication.description}
                </Box>
            </Publication>
        </>
    );
}


export { NewLostPublication, LostPublication } ;