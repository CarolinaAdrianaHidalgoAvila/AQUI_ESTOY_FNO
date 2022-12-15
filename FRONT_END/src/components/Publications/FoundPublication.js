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

function FoundPublication(props) {
  const { fpublication } = props;
  
  const [user, setUser] = useState({});

  const { delete_, get } = useFetch(process.env.REACT_APP_BACKEND_URL);

  useEffect(() => {
    get(`users/${fpublication.userID}`)
    .then(data => {
        setUser(data);
    })
    .catch(error => console.log(error))
}, [])

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
        {
            fpublication.photos.length > 0 ? <CarouselImages imagesList={fpublication.photos}/> : <></>
        }
        <Box sx={{ fontSize: "16px" }}>{fpublication.description}</Box>
      </Publication>
    </>
  );
}

export default FoundPublication;
