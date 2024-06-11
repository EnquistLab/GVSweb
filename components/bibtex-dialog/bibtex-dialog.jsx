import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from '@mui/material';


export function BibTexDialog({ displayText }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link href="#" onClick={handleClickOpen}>
        [bibtex]
      </Link>
      <Dialog maxWidth={"md"} fullWidth open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{"BibTeX entry"}</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={10}
            disabled
            fullWidth
            defaultValue={displayText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}
BibTexDialog.propTypes = {
  displayText: PropTypes.string
};
