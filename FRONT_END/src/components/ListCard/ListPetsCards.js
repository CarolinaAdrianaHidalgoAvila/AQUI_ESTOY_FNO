import React, { useState, useEffect } from 'react';

import { ListCards } from './ListCards';
import { IconButtonEdit, IconButtonDelete } from '../Button/LittleButtons';
import NewPetForm from '../Form/NewPetForm';
import ConfirmDialog from '../Dialogs/ConfirmDialog';
import defImage from '../../Images/dog.jpg';
import CardItem from './CardItem';

import { Grid } from '@mui/material';

import useFetch from '../../hooks/useFetch';


function ListPetsCard(props) {
    const { userId, pets, showKeys, title, children } = props;

    const  [openConfirm, setOpenConfirm] = useState(false);
    const  [confirmDialog, setConfirmDialog] = useState(<></>);

    const [dataList, setDataList] = useState([]);

    const {get, post, delete_, loading} = useFetch("http://localhost:5500/api/");

    useEffect(() => {
        let data_list = [];
        pets.forEach(element => {
            var element_array = [];
            for(var key in element){
                if(showKeys[key] !== undefined){
                    element_array.push( [showKeys[key], element[key]] )
                }
            }
            var element_dictionary = {"id": element.id, "name": element.namePet, "data": element_array}
            data_list.push(element_dictionary);
        });
        setDataList(data_list);

    }, [])

    function handleDeletePet(petId){
        delete_(`users/${userId}/pets/${petId}`)
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error))
    }

    function handleClickDeletePet(petId, petName){
        setOpenConfirm(true)
        setConfirmDialog(
            <ConfirmDialog 
                handleCancel={() => setOpenConfirm(false)} 
                handleAccept={() => handleClickDeletePet(petId)} 
                dialogMessage={`¿Seguro que desea borrar ${petName} de sus registros?`}
            />
        );
    }

    function handleEditPet(petId, pet){
        post(`users/${userId}/pets/${petId}`)
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error))
    }

    return ( 
        <div>
            <h1>{title}</h1>
            <Grid style={{paddingTop: "10px", paddingBottom: "30px"}}>
                <Grid container spacing={2} style={{ paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px" }}>
                    {
                        dataList.map((item) => {
                            let image = item.data.filter(element => element[0] === "image")[1] ?? defImage;
                            return (
                                <>
                                    <CardItem key={item.id} image={image} data={item.data}>
                                        <IconButtonEdit />
                                        <IconButtonDelete onClick={() => handleClickDeletePet(item.id, item.name)} />
                                    </CardItem>
                                </>
                            );
                        })
                    }
                </Grid>
            </Grid>
            {openConfirm && confirmDialog}
        </div>
    );
}

export default ListPetsCard;