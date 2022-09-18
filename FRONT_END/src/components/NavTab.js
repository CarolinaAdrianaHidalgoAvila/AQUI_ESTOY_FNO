import React, { useState, useEffect } from 'react';
import { Tabs } from '@mui/material';
import LinkTab from "./LinkTab";

function NavTab(props) {
    const { options, onChange, value, ...rest } = props;


    useEffect(() => {
        console.log(value);
    }, [value]);

    return (
        <Tabs value={value} onChange={onChange} aria-label="nav-tabs-profile">
            {options && options.map(option => { return <LinkTab label={option} /> })}
        </Tabs>
    )
}

export default NavTab;