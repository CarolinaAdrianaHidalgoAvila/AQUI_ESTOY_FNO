import React, { useState, useEffect } from 'react';
import { IconButtonEdit, IconButtonDelete,IconButtonView } from '../Button/LittleButtons';
import { NewPetForm, EditPetForm } from '../Form/PetForm';
import ConfirmDialog from '../Dialogs/ConfirmDialog';
import defImage from '../../Images/dog.jpg';
import CardItem from './CardItem';

import { Grid } from '@mui/material';

import useFetch from '../../hooks/useFetch';
import { NewPublicationForm } from '../Form/PublicationForm';


function ListPetsCard(props) {
    const { userId, publications, showKeys, title, children } = props;
    const [dataList, setDataList] = useState([]);

    const {get, post, delete_, loading} = useFetch("http://localhost:5500/api/");

    useEffect(() => {
        let data_list = [];
        publications.forEach(element => {
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
                                        
                                    </CardItem>
                                </>
                            );
                        })
                    }
                    
                </Grid>
            </Grid>
            <NewPublicationForm userId={userId} />
        </div>
    );
}

export default ListPetsCard;