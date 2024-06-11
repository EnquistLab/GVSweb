import { useState, useEffect, React } from "react";
import { requestMeta } from "../../actions";

import LowResBar from "./low-res-bar";

import GrassIcon from '@mui/icons-material/Grass';

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
} from "@mui/material";

import { ContainerLG } from "../";

export function TopBar() {
  const menuLinks = [
    { href: '/', name: 'Home' },
    { href: '/map', name: 'Map' },
    { href: '/about', name: 'About' },
    { href: '/instructions', name: 'Instructions' },
    { href: '/nsrapi', name: 'API' },
    { href: '/sources', name: 'Sources' },
    { href: '/cite', name: 'Cite' },
    { href: '/data_dictionary', name: 'Data Dictionary' },
  ]

  // API version
  const [apiVersion, setApiVersion] = useState("");
  useEffect(() => {
    let metaPromise = requestMeta();
    metaPromise.then((meta) => {
      console.log(meta[0]);
      let codeVersion = meta[0].code_version;
      setApiVersion(codeVersion);
    });
  }, []);

  return (
      <AppBar position="static">
        <ContainerLG>
          <Toolbar>
            <Box mr={2}>
              <img href="/" height="40" src="/favicon.ico"/>
              {/*<GrassIcon />*/}
            </Box>

            <Link href="/" color="inherit" variant="h6" sx={{ pr: 2 }} underline="none">
              GVS
            </Link>

            <Box sx={{ flexGrow: 1 }}></Box>

            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
              <Typography variant="caption" >
                Geocoordinate Validation Service {apiVersion}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}></Box>

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              {menuLinks.map((item, k) =>
                  <Button key={k} color="inherit" href={item.href}>{item.name}</Button>
              )}
            </Box>

            <Box sx={{ display: { sm: 'block', md: 'none' } }}>
              <LowResBar menuLinks={menuLinks} />
            </Box>
          </Toolbar>
        </ContainerLG>
      </AppBar >
  );
}
