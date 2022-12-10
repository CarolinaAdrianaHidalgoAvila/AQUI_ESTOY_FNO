import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogActions, Grid, Card, CardMedia, Typography, CardContent } from '@mui/material';
import CardItem from '../components/ListCard/CardItem';
import { IconButtonReject } from '../components/Button/IconButton';
function ShowOnePet(props) {
    const {Key,Image,Data,Pet, handleCancel, ...rest} = props
    
    const [open, setOpen] = useState(false);
    function handleCancelClose(){
        handleCancel();
        setOpen(false);
        console.log(Pet)
    }

    return (
        <>
            <Dialog
            
            open={true}
            onClose={handleCancelClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            {...rest} >
                <Grid item xs={3}>
                    <Card>
                    {Image !== undefined && <CardMedia image={Image} style={{ alignItems: 'center',width: "250px", height: "250px", marginTop: '5px', marginLeft:'auto',marginRight:' auto', display: ' block' }} />}
                        <CardContent>
                            <Typography><b>Nombre: </b> {Pet.namePet}</Typography>
                            <Typography><b>Especie: </b> {Pet.specie}</Typography>
                            <Typography><b>Género: </b> {Pet.gender}</Typography>
                            <Typography><b>Fecha de nacimiento: </b> {Pet.birthDate}</Typography>
                            <Typography><b>Collar: </b> {Pet.hasNecklace? ('Tiene'): ('No tiene')}</Typography>

                        </CardContent>
                    
                    </Card>

                </Grid>
            



              
            </Dialog> 
        </>
    )
}

export default ShowOnePet