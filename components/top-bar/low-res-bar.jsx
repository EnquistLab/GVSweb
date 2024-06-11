import { React, useState } from "react";

import {
  Menu,
  MenuItem,
  Link
} from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';

export default function LowResBar({ menuLinks }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <div>
      <MenuIcon
        size="large"
        aria-label="Menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
      </MenuIcon>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          menuLinks.map((item, k) =>
            <MenuItem key={k} component={Link} href={item.href}>{item.name}</MenuItem>
          )
        }
      </Menu>
    </div>
  );
}
