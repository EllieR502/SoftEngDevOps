import React, { useEffect, useState } from "react";
import Ticket from "./Ticket/Ticket";
import Header from "../Header/Header";
import { Grid, AppBar, Box, Toolbar, Typography } from "@mui/material";
import AddTicketButton from "../Components/AddTicketButton";

const axios = require("axios").default;

export default function UserView() {
  const [tickets, setTickets] = useState();

  useEffect(() => {
    getAllTickets();
    axios.post("http://localhost:8080/project?project=1").then((response) => {
      localStorage.setItem("projectName", response.data);
    });
  }, []);

  const getAllTickets = () => {
    axios.get("http://localhost:8080/tickets").then((response) => {
      setTickets(response.data);
    });
  };

  return (
    <div>
      <Header />
      <Box>
        <AppBar elevation={0} position="static">
          <Toolbar sx={{ backgroundColor: "white" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "black" }}
            >
              {localStorage.getItem("projectName") || "no project"}
            </Typography>
            <AddTicketButton />
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container spacing={2} sx={{ px: "1.5em" }}>
        <Grid item xs={4}>
          <Typography variant="h6">To Do</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">In Progress</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Done</Typography>
        </Grid>
        <Grid item xs={4}>
          {tickets &&
            tickets.map((ticket) => {
              if (ticket.status === "To Do") {
                return (
                  <Ticket
                    key={ticket.ticketID}
                    ticket={ticket}
                    getTicketFunction={getAllTickets}
                  />
                );
              }
            })}
        </Grid>
        <Grid item xs={4}>
          {tickets &&
            tickets.map((ticket) => {
              if (ticket.status === "In Progress") {
                return (
                  <Ticket
                    key={ticket.ticketID}
                    ticket={ticket}
                    getTicketFunction={getAllTickets}
                  />
                );
              }
            })}
        </Grid>
        <Grid item xs={4}>
          {tickets &&
            tickets.map((ticket) => {
              if (ticket.status === "Done") {
                return (
                  <Ticket
                    key={ticket.ticketId}
                    ticket={ticket}
                    getTicketFunction={getAllTickets}
                  />
                );
              }
            })}
        </Grid>
      </Grid>
    </div>
  );
}
