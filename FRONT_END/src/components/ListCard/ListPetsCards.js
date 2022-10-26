import React, { useState, useEffect } from 'react';
import PreviewIcon from '@mui/icons-material/Preview';
import { ListCards } from './ListCards';
import { IconButtonEdit, IconButtonDelete,IconButtonView } from '../Button/LittleButtons';
import { NewPetForm, EditPetForm } from '../Form/PetForm';
import ConfirmDialog from '../Dialogs/ConfirmDialog';
import defImage from '../../Images/dog.jpg';
import CardItem from './CardItem';

import { Grid } from '@mui/material';

import useFetch from '../../hooks/useFetch';
import ShowOnePet from '../../pages/ShowOnePet';


function ListPetsCard(props) {
    const { userId, pets, showKeys, title, children } = props;

    const  [openConfirm, setOpenConfirm] = useState(false);
    const  [confirmDialog, setConfirmDialog] = useState(<></>);
    const  [openView, setOpenView] = useState(false);

    const [showOnePet, setShowPet] = useState(<></>);

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
            var element_dictionary = {"json": element, "data": element_array}
            data_list.push(element_dictionary);
        });
        setDataList(data_list);

    }, [])

    function handleDeletePet(petId){
        delete_(`users/${userId}/pets/${petId}`)
        .then(data => {
            console.log(data);
            alert("Mascota borrada!");

        })
        .catch(error => alert(error))
        .finally(() =>{
            window.location.href = "/user";
            setOpenConfirm(false);
        })
    }

    function handleClickDeletePet(petId, petName){
        setOpenConfirm(true)
        setConfirmDialog(
            <ConfirmDialog 
                handleCancel={() => setOpenConfirm(false)} 
                handleAccept={() => handleDeletePet(petId)} 
                dialogMessage={`¿Seguro que desea borrar ${petName} de sus registros?`}
            />
        );
    }

    function handleViewPet(key,image,data,pet){
        setOpenView(true)
        setShowPet(
            <ShowOnePet
                Key={key}
                Image= {image}
                Data= {data}
                Pet= {pet}
                handleCancel={() => setOpenView(false)}
            />
            
        );
         
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
                                    <CardItem key={item.json.id} image={image} data={item.data}>
                                        <IconButtonView onClick={() =>  handleViewPet(item.json.id, image,item.data, item.json)}/>
                                        <EditPetForm userId={userId} petId={item.json.id} pet={item.json} />
                                        <IconButtonDelete onClick={() => handleClickDeletePet(item.json.id, item.json.petName)} />
                                    </CardItem>
                                </>
                            );
                        })
                    }
                    
                </Grid>
            </Grid>
            {openView && showOnePet}
            {openConfirm && confirmDialog}
            <NewPetForm userId={userId} />
        </div>
    );
}

export default ListPetsCard;