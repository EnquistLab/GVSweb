import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { requestChecklistCountries, } from "../../actions";

import {
  BibTexDialog
} from "../";

export function ChecklistsDialog({ onClose, open, checklistName, citations, checklistsInfo }) {
  let [checklistInfo, setChecklistInfo] = useState({});
  let [citation, setCitation] = useState(null)

  useEffect(() => {
    // get the information for the current checklist
    setChecklistInfo(checklistsInfo[checklistName])

    // get the citation that corresponts to checklistName
    const citation = citations.find(e => e.source === checklistName);
    setCitation(citation)

  }, [checklistName]); // hit the API everytime checklistName changes

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Checklist name: {checklistInfo?.source_name} </DialogTitle>
      <DialogContent dividers>
        <Typography variant='h5' gutterBottom>
          {checklistInfo?.checklist_details}
        </Typography>
        <Typography gutterBottom>
          Coutries: {checklistInfo?.countries?.split(',').join(', ')}
        </Typography>
        <Typography gutterBottom>
          Date accessed: {checklistInfo?.date_accessed}
        </Typography>
        {citation &&
          <div >
            <Typography variant='h6'>
              Citation
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: citation.formatted,
              }}
            ></div>
            <BibTexDialog displayText={citation.raw} />
            <br />
          </div>
        }
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ChecklistsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
