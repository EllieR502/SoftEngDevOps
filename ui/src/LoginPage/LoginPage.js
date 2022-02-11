import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

class LoginPage extends React.Component {
    render() {
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
                        <Button variant="contained">Login</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default LoginPage;