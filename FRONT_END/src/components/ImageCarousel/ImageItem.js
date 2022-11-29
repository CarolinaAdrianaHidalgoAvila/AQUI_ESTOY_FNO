import React from 'react';
import { Paper, Button } from '@mui/material';

function ImageItem(props)
{
    const {imageUrl, alt, sx} = props

    return (
        <Paper>
            <img
                src={imageUrl}
                alt={alt}
                style={sx}
            />
        </Paper>
    )
}

export default ImageItem;