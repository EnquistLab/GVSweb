import { React, useState } from "react";

import {
  Box,
  Dialog,
  DialogTitle,
  Button,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";

// shows the dialog with details of each row
export default function DetailsDialog({ onClose, open, row }) {
  return (
      <Dialog open={open} maxWidth="lg">
        <DialogTitle>Record submitted: {row.Name_submitted}</DialogTitle>
        <Box m={4} mt={0}>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {Object.entries(row)
                    .filter(([key]) => key !== ("isCultivatedNSR"))
                    .filter(([key]) => key !== ("user_id"))
                    .map(([key, value], idx) => (
                        <TableRow key={idx}>
                          <TableCell>{key}</TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Dialog>
  );
}
