import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function IconButtonAccept(props) {
    const {...rest} = props
    return ( 
        <IconButton aria-label="icon-button-accept" color='success' {...rest}>
            <CheckIcon />
        </IconButton>
    );
}

function IconButtonReject(props) {
    const {...rest} = props
    return ( 
        <IconButton aria-label="icon-button-accept" color='error' {...rest}>
            <CloseIcon />
        </IconButton>
    );
}

function IconButtonEdit(props) {
    const {...rest} = props
    return ( 
        <IconButton aria-label="icon-button-accept" color='info' {...rest}>
            <EditIcon />
        </IconButton>
    );
}


function IconButtonDelete(props) {
    const {...rest} = props
    return ( 
        <IconButton aria-label="icon-button-accept" color='error' {...rest}>
            <DeleteIcon />
        </IconButton>
    );
}

function IconButtonView(props){
    const {...rest} = props
    return ( 
        <IconButton aria-label="icon-button-accept" color='success' {...rest}>
            <PreviewIcon />
        </IconButton>
    ); 
}

function IconButtonLike(props){
    const {...rest} = props
    return ( 
        <IconButton aria-label="icon-button-like" {...rest}>
            <ThumbUpIcon />
        </IconButton>
    ); 
}

function IconButtonComment(props){
    const {...rest} = props
    return ( 
        <IconButton aria-label="icon-button-comment" {...rest}>
            <AddCommentIcon />
        </IconButton>
    ); 
}

function IconButtonShare(props){
    const {...rest} = props
    return ( 
        <IconButton aria-label="icon-button-share"  {...rest}>
            <ShareIcon />
        </IconButton>
    ); 
}


function IconButtonMoreVert(props){
    const {...rest} = props
    return ( 
        <IconButton aria-label="icon-button-share"  {...rest}>
            <MoreVertIcon />
        </IconButton>
    ); 
}



export { IconButtonAccept, IconButtonReject, IconButtonEdit, IconButtonDelete, IconButtonView, IconButtonLike, IconButtonComment, IconButtonShare, IconButtonMoreVert };