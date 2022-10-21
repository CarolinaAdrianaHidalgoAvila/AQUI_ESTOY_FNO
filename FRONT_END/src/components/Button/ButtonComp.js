import Button from '@mui/material/Button';

function ButtonComp(props) {
    const {children, ...rest} = props;

    const style = {
        margin:1, 
        background:'#BBDFC8'
    }
    
    return ( 
        <Button sx={style} variant='contained' {...rest}>{children}</Button>
    );
}

function ButtonAccept(props) {
    const {children, ...rest} = props;

    const style = {
        margin:1, 
        background:'#75CFB8'
    }
    
    return ( 
        <Button sx={style} variant='contained' {...rest}>{children}</Button>
    );
}

function ButtonDanger(props) {
    const {children, ...rest} = props;

    const style = {
        margin:1, 
        background:'#fa6464'
    }
    
    return ( 
        <Button sx={style} variant='contained' {...rest}>{children}</Button>
    );
}

function ButtonCheck(props) {
    const {children, ...rest} = props;

    const style = {
        margin:1, 
        background:'#5c7df7'
    }
    
    return ( 
        <Button sx={style} variant='contained' {...rest}>{children}</Button>
    );
}


export { ButtonComp, ButtonAccept, ButtonDanger, ButtonCheck };