import React, { useState, useEffect, useReducer } from 'react';
import { Avatar, CircularProgress } from '@mui/material';

import NavTab from '../components/NavBar/NavTab';
import NewPetForm from "../components/Form/NewPetForm";
import ShowPets from "../components/ListComponents/ShowPets";

import useFetch from '../hooks/useFetch';

function UserProfile(props) {

    const [user, setUser] = useState({})
    const [value, setValue] = useState(0);
    const {get, loading} = useFetch("http://localhost:5500/api/");

    useEffect(() => {
        get("users/632280d2a2f22b65f6585b32")
        .then(data => {
            console.log(data);
            setUser(data);
        })
        .catch(error => console.log(error));
    }, []);

    function handleChangeNavTab(event, newValue) {
        setValue(newValue);
    }

    if(loading) {
        return (<CircularProgress />);
    }

    return (
        <>
            <div id='user-profile' className='container m-2'>
                <div className='row align-items-start my-4'>
                    <div className='col col-sm-4'>
                        <Avatar alt={user.firstName} src="https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000" sx={{ width: 250, height: 250 }}> {user.full_name} </Avatar>
                    </div>
                    <div className='col-lg-auto my-auto d-flex flex-column p-2'>
                        <h1 className='display-4'>{`${user.firstName} ${user.lastName}`}</h1>
                        <h5>{user.emali}</h5>
                        <h5>{user.phone}</h5>
                        {user.address != undefined && <h5>{user.address}</h5>}
                    </div>
                </div>
                <div className='my-3'>
                    <NavTab options={["Publicaciones", "Mascotas"]} onChange={handleChangeNavTab} value={value}/>
                </div>
                <div className='container'>
                    {(value === 0) && <p>Aqui las Publicaciones</p>}
                    {(value === 1) && <ShowPets/>}
                </div>
                <NewPetForm />
            </div> 
            
        </>
     );
}

export default UserProfile;