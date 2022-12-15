import React, { useState, useEffect } from 'react';
import { Avatar, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import NavTab from '../components/NavBar/NavTab';
import { ButtonDanger } from "../components/Button/ButtonComp";
import ConfirmDialog from '../components/Dialogs/ConfirmDialog';
import { EditUserForm } from '../components/Form/UserForm';

import useFetch from '../hooks/useFetch';
import ListPetsCard from '../components/ListCard/ListPetsCards';
import LostPublication from '../components/Publications/LostPublication';
import NewLostPublication from '../components/Publications/NewLostPublication';
import FoundPublication from '../components/Publications/FoundPublication';
import NewFoundPublication from '../components/Publications/NewFoundPublication'
import DropdownList from '../components/DropdownList/DropdownList';

function UserProfile(props) {

    const [user, setUser] = useState({});
    const [pets, setPets] = useState([]);
    const [publications, setPublications] = useState([]);
    const [fpublications, setfPublications] = useState([]);
    const [value, setValue] = useState(0);

    const {get, post, delete_, loading} = useFetch(process.env.REACT_APP_BACKEND_URL);

    const [openConfirm, setOpenConfirm] = useState(false);

    const userId = "6386836d402204f69c087655";

    useEffect(() => {
        //Get user information
        get(`users/${userId}`)
        .then(data => {
            //console.log(data);
            setUser(data);
        })
        .catch(error => console.log(error));

        //Get pets from user
        get(`users/${userId}/pets`)
        .then(data => {
            //console.log(data);
            setPets(data);
        })
        .catch(error => console.log(error));

        //Get publications from user
        get(`users/${userId}/lostPetsPosts`)
        .then(data => {
            //console.log(data);
            setPublications(data);
        })
        .catch(error => console.log(error));


        
        get(`users/${userId}/foundPetsPosts`)
        .then(data => {
            //console.log(data);
            setfPublications(data);
        })
        .catch(error => console.log(error));

    }, []);

    function handleChangeNavTab(event, newValue) {
        setValue(newValue);
    }

    function handleDeleteUser(){
        delete_(`users/${userId}`)
        .then(data => {
            //console.log(data);
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
                        <Avatar
                            src={user.photo ?? "https://res.cloudinary.com/dmvbmrdak/image/upload/v1669750526/default-avatar-AE_uioe92.jpg"} 
                            sx={{ width: 250, height: 250 }}
                        >
                            {user.full_name} 
                        </Avatar>
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
                            {(value === 0) &&
                                <div>
                                    <DropdownList name="Publicaciones de Perdidios">
                                        <NewLostPublication user={user} pets={pets} />
                                        <br/>
                                        { 
                                            publications.map((publication) => {
                                                return(
                                                    <LostPublication publication={publication} user={user} />
                                                );
                                            })
                                        }
                                    </DropdownList>
                                    <DropdownList name="Publicaciones de Encontrados">
                                    <NewFoundPublication user = {user}/>
                                        <br/>
                                        { 
                                            fpublications.map((fpublication) => {
                                                return(
                                                    <FoundPublication fpublication={fpublication} user={user} />
                                                );
                                            })
                                        }
                                    </DropdownList>
                                </div>
                                    
                            }
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