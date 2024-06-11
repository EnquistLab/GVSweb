import {
  Box,
  Popover,
  Typography,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";


export function DataDictionaryPopover({ field, description }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <div>
      <Box display='flex' alignItems='center' flexDirection='row'>
        <Box>
          {field}
        </Box>
        <Box>
          <HelpIcon
            style={{ width: 12, height: 12 }}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          />
        </Box>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        style={{ pointerEvents: "none", }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box m={2} maxWidth='300px'>
          <Typography>{description}</Typography>
        </Box>
      </Popover>
    </div>
  );
}
