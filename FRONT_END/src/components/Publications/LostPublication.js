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

function LostPublication(props) {
    const { publication, user } = props;

    const { delete_ } = useFetch("http://localhost:5500/api/");

    function getLocalDate(dateString){
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString("es-mx", options);
    }

    function handleDeletePublication(){
        console.log(user.id);
        console.log(publication.idPublication);
        delete_(`users/${user.id}/lostPetsPosts/${publication.idPublication}`)
        .then(data => {
            //console.log(data);
            alert("Publicacion Borrada!")
        })
        .catch(error => console.log(error))
        .finally(() => {
            window.location.href = "/user";
        });
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
                { label: "Borrar", onClick: handleDeletePublication} ,
            ]}
        />
        <Box sx={{color: "success.main", fontSize: "16px"}}>Bs. {publication.reward}</Box>
        <IconButtonLocation
          rel="noopener noreferrer"
          href={`https://www.google.com/maps?q=${publication.latitud},${publication.longitud}`}
          target="_blank"
        />
        <Box sx={{color: "warning.main", fontSize: "16px"}}>{publication.namePet} - {publication.species}</Box>
    </div>
    return ( 
        <>
            <Publication header={header} footer={footer}>
                <CarouselImages />
                <Box sx={{fontSize: "16px"}}>
                    {publication.description}
                </Box>
            </Publication>
        </>
    );
}


export default LostPublication;