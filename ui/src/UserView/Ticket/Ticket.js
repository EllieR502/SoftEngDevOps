import { useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import TicketModal from "../../Components/TicketModal";

export default function Ticket(props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Grid item xs={4}>
        <Card sx={{ minWidth: "455px" }} onClick={handleClick}>
          <CardContent>
            <Typography variant="h5" component="div">
              {props.ticket.ticketTitle}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {props.ticket.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <TicketModal
        isOpen={isOpen}
        handleClose={handleClose}
        ticketId={props.ticket.ticketID}
        getTicketFunction={props.getTicketFunction}
      />
    </div>
  );
}
