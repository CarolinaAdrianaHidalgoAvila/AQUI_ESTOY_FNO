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
    console.log(lostPublications);
    console.log(foundPublication);
  }, [])
  return (
    <Box flex={4} p={2}>
      <Post />
      <Post />
      <Post />
      <Post />
    </Box>
  );
};

export default Feed;
