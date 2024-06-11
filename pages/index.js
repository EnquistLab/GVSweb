import { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { resolveRecords } from "../actions/";

import {
  Layout,
  SearchBox,
  ResolveTable
} from "../components/";

export default function Index() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [resolvedRecords, setResolvedRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const showErrorMessage = (errorMessage) => {
    setErrorMessage(errorMessage);
    setIsProcessing(false);
  }

  // Format: latitude, longitude
  const handleResolveRecords = async (records) => {
    setResolvedRecords([]);
    setIsProcessing(true);

    let resolved = await resolveRecords(
        records,
        showErrorMessage,
        setIsProcessing
    );

    if (resolved) {
      setResolvedRecords(resolved);
    } else {
      setIsProcessing(false);
    }
  }

  return (
      <Layout>
        <SearchBox onSubmit={handleResolveRecords} isProcessing={isProcessing} />
        {errorMessage && (
            <Box pt={2}>
              <Paper color="primary" variant="outlined">
                <Box m={2}>
                  <Typography color="black">{errorMessage}</Typography>
                </Box>
              </Paper>
            </Box>
        )}
        <ResolveTable tableData={resolvedRecords} />
      </Layout>
  );
}
