import React from 'react'
import {Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import { useState } from 'react'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NewUserForm from '../Form/NewUserForm';
import {ButtonComp} from '../Button/ButtonComp';
const DrawerComp = () => {
    const [open, setOpen] = useState(false)
    function handleClickUser(){
      console.log("Button clicked")
      window.location.href = "/user";
    }
  return (
    <>
      <Drawer 
        PaperProps={{
          sx: {backgroundColor:'#ffc478' }
        }} 
        open={open} 
        onClose={()=>setOpen(false)} >
        <List>
          <ButtonComp sx={{backgroundColor:'#75cfbb',marginBottom: 2}} onClick={handleClickUser}>
                  User
          </ButtonComp>
          <NewUserForm sx={{marginTop: 10}}/>
          
        </List>
      </Drawer>
      <IconButton sx={{marginLeft: 'auto', color: 'white'}} onClick= {()=>setOpen(!open)}>
          <MenuRoundedIcon/>
      </IconButton>
    </>
  )
}

export default DrawerComp