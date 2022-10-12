
import React from 'react'
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material'
import image from '../../Images/dog.jpg'

export default class ShowPets extends React.Component {

  state = {
    loading: true,
    pet: [],
  }

  async componentDidMount() {
    const url = "http://localhost:5500/api/users/6335dba37c28ccc604586936/pets"
    const response = await fetch(url)
    const data = await response.json()
    this.setState({pet: data})  
  }
    

  render() {
    return (
      <div>
        <h1>Pets</h1>

    
            <Grid >
            <Grid container spacing={2} style={{ paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px" }}>
                      {this.state.pet.map((item, key) => {
                      
                          return (
                            <Grid item xs={3} key={key}>
                              <Card>
                                <CardMedia image={image} style={{ width: "250px", height: "300px", margin: "auto" }} />
                                <CardContent>
                                  <Typography><b>{item.namePet}</b></Typography>
                                  <Typography><b>Cumpleaños:</b> {item.birthDate}</Typography>
                                  <Typography><b>Genero:</b> {item.gender}</Typography>
                                  <Typography><b>Tiene Especie:</b> {item.specie}</Typography>

                                </CardContent>
                              </Card>
                            </Grid>
                          )
                      })}
                
            </Grid>
          </Grid>
       
      </div>
    )
  }
}
