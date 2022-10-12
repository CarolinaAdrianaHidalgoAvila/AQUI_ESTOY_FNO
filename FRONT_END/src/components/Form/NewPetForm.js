import React, { useState, useEffect } from 'react';

import ButtonComp from '../Button/ButtonComp';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Autocomplete, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import useFetch from '../../hooks/useFetch';

function NewUserForm(props) {
    const { post } = useFetch("http://localhost:5500/api/");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [specie, setSpecie] = useState("");
    const [gender, setGender] = useState("");
    const [hasQr, setHasQr] = useState("false");

    useEffect(() => {
        console.log(name);
        console.log(age);
        console.log(specie);
        console.log(gender);
        console.log(hasQr);
    }, [name, age, specie, gender, hasQr])
  
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    function handleCreateUserSubmit(event){
        event.preventDefault();
        var pet = {
            namePet: name,
            gender: gender,
            hasNecklace:(hasQr == "true") ? true : false,
            specie: specie
        }
        post("users/6335dba37c28ccc604586936/pets", pet)
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error));
    }

    return ( 
        <div>
            <ButtonComp  onClick={handleOpen}>Crear Mascota</ButtonComp>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Crea una nueva mascota
                    </Typography>
                    <form onSubmit={handleCreateUserSubmit}>
                        <div className='container'>
                            <div className='row justify-content-start'>
                                <div className='col'>
                                    <TextField id="form-pet-name" label="Nombre" variant="outlined" margin='normal' onChange={(e) => {setName(e.target.value)}} required />
                                </div>
                                <div className='col'>
                                    <TextField id="form-pet-age" label="Edad" type="number" variant="outlined" margin='normal' onChange={(e) => {setAge(e.target.value)}} required />
                                </div>
                            </div>
                            <div className='row justify-content-center'>
                                <Autocomplete id="form-pet-spiece" disablePortal variant="outlined" margin='normal' options={species} inputValue={specie} onInputChange={(event, newSpecie) => {setSpecie(newSpecie)}} renderInput={
                                    (params) => <TextField {...params} label="Especie" required />
                                } />
                                <FormLabel id="form-gender-radio-button">Genero: </FormLabel>
                                <RadioGroup row aria-labelledby="dform-gender-radio-button" name="form-gender-radio-button" margin='normal' required onChange={(e) => {setGender(e.target.value)}} >
                                    <FormControlLabel value="M" control={<Radio />} label="Macho" />
                                    <FormControlLabel value="H" control={<Radio />} label="Hembra" />
                                </RadioGroup>
                                <FormLabel id="form-hasQr-radio-button">¿Tiene un collar QR?</FormLabel>
                                <RadioGroup row aria-labelledby="dform-hasQr-radio-button" name="form-hasQr-radio-button" margin='normal' required onChange={(e) => {setHasQr(e.target.value)}} >
                                    <FormControlLabel value="true" control={<Radio />} label="Si" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>
                            </div>
                            <div className="pt-1 mb-4">
                                <input type="submit" value="Crear Mascota" className="btn btn-dark btn-lg btn-block" />
                            </div>
                        </div>
                    </form>
                    
                </Box>
            </Modal>
        </div>
    );
}
const species = [
    {label: "Perro"},
    {label: "Gato"},
    {label: "Loro"},
]

export default NewUserForm;