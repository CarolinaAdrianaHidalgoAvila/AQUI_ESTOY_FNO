import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import ArticleIcon from '@mui/icons-material/Article';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Sidebar = () => {
  return (
    <Box flex={1}  p={2} sx={{display:{xs:'none' , sm:'block'}}}>


        <List>
            <ListItem disablePadding>
                <ListItemButton component='a' href='/'>
                <ListItemIcon>
                    <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary="Pagina principal" />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton component='a' href='/'>
                <ListItemIcon>
                    <PetsIcon/>
                </ListItemIcon>
                <ListItemText primary="Tus Mascotas" />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton component='a' href='/'>
                <ListItemIcon>
                    <ArticleIcon/>
                </ListItemIcon>
                <ListItemText primary="Tus publicaciones" />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton component='a' href='/'>
                <ListItemIcon>
                    <BarChartIcon/>
                </ListItemIcon>
                <ListItemText primary="Estadisticas" />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton component='a' href='/user'>
                <ListItemIcon>
                    <AccountBoxIcon/>
                </ListItemIcon>
                <ListItemText primary="Perfil" />
                </ListItemButton>
            </ListItem>


        </List>



    </Box>

  )
}

export default Sidebar