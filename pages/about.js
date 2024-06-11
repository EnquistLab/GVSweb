import React from "react";
import { Layout } from "../components/";
import { Typography, Link } from "@mui/material";

function About() {
    return (
        <Layout>
            <Typography variant="h3">About the NSR</Typography>
            <br />

            <Typography variant="body1" gutterBottom align="justify">
                <Link href="#what-is">What is the NSR?</Link>
                <br />
                <Link href="#development">Project development</Link>
                <br />
                <Link href="#code">Source code</Link>
                <br />
                <Link href="#funding">Funding</Link>
                <br />
            </Typography>
            <br />

            <div id="what-is">
                <Typography variant="h5" gutterBottom align="justify">
                    What is the NSR?
                </Typography>
                <Typography variant="body1" gutterBottom align="justify">
                    The Native Species Resolver (NSR) is a tool for the detection of introduced
                    (non-native) plant species occurrences. A species occurrence is an observation
                    of a species at a particular location. Currently, the NSR checks native status
                    within political divisions, at up to three levels: country (admin0), state/province
                    (admin1), and county/parish (admin2). These checks are performed by looking up
                    the species in country, state, and county plant species checklists. Currently
                    available checklists consulted by the NSR are displayed on our
                    <Link href="/map" target="_blank"> map page </Link>
                    ; lists of the checklists available in each country are displayed by clicking
                    on the country, and details of each checklist can be seen by clicking on an
                    individual checklist in the popup.
                    <br/><br/>
                    Results returned by the NSR include the species
                    name and political division submitted, a native status code, and explanation for
                    why that code was assigned, and the checklist sources consulted. Additional
                    information is displayed by clicking on the Details hyperlink. For more details on
                    each field returned by the NSR, see our
                    <Link href="/data_dictionary" target="_blank"> NSR Data Dictionary</Link>.
                </Typography>
            </div>
            <br/>

            <div id="development">
                <Typography variant="h5" gutterBottom align="justify">
                    Project development
                </Typography>
                <Typography variant="body1" align="justify">
                    The NSR was developed by the Botanical Information and Ecology Network (BIEN)
                    as a data validation tool for the BIEN botanical observation database.
                    <br/>
                    <br/><strong>Project conception and direction</strong><br/>
                    Brad Boyle at <Link href="https://eeb.arizona.edu" target="_blank">University of Arizona</Link><br/>
                    Brian Enquist at <Link href="https://eeb.arizona.edu" target="_blank">University of Arizona</Link><br/>
                    <br/>
                    <strong>Application development</strong><br/>
                    Brad Boyle: <Link href="https://github.com/EnquistLab/NSRweb" target="_blank">NSR database, search engine and api.</Link><br/>
                    Brian Maitner: <Link href="https://github.com/EnquistLab/NSRweb" target="_blank">RNSR R package.</Link><br/>
                    George C. Barbosa: <Link href="https://github.com/EnquistLab/NSRweb" target="_blank">NSRweb React/Node.js user interface.</Link><br/>
                    Rethvick Sriram Yugendra Babu: <Link href="https://github.com/EnquistLab/NSRweb" target="_blank">NSRweb React/Node.js user interface.</Link>
                </Typography>
                <br />
            </div>

            <div id="code">
                <Typography variant="h5" gutterBottom align="justify">
                    Source code
                </Typography>
                <Typography variant="body1" gutterBottom align="justify">
                    Source code for all NSR components is publicly available from the following repositories:<br/><br/>
                    NSR Search Engine, Database, and API: <Link href="https://github.com/ojalaquellueva/nsr" target="_blank">https://github.com/ojalaquellueva/nsr</Link> <br/>
                    RNSR R package: <Link href="https://github.com/EnquistLab/RNSR" target="_blank">https://github.com/EnquistLab/RNSR</Link>.
                </Typography>
            </div>

            <div id="funding">
                <Typography variant="h5" gutterBottom align="justify">
                    Funding
                </Typography>
                <Typography variant="body1" align="justify">
                    Funding provided by the National Science Foundation Plant Cyberinfrastructure Program
                    (grant #DBI-0735191) and National Science Foundation Harnessing the Data Revolution
                    Grant HDR 1934790 to Brian J. Enquist. Ongoing support by the National Center for Ecological
                    Analysis and Synthesis (NCEAS) at University of California, Santa Barbara.
                </Typography>
            </div>
        </Layout>
    );
}

export default About;
