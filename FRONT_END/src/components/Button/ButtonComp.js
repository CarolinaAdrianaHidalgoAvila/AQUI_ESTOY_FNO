import Button from '@mui/material/Button';

function ButtonComp(props) {
    const {children, ...rest} = props;

    const style = {
        marginLeft:1, 
        background:'#75cfb8'
    }
    
    return ( 
        <Button sx={style} variant='contained' {...rest}>{children}</Button>
    );
}

export default ButtonComp;