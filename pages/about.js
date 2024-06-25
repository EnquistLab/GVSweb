import React from "react";
import { Layout } from "../components/";
import { Typography, Link } from "@mui/material";

function About() {
    return (
        <Layout>
            <Typography variant="h3">About the GVS</Typography>
            <br />

            <Typography variant="body1" gutterBottom align="justify">
                <Link href="#what-is">What is the GVS?</Link>
                <br />
                <Link href="#development">Project Development</Link>
                <br />
                <Link href="#code">Source Code</Link>
                <br />
                <Link href="#funding">Funding</Link>
                <br />
            </Typography>
            <br />

            <div id="what-is">
                <Typography variant="h5" gutterBottom align="justify">
                    What is the GVS?
                </Typography>
                <Typography variant="body1" gutterBottom align="justify">
                    The Geocoordinate Validation Service (GVS) is a tool for the detection of errors in geographic coordinates.
                    In addition to basic checks (such as ensuring that the submitted coordinate points are valid decimal geocoordinates
                    and alerting users to points located in the ocean), the main purpose of the GVS is to detect and flag points which
                    are likely centroids of political divisions (such as countries or states) or geographic units (such as islands)—as
                    opposed to accurate geocoordinates such as those obtained from a GPS-enabled device. In biodiversity science,
                    georeferenced organismal observations based on centroids are generally too inaccurate to be useful for most types
                    of research, in particular species distribution modeling. It is therefore extremely important that such sources of
                    error be detected and excluded prior to analysis. The GVS detects three types of commonly-used centroids: the geometric
                    center of mass (using PostGIS function ST_Centroid), point-on-surface (ST_PointOnSurface), and bounding box (ST_Centroid
                    plus ST_Envelope).
                    <br/><br/>
                    In addition to basic error validation and centroid detection, the GVS also returns the country plus first- and second-level
                    administrative divisions (plus their GADM identifiers) in which each point is located. This information can be used as part
                    of an additional validation that checks if the declared political division (which typically accompanies biological observations
                    from herbarium and museum specimens) matches the actual political division in which the point is located (as detected by the GVS).
                    The GVS also calculates the inherent uncertainty due to the number of decimal places used in the verbatim coordinates.
                </Typography>
            </div>
            <br/>

            <div id="development">
                <Typography variant="h5" gutterBottom align="justify">
                    Project Development
                </Typography>
                <Typography variant="body1" align="justify">
                    The GVS was developed by the Botanical Information and Ecology Network (BIEN) as a data validation tool for the BIEN botanical observation database.
                    <br/>
                    <br/><strong>Project conception and direction</strong><br/>
                    Brad Boyle at <Link href="https://eeb.arizona.edu" target="_blank">University of Arizona</Link><br/>
                    Brian Maitner at <Link href="https://www.usf.edu" target="_blank">University of South Florida, St. Petersburg</Link><br/>
                    Dan Park at <Link href="https://www.purdue.edu" target="_blank">Purdue University</Link><br/>
                    Brian Enquist at <Link href="https://eeb.arizona.edu" target="_blank">University of Arizona</Link><br/>
                    <br/>
                    <strong>Application development & Source</strong><br/>
                    Brad Boyle: <Link href="https://github.com/ojalaquellueva/gvs" target="_blank">GVS database, search engine, and API.</Link><br/>
                    Brian Maitner: <Link href="https://github.com/EnquistLab/RCDS" target="_blank">RCDS R package.</Link><br/>
                    Rethvick Sriram Yugendra Babu: <Link href="https://github.com/EnquistLab/GVSweb" target="_blank">GVSweb React/Node.js user interface.</Link>
                </Typography>
                <br />
            </div>

            <div id="code">
                <Typography variant="h5" gutterBottom align="justify">
                    Source Code
                </Typography>
                <Typography variant="body1" gutterBottom align="justify">
                    Source code for all GVS components is publicly available from the following repositories:<br/><br/>
                    GVS Search Engine, Database, and API: <Link href="https://github.com/ojalaquellueva/gvs" target="_blank">https://github.com/ojalaquellueva/gvs</Link><br/>
                    RCDS R package: <Link href="https://github.com/EnquistLab/RCDS" target="_blank">https://github.com/EnquistLab/RCDS</Link><br/>
                    GVS web user interface: <Link href="https://github.com/EnquistLab/GVSweb" target="_blank">https://github.com/EnquistLab/GVSweb</Link>
                </Typography>
            </div>

            <div id="funding">
                <Typography variant="h5" gutterBottom align="justify">
                    Funding
                </Typography>
                <Typography variant="body1" align="justify">
                    Funding provided by the National Science Foundation Harnessing the Data Revolution Grant HDR 1934790 to Brian J. Enquist. Ongoing support from the
                    National Center for Ecological Analysis and Synthesis (NCEAS) at University of California, Santa Barbara.
                </Typography>
            </div>
        </Layout>
    );
}

export default About;
