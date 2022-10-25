import React, { useState, useEffect, useReducer } from 'react';
import { Avatar, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import NavTab from '../components/NavBar/NavTab';
import {NewPetForm} from "../components/Form/PetForm";
import { ButtonDanger, ButtonCheck } from "../components/Button/ButtonComp";
import { ListCards } from '../components/ListCard/ListCards';
import ConfirmDialog from '../components/Dialogs/ConfirmDialog';
import { EditUserForm } from '../components/Form/UserForm';

import useFetch from '../hooks/useFetch';
import { IconButtonDelete, IconButtonEdit } from '../components/Button/LittleButtons';
import ListPetsCard from '../components/ListCard/ListPetsCards';

function UserProfile(props) {

    const [user, setUser] = useState({});
    const [pets, setPets] = useState([]);

    const [value, setValue] = useState(0);

    const {get, post, delete_, loading} = useFetch("http://localhost:5500/api/");

    const [openConfirm, setOpenConfirm] = useState(false);

    const userId = "632333ceca137c2c4b95168c";

    useEffect(() => {
        //Get user information
        get(`users/${userId}`)
        .then(data => {
            console.log(data);
            setUser(data);
        })
        .catch(error => console.log(error));
        //Get pets from user
        get(`users/${userId}/pets`)
        .then(data => {
            console.log(data);
            setPets(data);
        })
        .catch(error => console.log(error));
    }, []);

    function handleChangeNavTab(event, newValue) {
        setValue(newValue);
    }

    function handleDeleteUser(){
        delete_(`users/${userId}`)
        .then(data => {
            console.log(data);
            alert("Usuario borrado!")
        })
        .catch(error => alert(error))
        .finally(() => {
            setOpenConfirm(false);
            window.location.href = "/";
        })
    }

    if(loading) {
        return (<CircularProgress />);
    }

    return (
        <>
            <div id='user-profile' className='container m-2 userPage'>
                <div className='row align-items-start my-4'>
                    <div className='col col-sm-4'>
                        <Avatar alt={user.firstName} src="https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000" sx={{ width: 250, height: 250 }}> {user.full_name} </Avatar>
                    </div>
                    <div className='col-lg-auto my-auto d-flex flex-column p-2'>
                        <h1 className='display-4'>{`${user.firstName} ${user.lastName}`}</h1>
                        <h5>{user.emali}</h5>
                        <h5>{user.phone}</h5>
                        {user.address !== undefined && <h5>{user.address}</h5>}
                    </div>
                </div>
                <div className='userBody'>
                    <div className='publicationsPetsView'>
                        <div className='my-3'>
                            <NavTab options={["Publicaciones", "Mascotas"]} onChange={handleChangeNavTab} value={value}/>
                        </div>
                        <div className='container'>
                            {(value === 0) && <p>Aqui las Publicaciones</p>}
                            {(value === 1) && 
                                <ListPetsCard 
                                    userId={userId} 
                                    pets={pets}
                                    showKeys={{
                                        "namePet": "Nombre: ",
                                        "specie": "Especie: "
                                        }} 
                                    title={""} 
                                />
                            }
                        </div>
                    </div>
                    <ButtonDanger startIcon={<DeleteIcon />} onClick={() => setOpenConfirm(true)}> Borrar Usuario </ButtonDanger>
                    <EditUserForm userId={userId} user={user} />
                    {
                        openConfirm && 
                        <ConfirmDialog 
                            handleCancel={() => setOpenConfirm(false)} 
                            handleAccept={handleDeleteUser} 
                            dialogMessage={`¿Seguro que desea borrar el usuario de ${user.firstName} ${user.lastName} ?`}
                        />
                    }
                </div>
            </div> 
            
        </>
     );
}

export default UserProfile;