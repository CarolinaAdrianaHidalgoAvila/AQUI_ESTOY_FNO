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
} from "../Button/LittleButtons.js";
import DeployalbeMenu from "../Menu/Menu";
import { DragMap } from "../Map/Map";
import CarouselImages from '../ImageCarousel/ImageCarousel';

function NewFoundPublication(props) {
  const { user } = props;

  const { post } = useFetch("http://localhost:5500/api/");
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

function FoundPublication(props) {
  const { fpublication, user } = props;

  const { delete_ } = useFetch("http://localhost:5500/api/");

  function getLocalDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("es-mx", options);
  }

  function handleDeletePublication(userId, pubId) {
    delete_(`users/${userId}/foundPetsPosts/${pubId}`)
        alert("Publicacion Borrada!");
        window.location.href = "/user";
  }

  const header = (
    <div style={{ display: "flex" }}>
      <Avatar
        alt="av"
        src={user.photo ?? "https://res.cloudinary.com/dmvbmrdak/image/upload/v1669750526/default-avatar-AE_uioe92.jpg"}
        sx={{ width: "50px", height: "50px" }}
      ></Avatar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: "20px",
        }}
      >
        <Box sx={{ color: "text-secondary" }}>
          {user.firstName} {user.lastName}
        </Box>
        <Box sx={{ fontSize: "14px", color: "text.disabled" }}>
          {getLocalDate(fpublication.datePublication)}
        </Box>
      </div>
    </div>
  );

  const footer = (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <DeployalbeMenu
        buttonType={<IconButtonMoreVert />}
        options={[
          {
            label: "Borrar",
            onClick: () => {
              handleDeletePublication(user.id, fpublication.idFoundPetPost);
            },
          },
        ]}
      />
      <Box sx={{ color: "info.main", fontSize: "16px" }}>
        <IconButtonLocation
          rel="noopener noreferrer"
          href={`https://www.google.com/maps?q=${fpublication.latitud},${fpublication.longitud}`}
          target="_blank"
        />
      </Box>
      <Box sx={{ color: "success.main", fontSize: "16px" }}>
        Encontrado por: {fpublication.personWhoFound}
      </Box>
      <Box sx={{color: "warning.main", fontSize: "16px"}}>{fpublication.namePet} - {fpublication.species}</Box>
      
    </div>
  );
  return (
    <>
      <Publication header={header} footer={footer}>
      <CarouselImages />
        <Box sx={{ fontSize: "16px" }}>{fpublication.description}</Box>
      </Publication>
    </>
  );
}

export { NewFoundPublication, FoundPublication };
