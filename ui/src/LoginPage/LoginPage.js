import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

export default function LoginPage() {
  const navigate = useNavigate();
  const username = useRef("");
  const password = useRef("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = () => {
    try {
      axios
        .post(
          `http://localhost:8080/login?username=${username.current.value}&password=${password.current.value}`,
          {},
          { withCredentials: true }
        )
        .then((response) => {
          navigate("/tickets");
        })
        .catch((error) => {
          //api error
          setErrorMessage(error.response.data);
        });
    } catch (err) {
      //application error
      console.log(err);
    }
  };

  return (
    <div>
      <Grid container sx={{ textAlign: "center" }}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="username"
            variant="outlined"
            inputRef={username}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="password"
            variant="outlined"
            type="password"
            inputRef={password}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={login}>
            LOGIN
          </Button>
        </Grid>
        <Typography variant="h4">{errorMessage}</Typography>
      </Grid>
    </div>
  );
}
