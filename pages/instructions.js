import React from "react";
import { Layout } from "../components";
import { Typography, List, ListItem, Link } from "@mui/material";

function InstructionsApp() {
  return (
      <>
        <Layout>
          <Typography variant="h3" align="justify" display="block" gutterBottom>
            How To Use The GVS
          </Typography>

          <Typography variant="h5" gutterBottom align="justify">
            Data preparation
          </Typography>
          <List>
            <ListItem>
              <Typography component="div" variant="body1">
                <strong>1. Enter one or more pairs of decimal geocoordinates.</strong> Coordinates must be in decimal
                format with latitude and longitude separated by a comma, latitude listed first. Enter one pair of
                coordinates per line. You can submit up to 5000 sets of geocoordinates at a time. You can also upload
                properly formatted geocoordinates from a text file using the <Link href='#' target="_blank">"ADD
                FILE"</Link> button or press the <Link href='#' target="_blank">"TRY ME!"</Link> button to paste in some
                test data.
              </Typography>
            </ListItem>
            <img src="/dataentryexample.png" style={{maxWidth: '50%', height: 'auto'}} alt="Data Entry Example"/>
            <br/>
            <ListItem>
              <Typography component="div" variant="body1">
                <strong>2. Submit your data.</strong> Press the <Link href='#' target="_blank">"SUBMIT"</Link> button to
                process your data.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography component="div" variant="body1">
                <strong>3. Inspect your results.</strong> Results are displayed immediately below the input data on a
                map and in table format. All resolvable coordinates are displayed on the map. Points with possible
                errors are colored red, and points without errors are green. Clicking on the <Link href='#'
                                                                                                   target="_blank">"Details"</Link> hyperlink
                for a single point displays the complete set of results fields for that point. If you are uncertain
                about the meaning of any of the results fields, please consult the <Link href='#' target="_blank">GVS
                Data Dictionary</Link>.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography component="div" variant="body1">
                <strong>4. Download your results.</strong> You can download your results as either a comma-delimited
                (CSV) or tab-delimited (TSV) text file.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography component="div" variant="body1">
                <strong>5. Cite.</strong> Please cite the GVS in any publication which includes geospatial data with
                coordinates resolved using the GVS. See <Link href='/cite'>Cite</Link> for details.
              </Typography>
            </ListItem>
          </List>
        </Layout>
      </>
  );
}

export default InstructionsApp;
