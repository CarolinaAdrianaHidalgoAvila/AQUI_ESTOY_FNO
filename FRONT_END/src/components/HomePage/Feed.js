import {
  Box

} from "@mui/material";
import React, { useEffect, useState } from "react";
import Post from "./Post";

import useFetch from "../../hooks/useFetch";
import { FoundPublication } from "../Publications/FoundPublication";
import { LostPublication } from "../Publications/LostPublication";

const Feed = (props) => {
  const [lostPublications, setLostPublications] = useState([]);
  const [foundPublication, setFoundPublications] = useState([]);

  const { get } = useFetch('http://localhost:5500/api/');

  useEffect(() => {
    //Get all found pets information
    get('foundPetsPosts')
    .then(data => {
        //console.log(data);
        setFoundPublications(data);
      })
    .catch(error => console.log(error));
    //Get all lost pets information
    get('lostPetsPosts')
    .then(data => {
        //console.log(data);
        setLostPublications(data);
      })
    .catch(error => console.log(error));
  }, [])
  return (
    <Box flex={4} p={2}>
        {
          lostPublications.map(publication => {
            var user
            get(`user/${publication.userID}`)
            .then(data => {
              user = data
            })
            return <LostPublication publication={publication} user={user}/>;
          })
        }
        {
          foundPublication.map(publication => {
            var user
            get(`user/${publication.userID}`)
            .then(data => {
              user = data
            })
            return <FoundPublication publication={publication} user={user}/>;
          })
        }
    </Box>
  );
};

export default Feed;
