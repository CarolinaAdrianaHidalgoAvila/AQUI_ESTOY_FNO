import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import CardItem from './CardItem';
//Default image delete this when we had image controllers
import defImage from '../../Images/dog.jpg';

/*
    List of Cards Items to show an various items and his specifications

    recive the next props:
    {
        data: list of diferent objects that the list will show, the structure for the data is the next
        [
            {
                //The data body as normal
                id: 51235flsadfj2341,
                firstName: Jimmy,
                lastName: McGill,
                ...etc
            }
        ]
        showKeys: dictionary of the keys that we want to show in the list of cards along with their label, here is an example of the structure
        {
            firstName: "Name: ",
            lastName: "Last Name: ",
            ...etc
        }
        children: another kind of element you want to put on the cards.
        
        title: a simple title for the list of cards
    }
*/

function ListCards(props) {
    const {data, showKeys, title, children} = props;
    const [dataList, setDataList] = useState([]);


    useEffect(() => {
        let data_list = [];
        data.forEach(element => {
            var element_array = [];
            for(var key in element){
                if(showKeys[key] !== undefined){
                    element_array.push( [showKeys[key], element[key]] )
                }
            }
            data_list.push(element_array);
        });
        console.log(data_list);
        setDataList(data_list);

    }, [])

    return ( 
        <div>
            <h1>{title}</h1>
            <Grid style={{paddingTop: "10px", paddingBottom: "30px"}}>
                <Grid container spacing={2} style={{ paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px" }}>
                    {
                        dataList.map((item, key) => {
                            let image = item.filter(element => element[0] === "image")[1] ?? defImage;
                            return (
                                <CardItem key={key} image={image} data={item}>
                                    {children}
                                </CardItem>
                            );
                            
                        })
                    }
                </Grid>
            </Grid>
        </div>
    );
}

/*
    List of Cards Items to show an various items and his specifications with actions to every specific item

    recive the next props:
    {
        data: list of diferent objects that the list will show, the structure for the data is the next
        [
            {
                //The data body as normal
                id: 51235flsadfj2341,
                firstName: Jimmy,
                lastName: McGill,
                ...etc
            }
        ]
        showKeys: dictionary of the keys that we want to show in the list of cards along with their label, here is an example of the structure
        {
            firstName: "Name: ",
            lastName: "Last Name: ",
            ...etc
        }
        
        children: another kind of element you want to put on the cards.
        
        title: a simple title for the list of cards
    }
*/

function ListCardsActions(props) {
    const {data, showKeys, title, children} = props;
    const [dataList, setDataList] = useState([]);


    useEffect(() => {
        let data_list = [];
        data.forEach(element => {
            var element_array = [];
            for(var key in element){
                if(showKeys[key] !== undefined){
                    element_array.push( [showKeys[key], element[key]] )
                }
            }
            data_list.push(element_array);
        });
        console.log(data_list);
        setDataList(data_list);
        
    }, [])

    return ( 
        <div>
            <h1>{title}</h1>
            <Grid style={{paddingTop: "10px", paddingBottom: "30px"}}>
                <Grid container spacing={2} style={{ paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px" }}>
                    {
                        dataList.map((item, key) => {
                            let image = item.filter(element => element[0] === "image")[1] ?? defImage;
                            return (
                                <CardItem key={key} image={image} data={item}>
                                    {children}
                                </CardItem>
                            );
                            
                        })
                    }
                </Grid>
            </Grid>
        </div>
    );
}

export { ListCards, ListCardsActions };