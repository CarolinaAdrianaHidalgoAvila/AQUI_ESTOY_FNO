import React from 'react';

import { Grid, Box } from "@mui/material";

function NewPublication(props) {
    const {header, children, footer} = props;

    return ( 
        <>
            <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
                <Grid container>
                    <Grid item sx={{ paddingRight: "1rem" }}>
                        {header}
                    </Grid>
                    <Grid item flexGrow="1">
                        <Box padding=".5rem 0">
                            {children}
                        </Box>
                        <Box
                            textAlign="right"
                            paddingBottom=".5rem"
                            paddingTop=".5rem"
                            borderTop="1px solid #ccc"
                        >
                            {footer}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

function Publication(props) {
    const {header, children, footer} = props;

    return ( 
        <>
            <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
                <Grid container sx={{ display: "flex",  flexDirection: "column"}}>
                    <Grid item sx={{ paddingRight: "1rem" }}>
                        {header}
                    </Grid>
                    <Grid item flexGrow="1">
                        <Box padding=".5rem 0">
                            {children}
                        </Box>
                        <Box
                            textAlign="right"
                            paddingBottom=".5rem"
                            paddingTop=".5rem"
                            borderTop="1px solid #ccc"
                        >
                            {footer}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export { NewPublication, Publication };