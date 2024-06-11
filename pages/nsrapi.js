import React from "react";
import { Layout } from "../components";
import { Typography, Link } from "@mui/material";

function ApiApp() {
  return (
      <>
        <Layout>
          <Typography variant="h3" align="justify" display="block" gutterBottom>
            NSR Application Programming Interfaces
          </Typography>
          <div id="nsrapi">
            <Typography variant="h5" gutterBottom align="justify">
              NSR API
            </Typography>
            <Typography variant="body1" gutterBottom align="justify">
              The NSR web interface uses the{" "}
              <Link href="https://github.com/ojalaquellueva/nsr" target="_blank">
                NSR API
              </Link>{" "}
              to access the {" "}
              <Link href="https://github.com/ojalaquellueva/nsr/tree/master/db" target="_blank">
                NSR database
              </Link>{" "}
              and{" "}
              <Link href="https://github.com/ojalaquellueva/nsr" target="_blank">
                search engine
              </Link>
              . The NSR API functions handle all traffic between external
              applications and the NSR search engine. The API can be
              used to process very large batches of species observations by
              looping through observations in batches of 5000. The NSR API can be used by third-party developers
              wishing to include NSR content and search capabilities in their
              applications. For more information on the NSR API and detailed
              instructions and examples of how to access the API in the R programming language, see documentation on the{" "}
              <Link href="https://github.com/ojalaquellueva/nsr" target="_blank">
                NSR GitHub repository
              </Link>.
            </Typography>
            <br />
          </div>

          <div id="rnsr">
            <Typography variant="h5" gutterBottom align="justify">
              NSR R package
            </Typography>

            <Typography variant="body1" gutterBottom align="justify">
              Users who are familiar with the{" "}
              <Link href="https://www.r-project.org/" target="_blank">
                R programming language
              </Link>{" "}
              may prefer to access the NSR using the{" "}
              <Link href="https://github.com/EnquistLab/RNSR" target="_blank">
                RNSR R package
              </Link>
              . All options available from the NSR API are also available via the R package.
            </Typography>
            <br />
          </div>
        </Layout>
      </>
  );
}

export default ApiApp;
