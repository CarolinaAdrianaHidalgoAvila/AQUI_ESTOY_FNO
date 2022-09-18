import React from 'react'
import {useState} from 'react'
import PetsIcon from '@mui/icons-material/Pets';
import { AppBar, Grid, Typography, Toolbar, Tabs , Tab, Box, Button ,useTheme , useMediaQuery} from '@mui/material';
import DrawerComp from './DrawerComp';


function Navbar({links}) {
  const theme = useTheme();
  
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const [value, setValue] = useState();
  return (
    <AppBar sx={{backgroundImage: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,115,1) 35%, rgba(0,212,255,1) 100%);'}}>
      <Toolbar>
        
        { isMatch ? <>
          <Grid item xs={2}>
            <Typography>
              <PetsIcon/>
            </Typography>
          </Grid>
          <Grid sx={{ marginLeft: 4 }} item xs ={6} >
              <Box >
                <Button sx={{marginLeft:'auto', background: 'rgba(9,121,115,1)'}} variant='contained'>
                  User
                </Button>
                <Button  sx={{marginLeft:1, background:'rgba(9,121,115,1)'}} variant='contained'>
                  Create User
                </Button>
              </Box>
          </Grid>
          <DrawerComp links={links}/>

        </> 
        : <Grid sx={{ placeItems: 'center'}} container>
            
            <Grid item xs={1}>
              <Typography>
                <PetsIcon/>
              </Typography>
              <Typography>
                AQUI ESTOY!
              </Typography>
            </Grid>
            
            <Grid item xs ={1} />
            <Grid  item xs={5}>
              <Tabs 
                indicatorColor='secondary' 
                textColor='inherit' 
                value={value} 
                onChange ={(e,val) => setValue(val) }
              >
                {links.map((link,index)=>(
                  <Tab key={index} label={link} />
                ))}
                
                
              </Tabs>
            </Grid>

            <Grid  xs ={1} />
            <Grid  sx={{ marginLeft: 8 }} item xs ={3} >
              <Box display= 'flex'>
                <Button sx={{marginLeft:'auto', background: 'rgba(9,121,115,1)'}} variant='contained'>
                  User
                </Button>
                <Button  sx={{marginLeft:1, background:'rgba(9,121,115,1)'}} variant='contained'>
                  Create User
                </Button>
              </Box>
            </Grid>

        </Grid>}
        
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
