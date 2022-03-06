import { Button } from "@mui/material";
import { useState } from "react";
import TicketModal from "./TicketModal";

export default function AddTicketButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClick}>
        ADD NEW
      </Button>
      <TicketModal isOpen={isOpen} handleClose={handleClose} />
    </>
  );
}
