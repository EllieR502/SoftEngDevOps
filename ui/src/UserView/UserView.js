import React from 'react';
import Ticket from './Ticket';
import Header from '../Header/Header';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function UserView() {
    return(
        <div>
            <Header />
                <Box>
                    <AppBar position="static">
                        <Toolbar sx={{ backgroundColor: "white" }}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black" }}>
                                PROJECT NAME
                            </Typography>
                            <Button variant="outlined">ADD NEW</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Grid container>
                    <Ticket />
                    <Ticket />
                    <Ticket />
                </Grid>
        </div>
    )
}