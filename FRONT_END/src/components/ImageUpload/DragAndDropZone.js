import { Container } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import './DragAndDropZone.css';


function DragAndDropZone(props) {
    const {handleDropImage, images, loading} = props

    function imagePreview() {
        if(loading){
            return <h3>Loading...</h3>
        } else {
            return (<h3>
                {images.length <= 0 ? "No hay imagenes" : images.map((item) => (
                    <img 
                        alt="uploaded image" 
                        style={{width: "125px", height: "70px", backgroundSize: "cover", paddingRight: "15px"}}
                        src={item}
                    />
                ))}
            </h3>)
        }
    }

    return ( 
        <>
            <Container>
                <Dropzone
                    className='dropzone'
                    onDrop={handleDropImage}
                    value={images}
                >
                    {({getRootProps, getIntpuProps}) => (
                        <section>
                            <div {...getRootProps({className: 'dropzone'})}>
                                <span>🐶🐱🐹🐰</span>
                                <p>Arrastra y suelta tus imagenes aqui o haz click</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
                {imagePreview()}
            </Container>
        </>
    );
}

export default DragAndDropZone;