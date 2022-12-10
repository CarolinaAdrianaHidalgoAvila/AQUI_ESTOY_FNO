import React, { useEffect, useState } from "react";

import {
  Input,
  Autocomplete,
  Avatar,
  TextField,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Box,
  Link,
} from "@mui/material";

import useFetch from "../../hooks/useFetch";

import { ButtonAccept } from "../Button/ButtonComp.js";
import { Publication, NewPublication } from "./Publication.js";
import {
  IconButtonMoreVert,
  IconButtonLocation,
} from "../Button/IconButton.js";
import DeployalbeMenu from "../Menu/Menu";
import { DragMap } from "../Map/Map";
import CarouselImages from '../ImageCarousel/ImageCarousel';

function NewFoundPublication(props) {
  const { user } = props;

  const { post } = useFetch(process.env.REACT_APP_BACKEND_URL);
  const [namePet, setnamePet] = useState("");
  const [species, setSpecies] = useState("");
  const [latitude, setLatitude] = useState(-17.389023);
  const [longitude, setLongitude] = useState(-66.159634);
  const [description, setDescription] = useState("");
  
  useEffect(() => {
    console.log(latitude);
    console.log(longitude);
  }, [latitude, longitude]);

  function handleSubmitPublication() {
    const dateNow = new Date();
    const fpublication = {
      namePet: namePet,
      species: species,
      datePublication: dateNow.toISOString(),
      longitud: longitude,
      latitud: latitude,
      email: user.email,
      description: description,
      userID: user.id,
      personWhoFound: user.firstName + " " + user.lastName,
    };

    post(`users/${user.id}/foundPetsPosts`, fpublication)
      .then((data) => {
        console.log(data);
        if (data !== undefined) {
            window.location.href = "/user";
        }
      })
      .catch((error) => console.log(error));
  }

  
  function handleCoordChange(newLat, newLng) {
    setLatitude(newLat);
    setLongitude(newLng);
  }

  const userProfilePicture = (
    <>
      <Avatar
        alt="av"
        src={user.photo ?? "https://res.cloudinary.com/dmvbmrdak/image/upload/v1669750526/default-avatar-AE_uioe92.jpg"}
        sx={{ width: "50px", height: "50px" }}
      ></Avatar>
    </>
  );

  const buttons = (
    <>
      <ButtonAccept
        disabled={
          description.trimStart().length === 0
        }
        onClick={handleSubmitPublication}
      >
        Publicar
      </ButtonAccept>
    </>
  );

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
          placeholder="Encontro una mascota?"
          sx={{ width: "100%" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "10px",
          }}
        >
          
          <TextField
                    value={namePet}
                    variant="outlined"
                    onChange={(e) => setnamePet(e.target.value)}
                    rows="2"
                    type="text"
                    placeholder="Nombre de la mascota"
                    sx={{ width: "100%" }}
            />
          

          <TextField
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    rows="2"
                    type="text"
                    placeholder="Especie de la mascota"
                    sx={{ width: "100%" }}
            />
        </div>
        <div className="map-container">
          <p>Arrastra el marcador a la ubicacion donde encontro la mascota:</p>
          <DragMap
            lat={latitude}
            lng={longitude}
            zoom={9}
            onCoordChange={handleCoordChange}
          />
        </div>
      </NewPublication>
    </>
  );
}

export default NewFoundPublication;