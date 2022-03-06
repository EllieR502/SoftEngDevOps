import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom';

export default function LoginPage() {
    return(
        <div>
            <Grid container sx={{textAlign: "center"}}>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="username" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="password" variant="outlined" type="password" />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained"><Link style={{textDecoration: "none", color: "white"}} to="/">LOGIN</Link></Button>
                </Grid>
            </Grid>
        </div>
    )
}