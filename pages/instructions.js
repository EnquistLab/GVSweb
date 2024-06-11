import React from "react";
import { Layout } from "../components";
import { Typography, List, ListItem, Link } from "@mui/material";

function InstructionsApp() {
  // Ensure that any data that might differ between server and client render is either handled consistently or moved inside a useEffect or similar hook
  return (
      <>
        <Layout>
          <Typography variant="h3" align="justify" display="block" gutterBottom>
            How To Use The NSR
          </Typography>

          <Typography variant="h5" gutterBottom align="justify">
            Data preparation
          </Typography>
          <List>
            <ListItem>
              <Typography component="div" variant="body1">
                Prior to submitting species occurrences to the NSR, we recommend you standardize the spellings of political division names using the <Link href='https://gnrs.biendata.org/' target="_blank">Geographic Name Resolution Service</Link>. The GNRS standardizes political division names according to the spelling conventions of <Link href='https://gadm.org/about.html' target="_blank">Global Administrative Divisions database (GADM)</Link>. The NSR also uses GADM names.<br/><br/>
                You may also want to verify and standardize your species names using the <Link href='https://tnrs.biendata.org' target="_blank">Taxonomic Name Resolution Service (TNRS)</Link>.
              </Typography>
            </ListItem>
          </List>

          <Typography variant="h5" gutterBottom align="justify">
            Using the NSR
          </Typography>
          <List>
            <ListItem>
              <Typography component="div" variant="body1">
                <strong>1. Enter species occurrences.</strong> For each species occurrence, enter the species name, the
                country of observation, plus (optionally) a state/province name and county/parish name. Enter one
                occurrence per line. All elements (species,country,state-province,county-parish) must be separated by
                commas. Species and country are required. State-province and county-parish are optional; however, you
                MUST include the commas even if the value itself is missing. If any political division name includes
                commas, then it must be surrounded by double quotes. You can submit up to 5000 observations at
                a time.<br/><br/>
                Note that genus or family names can also be used instead of a species. Although in most cases
                observations identified only to genus or family cannot be resolved by the NSR, in some cases they can,
                if the genus or family is endemic (restricted) to a particular checklist area. For example, the NSR
                would return a status of "Ne" (native and endemic) for an observation of Eucalyptus in Australia, and
                "Ie" (Introduced, endemic elsewhere) for an observation of Eucalyptus in Peru.<br/><br/>
                <div>
                  Eucalyptus,Peru,,<br/>
                  Eucalyptus,Australia,,<br/>
                  Pinus ponderosa,United States,,<br/>
                  Pinus ponderosa,United States,Arizona,<br/>
                  Pinus ponderosa,United States,Arizona,Pima<br/>
                  Grubbiaceae,South Africa,,<br/>
                  Grubbiaceae,Kenya,,
                </div>
              </Typography>
            </ListItem>
            <ListItem>
              <Typography component="div" variant="body1">
                <strong>2. Download results.</strong> Download your results by clicking on the "Download Data" control, selecting either a comma-delimited or tab-delimited file.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography component="div" variant="body1">
                <strong>3. Cite.</strong> Please cite the NSR and all NSR data sources used in any publication which includes political divisions names resolved using the NSR. See <Link href="/cite">Cite</Link> and <Link href="/sources">Sources</Link> for details.
              </Typography>
            </ListItem>
          </List>
        </Layout>
      </>
  );
}

export default InstructionsApp;
