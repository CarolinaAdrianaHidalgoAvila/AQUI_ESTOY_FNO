import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from '../Images/dog.jpg'

export default function MediaCard() {
  return (
    <Card sx={{ align: 'center' }}>
      <CardMedia xs= {2} md= {6}
        component="img"
        width="auto"
        height="600"
        image= {image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          ENCUENTRA A TU MASCOTA PERDIDA
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'center' }} >
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
