import { Container } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import './DragAndDropZone.css';


function DragAndDropZone(props) {
    const {uploadPreset} = props

    const [image, setImage] = useState({array: []})
    const [loading, setLoading] = useState(false);

    function imagePreview() {
        if(loading){
            return <h3>Loading...</h3>
        } else {
            return (<h3>
                {image.array.length <= 0 ? "No hay imagenes" : image.array.map((item) => (
                    <img 
                        alt="uploaded image" 
                        style={{width: "125px", height: "70px", backgroundSize: "cover", paddingRight: "15px"}}
                        src={item}
                    />
                ))}
            </h3>)
        }
    }

    function handleDropImage(files){
        const uploaders = files.map((file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", 'codeinfuse, medium, gist');
            formData.append('upload_preset', uploadPreset);
            formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY)
            formData.append('timestamp', (Date.now() / 1000) | 0)
            setLoading(true);
            return axios.post(process.env.REACT_APP_CLOUDINARY_API_URL + "image/upload", formData, {
                headers: {'X-Requested-With': 'XMLHttpRequest'},
            })
            .then((response) => {
                var data = response.data;
                console.log(data);
                const imageurl = data.secure_url
                console.log(imageurl);
                var specificArrayInObject = image.array;
                specificArrayInObject.push(imageurl);
                const newObject = {...image, specificArrayInObject};
                setImage(newObject);
                console.log(image);
            })
        })
        axios.all(uploaders).then(() => {
            setLoading(false);
        })
    }

    return ( 
        <>
            <Container>
                <Dropzone
                    className='dropzone'
                    onDrop={handleDropImage}
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
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