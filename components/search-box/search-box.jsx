import React, { useState, useCallback, useRef } from 'react';
import {
  Paper,
  TextField,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';

export function SearchBox({ onSubmit, isProcessing }) {
  const [names, setNames] = useState("");
  const fileInputRef = useRef();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsText = reader.result;
        setNames(fileAsText);
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true
  });

  const handleAddFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const predefinedRecords = `36.580435,-96.53331
39.80818224,-91.62289157
46,25
52.92755,4.7864
52.54731,-2.49544
-23.62,-65.43
-29.17865102,149.269218
-29.23147803,152.13519
51.81171,-3.8879
51.96732,-4.24382
46,25
52.92755,4.7864
0,0
abc,def
300,-118
100,-118
100,-200
60,200
-99,10
0.7489,-78.7534
0.7,-78.7
9.7489,-83.7534
9.7,-83.7
75.7489,-83.7534
75.7,-83.7
83.5453277,-34.461833
83.5,-34.4`;

  return (
      <Paper>
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height={1}
            {...getRootProps()}
        >
          <Box p={2}>
            <input {...getInputProps()} ref={fileInputRef} style={{ display: 'none' }} />
            <TextField
                rows={10}
                multiline
                fullWidth
                variant="outlined"
                label="Records to check."
                value={names}
                helperText="Enter up to 5000 records or drag and drop and drop CSV/TXT file"
                onChange={(e) => setNames(e.target.value)}
            />
          </Box>
          <Box
              p={2}
              pt={0}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
          >
            <Box>
              <Button
                  onClick={() => onSubmit(names)}
                  variant="contained"
                  color="primary"
              >
                Submit
              </Button>
              <Button
                  onClick={() => setNames("")}
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: 10 }}
              >
                Clear
              </Button>
              <Button
                  variant="contained"
                  onClick={handleAddFileClick}
                  style={{ marginLeft: 10 }}
              >
                Add File
              </Button>
            </Box>
            <Box>
              <Button
                  onClick={() => setNames(predefinedRecords)}
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: 700 }}
              >
                Try me!
              </Button>
            </Box>
            <Box>
              {isProcessing && <CircularProgress size={30} />}
            </Box>
          </Box>
        </Box>
      </Paper>
  );
}
