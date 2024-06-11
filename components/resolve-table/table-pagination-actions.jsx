import { useState } from "react";

import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

import { Box, IconButton, TextField } from "@mui/material";

export function TablePaginationActions({
  count,
  page,
  rowsPerPage,
  onChangePage,
}) {
  const [inputPage, setInputPage] = useState(page + 1);

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
    setInputPage(1);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
    setInputPage(page);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
    setInputPage(page + 2);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    setInputPage(Math.max(0, Math.ceil(count / rowsPerPage)));
  };

  return <>
    <Box display="flex">
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        size="large">
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        size="large">
        <KeyboardArrowLeft />
      </IconButton>
    </Box>
    <Box width={150}>
      <TextField
        value={inputPage}
        onKeyDown={(e) => {
          // when the user presses enter key=13
          if (e.keyCode === 13) {
            let maxPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
            if (inputPage < 1) {
              onChangePage(e, 0);
              setInputPage(1);
            } else if (inputPage > maxPage) {
              onChangePage(e, maxPage);
              setInputPage(maxPage + 1);
            } else {
              onChangePage(e, inputPage - 1);
            }
          }
        }}
        onChange={(e) => setInputPage(e.target.value)}
        variant="outlined"
        size="small"
      />
    </Box>
    <Box display="flex">
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        size="large">
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        size="large">
        <LastPageIcon />
      </IconButton>
    </Box>
  </>;
}
