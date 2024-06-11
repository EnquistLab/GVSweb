import React from "react";
import { Typography, Box, Grid, Chip, Divider } from "@mui/material";
import { ContainerLG } from "../";

function NSRFooter() {
  return <>
    <Box mt={4} />
    <Grid container direction="row" justifyContent="center" alignItems="flex-start">
      <Grid item xs={12} md={5}>
        <Box display="flex" justifyContent="center">
          <Box
            pb={4}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Box display="flex" alignItems="left">
              <img src="/favicon.ico" height="80"></img>
              <Box>
                <Typography variant="h3">GVS</Typography>
                <Typography variant="h6">
                  Geocoordinate Validation Service
                </Typography>
              </Box>
            </Box>
            <Box mt={1}>
              An online tool for the detection of introduced species occurrences.
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={5}>
        <Grid container spacing={1} alignItems="center">
          <Grid xs={4} item>
            <Box display="flex">
              <Box flexGrow={1}></Box>
              <Box>
                <img src="/bien.png" height="35"></img>
              </Box>
            </Box>
          </Grid>
          <Grid xs={8} item>
            The Botanical Information and Ecology Network
          </Grid>
          <Grid xs={4} item>
            <Box display="flex">
              <Box flexGrow={1}></Box>
              <Box>
                <img src="/uoa.png" height="50"></img>
              </Box>
            </Box>
          </Grid>
          <Grid xs={8} item>
            The University of Arizona
          </Grid>
          <Grid xs={4} item>
            <Box display="flex">
              <Box flexGrow={1}></Box>
              <Box>
                <img src="/nsf.png" height="50"></img>
              </Box>
            </Box>
          </Grid>
          <Grid xs={8} item>
            National Science Foundation
          </Grid>
          <Grid xs={4} item>
            <Box display="flex">
              <Box flexGrow={1}></Box>
              <Box>
                <img src="/globe.png" height="50"></img>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            GeoNames
          </Grid>
          <Grid item xs={4}>
            <Box display="flex">
              <Box flexGrow={1}></Box>
              <Box>
                <img src="/lines.png" height="50"></img>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            GADM
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </>;
}

export function Footer() {
  return (
    <footer>
      <Box py={4}>
        <ContainerLG>
          <Divider textAlign="right">
            {/*<Chip label="bien" />*/}
          </Divider>
          <NSRFooter />
        </ContainerLG>
      </Box>
    </footer>
  );
}
