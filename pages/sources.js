import { Layout } from "../components";
import { useState, useEffect, React } from "react";

import { requestSources } from "../actions/";

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Divider,
  Hidden,
  Link,
} from "@mui/material";

const apiServer = process.env.apiServer;

function SourcesApp() {

  let [sourcesState, setSourcesState] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let sources = await requestSources();
      setSourcesState(sources);
    }
    fetchData();
  }, []);


  return <>
    <Layout>
      <Typography variant="h3" align="justify" display="block" gutterBottom>
        Sources
      </Typography>

      <div id="currentsources">
        <Typography variant="h5" gutterBottom align="justify">
          Geographic data providers
        </Typography>
        <Typography variant="body2" gutterBottom align="justify">
          {/* TODO: dynamic numbering here */}
          The GVS the following sources of geographic and political division
          names:
        </Typography>

        <List>
          {sourcesState.map((s, k) => (
              <div key={k}>
                <ListItem>
                  <Hidden xlDown>
                    <ListItemIcon>
                      <div>
                        {/* FIXME: make this fit a small screen */}
                        <img
                            style={{ objectFit: "none" }}
                            height="200"
                            width="200"
                            src={apiServer + s.logo_path}
                        />
                      </div>
                    </ListItemIcon>
                  </Hidden>
                  <ListItemText>
                    <Typography gutterBottom variant="h6" component="h2">
                      {s.source_name_full} - {s.source_name.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {s.description} <br />
                      <br />
                      Date Accessed: {s.date_accessed}
                    </Typography>
                    <br />
                    <Box>
                      {/*<Link href={s.data_url} size="small" color="primary">*/}
                      {/*  Data*/}
                      {/*</Link>{" "}*/}
                      {/*&nbsp;&nbsp;*/}
                      <Link href={s.source_url} size="small" color="primary" target="_blank" rel="noopener noreferrer">
                        Learn More
                      </Link>
                    </Box>
                  </ListItemText>
                </ListItem>
              </div>
          ))}
        </List>
      </div>
    </Layout>
  </>;
}


export default SourcesApp;
