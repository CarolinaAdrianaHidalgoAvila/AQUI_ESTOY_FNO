import React from 'react'
import {useState} from 'react'
import { AppBar, Grid, Typography, Toolbar, Tabs , Tab, Box, Button ,useTheme , useMediaQuery} from '@mui/material';
import DrawerComp from './DrawerComp';
import NewUserForm from '../Form/NewUserForm';
import ButtonComp from '../Button/ButtonComp';
import logo from '../../Images/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {
  const theme = useTheme();
  
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  function handleClickUser(){
    console.log("Button clicked")
    window.location.href = "/user";
  }

  function handleClickCreateUser(){
    <NewUserForm/>
  }

  function handleClickHome(){
    window.location.href = "/";
  }

  const [value, setValue] = useState();
  return (
    <AppBar sx={{backgroundColor: '#ffc478'}}>
      <Toolbar>
        
        { isMatch ? <>
          <Grid item xs={2}  >
            <Typography sx={{cursor:'pointer'}}>
              <img
                    
                    onClick={handleClickHome}
                    height="60"
                    width='110'
                    src={logo}
                    alt="aqui estoy"
                    className="logo-img-nvar"
              />
            </Typography>
          </Grid>
          <DrawerComp/>
        </> 
        : <Grid sx={{ placeItems: 'center', color:'#023859'}} container>
            
            <Grid item xs={1}>
              <Typography sx={{cursor:'pointer'}}>
                <img
                      onClick={handleClickHome}
                      height="60"
                      width='150'
                      src={logo}
                      alt="aqui estoy"
                      className="logo-img-nvar"
                />
              </Typography>
            </Grid>
            
            

            <Grid xs={9} />
            <NewUserForm sx={{color: '#75cfbb',cursor: 'pointer',marginLeft:10,width:150,textTransform:'none'}}/>
            <Grid  item xs={0}>
                <AccountCircleIcon sx={{color: '#75cfbb',cursor: 'pointer',marginLeft:5, fontSize: 50}} fontSize="large" onClick={handleClickUser} />
            </Grid>
            
            

           

        </Grid>}
          
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
