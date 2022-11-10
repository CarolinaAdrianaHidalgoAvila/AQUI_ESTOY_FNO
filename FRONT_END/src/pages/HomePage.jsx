import React from 'react'
import MediaCard from '../components/MediaCard/MediaCard';
import Sidebar from '../components/HomePage/Sidebar';
import Feed from '../components/HomePage/Feed';
import Rightbar from '../components/HomePage/Rightbar';
import { Box, Stack } from '@mui/material';

function HomePage() {
  return (
    <>
      <div  style={{marginTop: '3em'}} className="homePage">
        <Box>
          <Stack direction='row' spacing={2} justifyContent='space-between' >
            <Sidebar/>
            <Feed/>
            <Rightbar/>

          </Stack>
        </Box>
      </div>
    </>
  )
}

export default HomePage