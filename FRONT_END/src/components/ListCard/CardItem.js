import React, { useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions } from '@mui/material';



/*
    Card item to show an item and his specifications

    recive the next props:
    {
        key: a number that is used to identify the id of card
        image: image of the item, if there is no image, leave this field empty
        data: data list that the card must display, the form of the list is:
        [
            ["label", data],
        ]
        children: another kind of element you want to put on the cards, like buttons.
    }
*/

function CardItem(props) {
    const {key, image, data, children} = props;

    useEffect(() => {
        console.log(data);
    }, [])

    return ( 
        <>
        <Grid item xs={3} key={key}>
            <Card>
            {image !== undefined && <CardMedia image={image} style={{ width: "250px", height: "300px", margin: "auto" }} />}
                <CardContent>
                    {
                        data.map((item) => {
                            return (<Typography><b>{item[0]}</b> {item[1]}</Typography>);
                        })
                    }
                </CardContent>
                <CardActions>
                    {children}
                </CardActions>
            </Card>
        </Grid>
        </>
    );
}

export default CardItem;