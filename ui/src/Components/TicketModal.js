import * as React from "react";
import { useRef, useState, useEffect } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import StandardSelect from "../Components/StandardSelect";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function TicketModal({
  isOpen,
  handleClose,
  ticketId,
  getTicketFunction,
}) {
  const ticketTitle = useRef("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("");
  const description = useRef("");
  const [defaultTicketTitle, setDefaultTicketTitle] = useState("");
  const [defaultDescription, setDefaultDescription] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (ticketId) {
      try {
        axios
          .get(`http://localhost:8080/ticket?ticketId=${ticketId}`)
          .then((response) => {
            setAssignee(response.data.assignee);
            setStatus(response.data.status);
            setDefaultTicketTitle(response.data.ticketTitle);
            setDefaultDescription(response.data.description);
          });
      } catch (err) {
        console.log(err);
      }
    }
    try {
      axios.get(`http://localhost:8080/users`).then((response) => {
        setUsers(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const addTicket = () => {
    try {
      axios
        .post(
          `http://localhost:8080/ticket?ticketTitle=${ticketTitle.current.value}&assignee=${assignee}&status=${status}&description=${description.current.value}`
        )
        .then((response) => {
          console.log(response);
        });
      getTicketFunction();
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  const deleteTicket = () => {
    try {
      axios
        .delete(`http://localhost:8080/ticket?ticketID=${ticketId}`)
        .then((response) => {
          console.log(response);
        });

      getTicketFunction();
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <BootstrapDialogTitle
        sx={{ marginBottom: 1 }}
        id="customized-dialog-title"
        onClose={handleClose}
      >
        <TextField
          id="title-input"
          label="Ticket Title"
          variant="standard"
          sx={{ width: 450 }}
          inputRef={ticketTitle}
          defaultValue={defaultTicketTitle}
        />
      </BootstrapDialogTitle>
      <Grid sx={{ marginLeft: 2, marginBottom: 1 }} container>
        <Grid item>
          <StandardSelect
            label="Assignee"
            data={assignee}
            setData={setAssignee}
            selectOptions={users.map((user) => user.fullName)}
          />
        </Grid>
        <Grid item>
          <StandardSelect
            label="Status"
            selectOptions={["To Do", "In Progress", "Done"]}
            data={status}
            setData={setStatus}
          />
        </Grid>
      </Grid>
      <DialogContent sx={{ minWidth: "500px", minHeight: 300 }} dividers>
        <Typography gutterBottom>
          <TextField
            id="ticket-description"
            label="Ticket Description"
            variant="outlined"
            multiline
            rows={12}
            sx={{ width: "500px" }}
            inputRef={description}
            defaultValue={defaultDescription}
          />
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={addTicket}>
          ADD
        </Button>
        <Button autoFocus onClick={deleteTicket}>
          DELETE
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
