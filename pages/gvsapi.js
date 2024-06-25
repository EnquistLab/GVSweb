import React from "react";
import { Layout } from "../components";
import { Typography, Link } from "@mui/material";

function ApiApp() {
  return (
      <>
        <Layout>
          <Typography variant="h3" align="justify" display="block" gutterBottom>
            GVS Application Programming Interfaces
          </Typography>
          <div id="gvsapi">
            <Typography variant="h5" gutterBottom align="justify">
              GVS API
            </Typography>
            <Typography variant="body1" gutterBottom align="justify">
              The GVS web interface uses the{" "}
              <Link href="https://github.com/ojalaquellueva/gvs" target="_blank">
                GVS API
              </Link>{" "}
              to access the {" "}
              <Link href="https://github.com/ojalaquellueva/gvs/tree/master/db" target="_blank">
                GVS database
              </Link>{" "}
              and core application. GVS API functions handle all traffic between external
              applications and the GVS core application. The API can be used to process large batches of coordinates exceeding the current web interface limit of 5000 rows by looping through the data in batches of 5000. The GVS API can be used by third-party developers
              wishing to include GVS capabilities in their applications. For more information on the GVS API and detailed
              examples demonstrating how to access the API using the R programming language, see documentation in the{" "}
              <Link href="https://github.com/ojalaquellueva/gvs" target="_blank">
                GVS GitHub repository
              </Link>.
            </Typography>
            <br />
          </div>

          <div id="rgvs">
            <Typography variant="h5" gutterBottom align="justify">
              GVS R package
            </Typography>

            <Typography variant="body1" gutterBottom align="justify">
              Users who are familiar with the{" "}
              <Link href="https://www.r-project.org/" target="_blank">
                R programming language
              </Link>{" "}
              may prefer to access the GVS using the{" "}
              <Link href="https://github.com/EnquistLab/RGVS" target="_blank">
                GVS R package (currently called the RCDS)
              </Link>
              . All functionality available from the GVS API is also available via the GVS R package.
            </Typography>
            <br />
          </div>
        </Layout>
      </>
  );
}

export default ApiApp;
