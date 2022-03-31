import React from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function SignUpPage() {
  const fullName = useRef("");
  const username = useRef("");
  const password = useRef("");
  const [selectedProject, setSelectedProject] = useState("");
  const [defaultFullName, setDefaultFullName] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    try {
      axios.get(`http://localhost:8080/projects`).then((response) => {
        setProjects(response.data);
        console.log(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const addUser = () => {
    console.log("hi");
    try {
      axios
        .post(
          `http://localhost:8080/user?fullName=${fullName.current.value}&project=${selectedProject}&username=${username.current.value}&password=${password.current.value}`
        )
        .then((response) => {
          console.log(response);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Grid container sx={{ textAlign: "center" }}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            id="username-input"
            sx={{ width: 200 }}
            inputRef={fullName}
            defaultValue={defaultFullName}
          />
        </Grid>
        <Grid item xs={12} marginTop="10px" marginLeft={"612px"}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="project">Project</InputLabel>
              <Select
                labelId="project"
                id="project"
                label="Project"
                sx={{ width: "200px" }}
                data={selectedProject}
                setData={setSelectedProject}
              >
                {projects.map((project) => {
                  return (
                    <MenuItem value={project.projectName}>
                      {project.projectName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} marginTop="10px">
          <TextField
            label="username"
            variant="outlined"
            id="username-input"
            sx={{ width: 200 }}
            inputRef={username}
          />
        </Grid>
        <Grid item xs={12} marginTop="10px">
          <TextField
            label="password"
            variant="outlined"
            id="username-input"
            type="password"
            sx={{ width: 200 }}
            inputRef={password}
          />
        </Grid>
        <Grid item xs={12} marginTop="10px">
          <Button variant="contained" onClick={addUser}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              SIGNUP
            </Link>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
